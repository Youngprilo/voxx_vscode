<script lang="ts">
	import '@shoelace-style/shoelace/dist/components/button/button.js';
	import { onMount } from 'svelte';
	import connection from '$lib/connection';
	import { useAppStore } from '$lib/stores/app';
	import { get } from 'svelte/store';

	const { isAgent, remoteTracks } = useAppStore();

	onMount(() => {
		const appStore = useAppStore();

		const currentRoom = get(appStore.currentRoom);

		appStore.resume();

		if (currentRoom == '') {
			appStore.startNewCall();
		} else {
			appStore.startNewCall(currentRoom);
		}

		remoteTracks.subscribe((tracks) => {
			for (const track of tracks) {
				if (track.isAudioTrack()) {
					track.attach(document.getElementById('call-audio'));
				} else if (track.isVideoTrack()) {
					track.attach(document.getElementById('call-video'));
				}
			}
		});
	});

	function handleHangUp() {
		useAppStore().endCall();
	}
</script>

<div class="voxx-app call-page m-auto flex h-full w-full p-4">
	<div class="call-hd relative flex flex-col">
		<img src="lifebuoy-help-svgrepo-com.svg" alt="app-logo" class="app-logo" />

		<div class="flex">
			<div class="acc-icon flex bg-gray-600">
				<i class="bx bxs-user-rectangle m-auto text-2xl"></i>
			</div>

			{#if !$isAgent}
				<div class="my-auto ml-3 text-white">
					<!-- <h4>Emergency Operator</h4> -->
					<h4 class="text-red-400">
						<span class="text-white">Emergency Operator</span>
						<i class="bx bxs-circle ml-2" style="font-size: 8px"></i>
					</h4>
				</div>
			{:else}
				<div class="my-auto ml-3 text-white">
					<h4 class="text-red-400">
						<span class="text-white">User</span>
						<i class="bx bxs-circle ml-2" style="font-size: 8px"></i>
					</h4>
				</div>
			{/if}
		</div>

		<div class="mt-auto flex">
			<div class="flex w-full">
				<audio id="call-audio" autoplay> </audio>
				<video class="absolute w-full" autoplay id="call-video">
					<track kind="captions" />
				</video>

				<!-- <sl-button size="medium" variant="neutral" class="my-auto">
					<i class="bx bx-dots-vertical-rounded"></i>
				</sl-button> -->

				<sl-button size="large" variant="danger" class="mx-auto my-auto" onclick={handleHangUp}>
					<i class="bx bxs-phone-off"></i>
				</sl-button>

				<!-- <sl-button size="medium" variant="neutral" class="my-auto">
					<i class="bx bxs-message-square-detail"></i>
				</sl-button> -->
			</div>
		</div>
	</div>
</div>

<style lang="scss" scoped>
	.call-page {
		background: #000;
	}

	.app-logo {
		right: 10;
		position: relative;
		top: 0;
	}

	.app-logo {
		width: 42px;
		position: absolute;
		right: 10px;
	}

	.acc-icon {
		// width: 24px;
		// height: 24px;
		// width: 48px;
		// height: 48px;
		border-radius: 8px;
		border: #fff 1.5px solid;
		color: #fff;
		padding: 10px;
		display: flex;
		width: fit-content;
		height: fit-content;
		margin: auto 0;
	}

	.call-hd {
		width: 100%;
	}

	#call-video {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotateY(180deg);
		position: absolute;
	}
</style>
