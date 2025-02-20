import { useCurrentRoom, useJitsi } from '$lib/connection';
import type { AppUserCtx } from '$lib/types';
import type JitsiConference from 'JitsiConference';
import type JitsiParticipant from 'JitsiParticipant';
import { get, writable } from 'svelte/store';

const emergencies = writable([] as AppUserCtx[]);

const ctx = {
	emergencies
};

function handleUserJoined(userId: string, user: JitsiParticipant) {
	console.log('User joined', userId, user);

	const emerg = [...get(emergencies)];
	const avatar = (user.getIdentity() as any)?.user?.avatar ?? {};

	if (!avatar || avatar == '') {
		return;
	}

	const userContext = JSON.parse(avatar);
	const n = emerg.findIndex((x) => x.name == userContext.name);
	if (n >= 0) {
		emerg.splice(n, 1);
	}

	emerg.push(userContext);
	emergencies.set(emerg);
}

function upsertEmergency(userContext: AppUserCtx) {
	const emerg = [...get(emergencies)];

	const n = emerg.findIndex((x) => x.name == userContext.name);
	if (n >= 0) {
		emerg.splice(n, 1);
	}

	emerg.push(userContext);
	emergencies.set(emerg);
}

const agentStore = {
	...ctx,
	registerWaitingRoom: () => {
		const jitsi = useJitsi();
		useCurrentRoom().on(jitsi.events.conference.USER_JOINED, handleUserJoined);
	},
	upsertEmergency
};

export const useAgentStore = () => agentStore;
