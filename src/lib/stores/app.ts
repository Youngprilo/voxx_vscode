import { goto } from '$app/navigation';
import connection, { useCurrentRoom, useJitsi } from '$lib/connection';
import { encodeJWT } from '$lib/jwt';
import type JitsiTrack from '$lib/lib-jitsi-meet/dist/esm/modules/RTC/JitsiTrack';
import type { AppUserCtx, ChatMessage, MeetCtx, SimpleResponse } from '$lib/types';
import { get, writable } from 'svelte/store';
import { useAgentStore } from './agent';
import type JitsiParticipant from '$lib/lib-jitsi-meet/dist/esm/JitsiParticipant';

export const IS_AGENT_BUILD = () => (window as any).VOXX_AGENT_BUILD;

const selection = writable('');
const selectionLabel = writable('');
const messages = writable([] as ChatMessage[]);
const responses = writable([] as SimpleResponse[]);
const loading = writable(false);
const canType = writable(false);

const userInput = writable('');
const recommendations = writable('');

const username = writable('');
const currentRoom = writable('');

const targetRoom = writable('');
const jwt = writable('');
const meetingActive = writable(false);
const isAgent = writable(false);

const remoteTracks = writable([] as JitsiTrack[]);

let init = false;

const ctx = {
	selection,
	selectionLabel,
	messages,
	responses,
	loading,
	canType,
	userInput,
	recommendations,
	jwt,
	username,
	currentRoom,
	meetingActive,
	isAgent,
	targetRoom,
	remoteTracks
};

function resume() {
	if (init) {
		return;
	}

	init = true;

	const data = localStorage.getItem('meetCtx') ?? '';
	let ctx: MeetCtx;

	try {
		ctx = JSON.parse(data);
	} catch (err) {
		ctx = { identity: '', meetingActive: false, room: '', isAgent: get(isAgent) };
		localStorage.setItem('meetCtx', '{}');

		console.log('Resumption err', err);
	}

	jwt.set(ctx.identity);
	meetingActive.set(ctx.meetingActive);
	currentRoom.set(ctx.room);

	const isAgentBuild = IS_AGENT_BUILD();
	if (isAgentBuild == undefined && import.meta.env.DEV) {
		isAgent.set(ctx.isAgent);
	} else if (!get(isAgent)) {
		isAgent.set(isAgentBuild ?? false);
	}

	if (get(meetingActive) == true) {
		if (get(isAgent) && get(currentRoom) == 'waitingrm') {
			return;
		}

		goto('/call');
	}
}

function saveMeetingState() {
	const ctx: MeetCtx = {
		meetingActive: get(meetingActive),
		identity: get(jwt),
		room: get(currentRoom),
		isAgent: get(isAgent)
	};

	try {
		const data = JSON.stringify(ctx);
		localStorage.setItem('meetCtx', data);
	} catch (err) {
		localStorage.setItem('meetCtx', '{}');
		console.log('Save err', err);
	}
}

function startNewCall(room: string = 'waitingrm') {
	currentRoom.set(room);
	jwt.set(encodeJWT(get(username), room));
	meetingActive.set(true);

	saveMeetingState();

	console.log('creating new call', room);
	return connection.create(room);
}

async function agentConnect(user: AppUserCtx) {
	const curr = useCurrentRoom();
	const targetRoom = (Math.random() + 1).toString(36).substring(2);

	try {
		// for (const part of curr.getParticipants()) {
		// 	// const avatar = part.getIdentity()?.user?.avatar ?? '';

		// 	// if (!avatar || avatar == '') {
		// 	// 	continue;
		// 	// }

		// 	const userContext = JSON.parse(avatar) as AppUserCtx;

		// 	if (userContext.name == user.name) {
		// 		curr.sendMessage(`:exit_connect?:${targetRoom}`, user.connectionId);
		// 	}
		// }

		curr.sendMessage(`:exit_connect?:${targetRoom}`, user.connectionId);
		curr.leave();
		// curr.hangup();
	} catch (err) {
		console.error(err);
	}

	console.log('Starting new call', targetRoom);
	appStore.currentRoom.set(targetRoom);
	// await startNewCall(targetRoom);
	goto('/call');
}

function endCall() {
	// meetingActive.set(false);
	// jwt.set('');
	// saveMeetingState();

	if (get(isAgent)) {
		// goto('/agent');
	} else {
		selection.set('');
		messages.set([]);
		responses.set([]);
		// goto('/');
	}

	return connection.hangup();
}

function handleMessage(source: string, msg: string) {
	console.log('New ROOM message', msg, 'from', source);
	const iamagent = get(isAgent);

	if (msg.startsWith(':hangup?:')) {
		if (get(appStore.currentRoom) != 'waitingrm') {
			const room = useCurrentRoom();

			room.leave().then(() => {
				connection.hangup().then(() => {
					if (iamagent) {
						goto('/agent');
					} else {
						goto('/');
					}
				});
			});
		}
	}
}

function handlePrivateMessage(source: string, msg: string) {
	console.log('New message', msg, 'from', source);

	const iamagent = get(isAgent);

	if (!iamagent && msg.startsWith(':exit_connect?:')) {
		const targetRoom = msg.substring(15);

		const room = useCurrentRoom();
		room.leave().then(() => {
			return startNewCall(targetRoom);
		});

		return;
	}

	if (iamagent && msg.startsWith(':ctx:')) {
		const data = msg.substring(5);

		const ctx = JSON.parse(data) as AppUserCtx;
		useAgentStore().upsertEmergency(ctx);
	}
}

function handleUserJoined(userId: string, user: JitsiParticipant) {
	console.log('Some random user joined', user.getRole());

	if (get(isAgent)) {
	} else if (get(currentRoom) == 'waitingrm') {
		const ctx: Partial<AppUserCtx> = {
			connectionId: useCurrentRoom().myUserId(),
			name: get(appStore.username),
			issue: get(appStore.selection),
			input: get(appStore.userInput),
			recommendations: get(appStore.recommendations)
		};

		const msg = `:ctx:${JSON.stringify(ctx)}`;
		useCurrentRoom().sendMessage(msg, userId);
	}
}

function handleUserLeft(userId: string) {
	if (get(isAgent) && get(currentRoom) == 'waitingrm') {
		const agentStore = useAgentStore();
		agentStore.emergencies.update((x) => {
			const n = x.findIndex((x) => x.connectionId == userId);
			if (n >= 0) {
				x.splice(n, 1);
			}

			return x;
		});
	}
}

const appStore = {
	...ctx,
	resume,
	saveMeetingState,
	startNewCall,
	endCall,
	agentConnect,
	registerConn: () => {
		const room = useCurrentRoom();

		room.on(useJitsi().events.conference.PRIVATE_MESSAGE_RECEIVED, handlePrivateMessage);
		room.on(useJitsi().events.conference.MESSAGE_RECEIVED, handleMessage);

		room.on(useJitsi().events.conference.USER_JOINED, handleUserJoined);
		room.on(useJitsi().events.conference.USER_LEFT, handleUserLeft);
	}
};

export const useAppStore = () => appStore;
