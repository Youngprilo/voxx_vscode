<script lang="ts">
	import { goto } from '$app/navigation';
	import connection from '$lib/connection';
	import { useAgentStore } from '$lib/stores/agent';
	import { IS_AGENT_BUILD, useAppStore } from '$lib/stores/app';
	import type { AppUserCtx } from '$lib/types';
	import type { SlDialog } from '@shoelace-style/shoelace';

	import type { PTable } from 'pure-uikit';
	import { onMount } from 'svelte';
	import { get, writable } from 'svelte/store';

	const appStore = useAppStore();
	const { emergencies: clients } = useAgentStore();

	let viewMoreTitle = $state('');
	let viewMoreText = $state('');

	onMount(() => {
		if ((IS_AGENT_BUILD() == undefined && import.meta.env.DEV) || IS_AGENT_BUILD() == true) {
			appStore.isAgent.set(true);
		}

		if (!get(appStore.isAgent)) {
			goto('/');
			return;
		}

		useAppStore().resume();

		const currentRoom = get(appStore.currentRoom);

		if (currentRoom == 'waitingrm' || currentRoom == '') {
			appStore.startNewCall();
		} else {
			goto('/call');
		}
	});

	function connectToClient(targ: AppUserCtx) {
		return appStore.agentConnect(targ);
	}

	function viewMore(targ: AppUserCtx) {
		viewMoreText = targ.recommendations;
		viewMoreTitle = `Recommendations for ${targ.name}`;

		const dialog = document.querySelector('.view-more-diag') as SlDialog;
		return dialog.show();
	}
</script>

<div class="voxx-app full m-auto flex h-full w-full flex-col p-4">
	<div>
		<div class="flex">
			<img src="lifebuoy-help-svgrepo-com.svg" alt="app-logo" class="app-logo" />

			<div class="my-auto ml-2">
				<h1 class="my-0 text-xl font-bold text-red-500">VOXX</h1>
				<h4 class="my-0 text-xl">Emergency Operator</h4>
			</div>
		</div>
	</div>

	<div class="relative mt-8">
		<div class="flex flex-col">
			<div class="-m-1.5 overflow-x-auto">
				<div class="inline-block min-w-full p-1.5 align-middle">
					<div class="overflow-hidden">
						<table class="min-w-full divide-y divide-gray-200">
							<thead>
								<tr>
									<th
										scope="col"
										class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
										>Name</th
									>
									<th
										scope="col"
										class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
										>Issue</th
									>
									<th
										scope="col"
										class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
										>Input</th
									>
									<th
										scope="col"
										class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
										style="width: 200px; text-wrap: wrap">Recommendations</th
									>
									<th
										scope="col"
										class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
										>Action</th
									>
								</tr>
							</thead>

							{#if $clients.length > 0}
								<tbody class="divide-y divide-gray-200">
									{#each $clients as client}
										<tr>
											<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-800"
												>{client.name}</td
											>

											<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-800"
												>{client.issue}</td
											>

											<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-800"
												>{client.input}</td
											>

											<td
												class="whitespace-wrap px-6 py-4 text-sm font-medium text-gray-800"
												style="width: 200px;max-width: 200px"
												>{client.recommendations.length < 200
													? client.recommendations
													: `${client.recommendations.substring(0, 200)}...`}

												{#if client.recommendations.length >= 200}
													<sl-button
														size="small"
														variant="primary"
														class="mt-4"
														onclick={() => viewMore(client)}
													>
														<p class="flex-1 text-left font-bold">View</p>
													</sl-button>
												{/if}
											</td>

											<td class="px-6 py-4 text-end text-sm font-medium whitespace-nowrap">
												<sl-button
													size="medium"
													variant="primary"
													onclick={() => connectToClient(client)}
												>
													<p class="flex-1 text-left font-bold">Connect</p>
												</sl-button>
											</td>
										</tr>
									{/each}
								</tbody>
							{/if}
						</table>

						{#if $clients.length <= 0}
							<div class="h-96">
								<div class="illustre">
									<img src="/illustrations/clip/clip-no-messages.png" alt="No messages" />

									<h2 class="text-center text-sm">It's another great day</h2>
									<h3 class="text-center text-xs">No reported emergencies</h3>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>

	<sl-dialog label={viewMoreTitle} class="view-more-diag">
		<p class="text-sm whitespace-break-spaces">
			{viewMoreText}
		</p>
	</sl-dialog>
</div>

<style lang="scss">
	.app-logo {
		width: 72px;
	}

	.voxx-app {
		font-size: 32px;
	}

	.illustre {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;

		img {
			width: 100%;
		}
	}
</style>
