import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod.mjs';
import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import type { Prompt } from './types';

let _openAI: OpenAI | undefined;
const messages = [] as ChatCompletionMessageParam[];

async function prompt<T>(p: Prompt<T>) {
	if (!_openAI) {
		const apiKey = import.meta.env.VITE_APP_OPEN_API;
		_openAI = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
	}

	messages.push({
		role: 'user',
		content: p.content
	});

	const completion = await _openAI.chat.completions.create({
		model: 'gpt-4o-mini',
		store: false,
		messages,
		response_format: zodResponseFormat(p.format, 'advice')
	});

	const firstChoice = completion.choices.shift();

	if (firstChoice) {
		const content = firstChoice.message.content;
		if (content) {
			p.handler?.(JSON.parse(content) as T);
		}
	}

	return completion;
}

export default {
	prompt
};
