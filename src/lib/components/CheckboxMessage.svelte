<script lang="ts">
	let { content, isChecked = $bindable(false) } = $props();

	function handleClick() {
		isChecked = !isChecked;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<sl-button
	onclick={handleClick}
	class="checkable-message instrument-sans my-2 w-full px-2 text-sm text-white"
>
	<div class="flex">
		<div class="my-auto mr-4 text-3xl">
			{#if isChecked}
				<i class="bx bx-check"></i>
			{:else}
				<i class="bx bxs-circle text-gray-300"></i>
			{/if}
		</div>

		<p class="my-auto text-base text-wrap">
			{content}
		</p>
	</div>
</sl-button>

<style lang="scss">
	$bg-color: #d85c6c;
	$bg-color-alt: rgba($bg-color, 0.9);

	.checkable-message {
		padding: 0;

		&::part(label) {
			flex: 1;
			margin: 0;
			padding: 0 4px;
		}

		&::part(base) {
			font-family: 'Instrument Sans', serif !important;
			font-size: 16px !important;

			background-color: $bg-color;
			border-color: $bg-color;
			padding: 12px 6px;
			text-align: left;
			color: #fff;

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
</style>
