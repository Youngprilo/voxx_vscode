import type { Writable } from 'svelte/store';
import type { ZodType } from 'zod';
import type { Capsule } from './stores';

type PromptRole = 'user' | 'developer';
export type ResponseFlavor = 'checkbox' | 'option' | 'message';
type PromptHandler<T> = (content: T) => void;

export interface HealthContext {
	selection: Capsule<string>;
	selectionLabel: Capsule<string>;
	messages: Capsule<ChatMessage[]>;
	responses: Capsule<SimpleResponse[]>;
	loading: Capsule<boolean>;
	canType: Capsule<boolean>;
}

interface Thickness {
	x: number;
	y: number;
}

export interface ChatMessage {
	p?: Partial<Thickness>;
	fontSize?: number;
	fontWeight?: number;
	content: string;
}

export interface SimpleResponse {
	checked?: boolean;
	content: string;
	kind: ResponseFlavor;
	handler?: (ev: MouseEvent) => void;
}

export interface Prompt<T = any> {
	content: string;
	role?: PromptRole;
	format: ZodType<T>;
	handler?: PromptHandler<T>;
	prepare?: () => void;
}

export interface MeetCtx {
	meetingActive: boolean;
	identity: string;
	room: string;
	isAgent: boolean;
}

export interface AppUserCtx {
	connectionId?: string;
	name: string;
	ip: string;
	issue: string;
	input: string;
	recommendations: string;
	targetRoom: string;
}
