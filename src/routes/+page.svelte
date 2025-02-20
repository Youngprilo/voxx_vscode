<script lang="ts">
	import '@shoelace-style/shoelace/dist/components/button/button.js';
	import CheckboxMessage from '$lib/components/CheckboxMessage.svelte';
	import { useEmergencyButtons } from '$lib/buttons';
	import type { SimpleResponse, ChatMessage } from '$lib/types';
	import { onMount } from 'svelte';
	import kitchen from '$lib/kitchen/index';
	import LinkMessage from '$lib/components/LinkMessage.svelte';
	import { Capsule } from '$lib/stores';
	import connection from '$lib/connection';
	import { useAppStore } from '$lib/stores/app';
	import { get } from 'svelte/store';

	const { selection, selectionLabel, messages, responses, loading, canType } = useAppStore();

	// let selection = $state('');
	// let selectionLabel = $state('');
	// let messages = $state([] as ChatMessage[]);
	// let responses = $state([] as SimpleResponse[]);
	// let loading = $state(false);
	// let canType = $state(false);
	let textInput = $state('');

	onMount(() => {
		useAppStore().resume();
	});

	// onMount(() => {

	// 	kitchen.init({
	// 		selection: new Capsule(
	// 			() => selection,
	// 			(x) => (selection = x)
	// 		),
	// 		selectionLabel: new Capsule(
	// 			() => selectionLabel,
	// 			(x) => (selectionLabel = x)
	// 		),
	// 		messages: new Capsule(
	// 			() => messages,
	// 			(x) => (messages = x)
	// 		),
	// 		responses: new Capsule(
	// 			() => responses,
	// 			(x) => (responses = x)
	// 		),
	// 		loading: new Capsule(
	// 			() => loading,
	// 			(x) => (loading = x)
	// 		),
	// 		canType: new Capsule(
	// 			() => canType,
	// 			(x) => (canType = x)
	// 		)
	// 	});
	// });

	const buttons = useEmergencyButtons();
	function handleClick(name: string) {
		kitchen.select(name);
		// connection.create('user', 'waitingrm', {
		// 	ip: '0.0.0.0',
		// 	selection: 'health',
		// 	rec: 'oi'
		// });
	}

	function handleInput() {
		if (textInput == '') {
			return;
		}

		const res: SimpleResponse[] = [];
		let added = false;

		for (const response of get(responses)) {
			if (response.kind != 'checkbox' && !added) {
				res.push({
					checked: true,
					content: textInput,
					kind: 'checkbox'
				});
			}

			res.push(response);
		}

		textInput = '';
		responses.set(res);
	}
</script>

<div class="voxx-app m-auto flex h-full w-full">
	{#if $selection === ''}
		<div class="voxx-main m-auto" style="width: 90%;">
			<div class=" flex flex-col">
				<img src="lifebuoy-help-svgrepo-com.svg" alt="app-logo" class="app-logo" />
				<h2 class="instrument-sans-bold app-hd mx-auto">Hello, what is your emergency?</h2>

				<div class="btn-panel mt-4">
					{#each buttons as button}
						<sl-button
							size="medium"
							variant="neutral"
							class="emerg-btn my-auto"
							onclick={() => handleClick(button.name)}
						>
							<p class="flex-1 text-left font-bold">
								{button.label}
							</p>
						</sl-button>
					{/each}
				</div>
			</div>
		</div>
	{:else}
		<div class="voxx-main voxx-main-2 flex w-full flex-col p-4">
			<div>
				<div>
					<div class="flex">
						<img src="lifebuoy-help-svgrepo-com.svg" alt="app-logo" class="app-logo2" />

						<div class="my-auto ml-2">
							<h1 class="my-0 text-xl font-bold text-red-500">VOXX</h1>
							<h4 class="my-0 text-xl">Emergency Services</h4>
						</div>
					</div>
				</div>
				<div class="emerg-hd mt-2 mb-10">
					<p class="flex-1 text-left">
						{$selectionLabel}
					</p>
				</div>

				{#each $messages as message}
					<div class="chat-message instrument-sans my-2 p-4 text-sm whitespace-break-spaces">
						<p>
							{message.content}
						</p>
					</div>
				{/each}

				{#each $responses as response}
					{#if response.kind === 'checkbox'}
						<CheckboxMessage content={response.content} bind:isChecked={response.checked} />
					{:else if response.kind == 'option'}
						<LinkMessage content={response.content} onclick={response.handler} />
					{:else}
						<div class="chat-message instrument-sans my-2 p-4 text-sm whitespace-break-spaces">
							<p>
								{response.content}
							</p>
						</div>
					{/if}
				{/each}

				{#if $loading}
					<div class="mx-auto mt-10 flex">
						<div class="dot-loader mx-auto"></div>
					</div>
				{/if}
			</div>
		</div>

		<div class="chat-panel mt-auto flex">
			<sl-input
				class="chat-input my-auto mr-2 flex-1"
				placeholder="Type something..."
				value={textInput}
				oninput={(ev: any) => (textInput = ev.target?.value)}
				onsubmit={handleInput}
				disabled={!$canType}
			>
			</sl-input>

			<sl-button
				size="medium"
				variant="danger"
				class="send-btn my-auto ml-auto"
				type="submit"
				onclick={handleInput}
				disabled={!$canType}
			>
				<i class="bx bx-send"></i>
			</sl-button>
		</div>
	{/if}
</div>

<style lang="scss">
	@import '../css/@include-media.scss';

	$bg-color: #d85c6c;
	$bg-color-alt: rgba($bg-color, 0.9);

	.chat-panel {
		padding: 8px 12px;
		background: #fff;
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.send-btn {
		&::part(base) {
			width: 45px;
			height: 45px;

			border-radius: 12px;
			border-color: #d9d9d9;
			border-width: 2px;
		}
	}

	.emerg-btn {
		// width: 360px;
		display: block;
		margin-bottom: 20px;

		&::part(label) {
			flex: 1;
		}

		&::part(base) {
			font-family: 'Instrument Sans', serif !important;
			font-size: 26px !important;

			background-color: $bg-color;
			border-color: $bg-color;
			padding: 20px 10px;
			border-radius: 10px;
			text-align: left;
			color: #000;

			&:hover {
				background-color: $bg-color-alt;
				border-color: $bg-color-alt;
			}

			&:active {
				background-color: $bg-color;
				border-color: $bg-color;
			}
		}
	}

	.chat-input {
		&::part(base) {
			border-color: #444;
			border-width: 2px;
			border-radius: 10px;
		}
	}

	.chat-message {
		background-color: $bg-color;
		color: #fff;
	}

	.emerg-hd {
		width: 100%;
		display: block;
		margin-bottom: 4px;

		background-color: $bg-color;
		border-color: $bg-color;
		color: #000;

		padding: 10px 4px;
		font-size: 20px;
		font-weight: bold;
		border-radius: 10px;
		margin-top: 20px;
	}

	.app-logo {
		width: 72px;
		margin: 0 auto;
	}

	.app-logo2 {
		width: 72px;
	}

	.app-hd {
		margin: 16px auto;
		width: 300px;
	}

	.voxx-app {
		font-size: 32px;
	}

	.voxx-main-2 {
		margin-bottom: 50px;
		overflow-y: auto;
	}
	// .dot-loader {
	// 	width: 40px;
	// 	aspect-ratio: 2;
	// 	--_g: no-repeat radial-gradient(circle closest-side, #ef4444 90%, #0000);
	// 	background:
	// 		var(--_g) 0% 50%,
	// 		var(--_g) 50% 50%,
	// 		var(--_g) 100% 50%;
	// 	background-size: calc(100% / 3) 50%;
	// 	animation: l3 1s infinite linear;
	// }
	// @keyframes l3 {
	// 	20% {
	// 		background-position:
	// 			0% 0%,
	// 			50% 50%,
	// 			100% 50%;
	// 	}
	// 	40% {
	// 		background-position:
	// 			0% 100%,
	// 			50% 0%,
	// 			100% 50%;
	// 	}
	// 	60% {
	// 		background-position:
	// 			0% 50%,
	// 			50% 100%,
	// 			100% 0%;
	// 	}
	// 	80% {
	// 		background-position:
	// 			0% 50%,
	// 			50% 50%,
	// 			100% 100%;
	// 	}
	// }

	.dot-loader {
		width: 35px;
		aspect-ratio: 1;
		--_g: no-repeat radial-gradient(farthest-side, #ef4444 94%, #0000);
		background:
			var(--_g) 0 0,
			var(--_g) 100% 0,
			var(--_g) 100% 100%,
			var(--_g) 0 100%;
		background-size: 40% 40%;
		animation: l38 0.5s infinite;
	}
	@keyframes l38 {
		100% {
			background-position:
				100% 0,
				100% 100%,
				0 100%,
				0 0;
		}
	}
</style>
