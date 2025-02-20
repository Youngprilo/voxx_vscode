import { encodeJWT } from './jwt';
import type { JitsiConferenceOptions } from './lib-jitsi-meet/types/hand-crafted/JitsiConnection';
import type { JitsiMeetJSType } from './lib-jitsi-meet/types/hand-crafted/JitsiMeetJS';
import { useAgentStore } from './stores/agent';
import { get } from 'svelte/store';
import { useAppStore } from './stores/app';
import type JitsiConnection from './lib-jitsi-meet/types/hand-crafted/JitsiConnection';
import type JitsiConference from './lib-jitsi-meet/types/hand-crafted/JitsiConference';
import type JitsiTrack from './lib-jitsi-meet/dist/esm/modules/RTC/JitsiTrack';
import { MediaType } from './lib-jitsi-meet/dist/esm/service/RTC/MediaType';
import { goto } from '$app/navigation';
import type JitsiLocalTrack from './lib-jitsi-meet/dist/esm/modules/RTC/JitsiLocalTrack';

let Jitsi: JitsiMeetJSType;
let JitsiMeetJS: JitsiMeetJSType;
let connection: JitsiConnection;
let conference: JitsiConference;
const localTracks = [] as JitsiLocalTrack[];

export const useCurrentRoom = () => conference;

let init = false;
export const useJitsi = () => Jitsi;

function ensureInit() {
	if (init) return;
	init = true;

	Jitsi = JitsiMeetJS = (window as any).JitsiMeetJS as JitsiMeetJSType;
	JitsiMeetJS.init({});
	JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.INFO);
	console.log(`using LJM version ${JitsiMeetJS.version}!`);
}

async function handleConnSuccss(ev: Event) {
	console.log('ESTABLISHED!');

	const appStore = useAppStore();
	let roomName = get(appStore.currentRoom);
	const isAgent = get(appStore.isAgent);

	if (!roomName || roomName == '') {
		roomName = 'waitingrm';
	}

	console.log('ESTABLISHED', ev, roomName, isAgent, get(appStore.jwt));

	const room = connection.initJitsiConference(roomName, {});
	conference = room;

	room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, handleConferenceJoined);

	room.on(JitsiMeetJS.events.conference.PRIVATE_MESSAGE_RECEIVED, handleMessage);

	// room.on(JitsiMeetJS.events.conference.MESSAGE_RECEIVED, handleMessage);
	room.on(JitsiMeetJS.events.conference.ENDPOINT_MESSAGE_RECEIVED, handleMessageRecv);
	room.on(JitsiMeetJS.events.conference.KICKED, handleKicked);

	// room.on(JitsiMeetJS.events.conference.USER_JOINED, handleUserJoined);
	room.on(JitsiMeetJS.events.conference.USER_LEFT, handleUserLeft);
	room.on(JitsiMeetJS.events.conference.TRACK_ADDED, handleNewTrack);

	// if (isAgent == true && roomName == 'waitingrm') {
	// 	useAgentStore().registerWaitingRoom();
	// } else {
	// 	appStore.registerConn();
	// }
	appStore.registerConn();

	if (roomName != 'waitingrm') {
		try {
			const tracks = await JitsiMeetJS.createLocalTracks({ devices: ['audio', 'video'] });
			for (let i = 0; i < tracks.length; i++) {
				const track = tracks[i];

				if (typeof track == 'object') {
					room.addTrack(track);
					localTracks.push(track);
				}
			}
		} catch (err) {
			console.error(err);
		}
	}

	room.join('', true);
}

function hanldeConnFailed(ev: Event) {
	console.log('FAILED', ev);
}

function handleMessage(ev: Event, obj1: string) {
	console.log('MSG:', ev, obj1);
}

function handleMessageRecv(ev: Event) {
	console.log('MSG:', ev);
}

function handleConnDisconnect(ev: Event) {
	console.log('DISCONNECT', ev);
}
function handleConferenceJoined() {
	const roomName = get(useAppStore().currentRoom);
	console.log('ConferenceJoined', roomName);
}

function handleUserJoined(x: object, y: object) {
	console.log('new user', x, y);
}

function handleUserLeft(x: object, y: object) {
	console.log('***user left', x, y);
}

function handleNewTrack(track: JitsiTrack) {
	if (track.isLocal()) {
	} else {
		const appStore = useAppStore();

		appStore.remoteTracks.update((arr) => {
			arr.push(track);
			return arr;
		});
	}
}

function handleKicked() {
	const appStore = useAppStore();
	const roomName = get(appStore.currentRoom);

	if (roomName != 'waitingrm') {
		return;
	}

	const targ = get(appStore.targetRoom);
	appStore.startNewCall(targ);
}

async function create(room: string) {
	ensureInit();

	const appStore = useAppStore();

	const token = get(appStore.jwt);
	room ??= get(appStore.currentRoom);
	const tenant = import.meta.env.VITE_APP_JAAS_TENANT;
	appStore.currentRoom.set(room);

	if (room == 'waitingrm') {
		useAgentStore().emergencies.set([]);
	}

	const opt = {
		hosts: {
			domain: '8x8.vc',
			muc: `conference.${tenant}.8x8.vc`,
			focus: `focus.8x8.vc`
		},
		serviceUrl: `wss://8x8.vc/${tenant}/xmpp-websocket?room=${room}`,
		websocketKeepAliveUrl: `https://8x8.vc/${tenant}/_unlock?room=${room}`,
		p2p: {
			enabled: true
		},
		callStatsID: '706724306',
		callStatsSecret: 'f+TKWryzPOyX:dNR8PMw42WJwM3YM1XkJUjPOLY0M40wz+0D4mZud8mQ=',
		confID: `https://8x8.vc/${tenant}/${room}`,
		siteID: tenant,
		applicationName: 'Voxx Emergency Services',
		logging: {
			defaultLogLevel: 'trace',
			'modules/RTC/TraceablePeerConnection.js': 'info',
			'modules/statistics/CallStats.js': 'info',
			'modules/xmpp/strophe.util.js': 'log'
		}
	} as JitsiConferenceOptions;

	const conn = new Jitsi.JitsiConnection(undefined, token, opt);

	conn.addEventListener(Jitsi.events.connection.CONNECTION_ESTABLISHED, handleConnSuccss);
	conn.addEventListener(Jitsi.events.connection.CONNECTION_FAILED, hanldeConnFailed);
	conn.addEventListener(Jitsi.events.connection.CONNECTION_DISCONNECTED, handleConnDisconnect);

	connection = conn as unknown as JitsiConnection;
	conn.connect({});
}

async function hangup() {
	try {
		conference.sendMessage(`:hangup?:`);
	} catch {}

	cleanup();
}

async function cleanup() {
	for (const track of localTracks) {
		try {
			track.stopStream();
			await track.dispose();
		} catch {}
	}

	try {
		for (const track of conference.getLocalTracks(MediaType.AUDIO)) {
			try {
				track.stopStream();
				conference.removeTrack(track);
				await track.dispose();
			} catch {}
		}

		for (const track of conference.getLocalTracks(MediaType.VIDEO)) {
			try {
				track.stopStream();
				await track.dispose();
				conference.removeTrack(track);
			} catch {}
		}
	} catch {}

	try {
		await conference.hangup();
	} catch {}

	try {
		await conference.leave();
	} catch {}

	const appStore = useAppStore();

	appStore.meetingActive.set(false);
	appStore.currentRoom.set('');
	appStore.saveMeetingState();

	if (get(appStore.isAgent)) {
		goto('agent');
	} else {
		goto('/');
	}
}

export default {
	create,
	hangup,
	cleanup
};
