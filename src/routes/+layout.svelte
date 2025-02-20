<script lang="ts">
	import '../css/tailwind.min.css';
	import '../css/boxicons.min.css';
	import '../css/main.scss';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { useAppStore } from '$lib/stores/app';
	import { get } from 'svelte/store';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="stylesheet" href="/scripts/pure-uikit/themes/light.css" />
	<script type="module" src="/scripts/pure-uikit/pure-ui-autoloader.js"></script>
	<script type="module" src="/scripts/preline/preline.js"></script>

	<script async src="/scripts/jquery-3.5.1.min.js"></script>
	<script async src="/scripts/lib-jitsi-meet.min.js"></script>
</svelte:head>

{@render children()}
