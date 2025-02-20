import type { Prompt } from '$lib/types';

interface FirePromptRes {
	greeting: string;
	symptoms: string[];
}

// const healthPrompt: Prompt<FirePromptRes> = {
//     content:
//         'You are fire You are a trained medical assistant attending to a patient. Enquire on what problems that they might be having and provide a list of symptoms for them to choose from.',
//     role: 'developer',
//     format: z.object({
//         greeting: z.string(),
//         symptoms: z.array(z.string())
//     }),
//     handler: healthPromptHandler
// };
