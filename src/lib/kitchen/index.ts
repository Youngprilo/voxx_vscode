import { get, writable, type Writable } from 'svelte/store';
import { z, ZodType, type ZodTypeAny } from 'zod';
import { useEmergencyButtons } from '../buttons';
import type { ChatMessage } from '../types';
import { Capsule } from '../stores';
import openai from '../openai';
import Mustache from 'mustache';
import { useHealthPrompt } from './health';
import { useAppStore } from '$lib/stores/app';
import { goto } from '$app/navigation';

function select(name: string) {
	const buttons = useEmergencyButtons();
	const n = buttons.findIndex((x) => x.name == name);
	if (n < 0) {
		return;
	}

	const appStore = useAppStore();
	const { selectionLabel, messages, loading, selection, responses } = appStore;

	selectionLabel.set(buttons[n].label);

	let msg: ChatMessage[] = get(messages);

	switch (name) {
		case 'health':
			msg.push({
				content: `What symptoms are you experiencing?\n\nPlease select an option or simply type out your symptoms.`
			});
			break;
	}

	selection.set(name);
	messages.set(msg);
	loading.set(true);

	switch (name) {
		case 'health':
			// responses.set([
			// 	{
			// 		content: 'Talk to an operator',
			// 		kind: 'option',
			// 		handler: () => {
			// 			const appStore = useAppStore();
			// 			appStore.currentRoom.set('waitingrm');

			// 			goto('call');
			// 		}
			// 	}
			// ]);
			openai.prompt(useHealthPrompt());
			break;

		default:
			selection.set('');
			loading.set(false);
			break;
	}
}

export default {
	select
};
