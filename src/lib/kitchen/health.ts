import { get, writable, type Writable } from 'svelte/store';
import { z, ZodType, type ZodTypeAny } from 'zod';
import type { Prompt, SimpleResponse } from '$lib/types';
import openai from '$lib/openai';
import Mustache from 'mustache';
import { useAppStore } from '$lib/stores/app';
import connection from '$lib/connection';
import { goto } from '$app/navigation';

interface HealthPromptRes {
	greeting: string;
	symptoms: string[];
}

interface SymPromptRes {
	causes: string[];
	recommendations: string[];
}

export const useHealthPrompt = () => healthPrompt;

const healthPrompt: Prompt<HealthPromptRes> = {
	content:
		'You are a trained medical assistant attending to a patient. Enquire on what problems that they might be having and provide a list of symptoms for them to choose from.',
	role: 'developer',
	format: z.object({
		greeting: z.string(),
		symptoms: z.array(z.string())
	}),
	handler: healthPromptHandler
};

const symPrompt: Prompt<SymPromptRes> = {
	content:
		'Given the following symptoms: {{symptoms}}\n Attempt to provide what underlying medical issues may be causing them',
	role: 'developer',
	format: z.object({
		causes: z.array(z.string()),
		recommendations: z.array(z.string())
	}),
	handler: symPromptHandler
};

function symPromptHandler(content: SymPromptRes) {
	const appStore = useAppStore();
	const responses: SimpleResponse[] = [];

	let res =
		"We're sorry to hear that. Here are a few possible causes for the symptoms you're experiencing: \n\n";

	for (const cause of content.causes) {
		res += `*\t${cause}\n`;
	}

	responses.push({
		content: res,
		kind: 'message'
	});

	res = 'Here are some recommendations you should consider: \n\n';

	appStore.recommendations.set(content.recommendations.join('\n'));

	for (const rec of content.recommendations) {
		res += `*\t${rec}\n`;
	}

	responses.push({
		content: res,
		kind: 'message'
	});

	responses.push({
		content: 'Still need more help?',
		kind: 'message'
	});

	responses.push({
		content: 'Talk to an operator',
		kind: 'option',
		handler: () => {
			const appStore = useAppStore();
			appStore.currentRoom.set('waitingrm');

			goto('call');
		}
	});

	responses.push({
		content: 'End session',
		kind: 'option',
		handler: () => {
			const appStore = useAppStore();

			appStore.selection.set('');
			appStore.messages.set([]);
			appStore.responses.set([]);

			goto('/');
		}
	});

	appStore.responses.set(responses);
	appStore.loading.set(false);
	appStore.canType.set(false);
}

function healthPromptHandler(content: HealthPromptRes) {
	const appStore = useAppStore();
	const { responses: appRes, loading, canType } = appStore;

	const responses: SimpleResponse[] = [];

	if (content.symptoms.length <= 0) {
		// TODO: Handle errors
		return;
	}

	for (const sym of content.symptoms) {
		responses.push({
			content: sym,
			kind: 'checkbox',
			checked: false
		});
	}

	responses.push({
		content: 'Submit',
		kind: 'option',
		handler: () => {
			const appStore = useAppStore();
			appStore.loading.set(true);

			const selected = get(appStore.responses)
				.filter((x) => x.checked == true)
				.map((x) => x.content);

			if (selected.length <= 0) {
				return;
			}

			appStore.userInput.set(selected.join(','));

			const prompt = { ...symPrompt };
			prompt.content = Mustache.render(prompt.content, {
				symptoms: selected
			});

			openai.prompt(prompt);
			appStore.responses.set([]);
		}
	});

	appRes.set(responses);
	loading.set(false);
	canType.set(true);
}
