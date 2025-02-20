<script lang="ts">
	let { content, onclick = (ev: MouseEvent) => {} } = $props();

	function handleClick(ev: MouseEvent) {
		onclick?.(ev);
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<sl-button onclick={handleClick} class="link-message my-2 w-full">
	<div class="instrument-sans text-sm text-white">
		<div class="flex">
			<p class="my-auto">
				{content}
			</p>

			<div class="my-auto ml-auto text-3xl">
				<i class="bx bxs-chevron-right"></i>
			</div>
		</div>
	</div>
</sl-button>

<style lang="scss">
	$bg-color: #444;
	$text-color: #d85c6c;
	$bg-color-alt: rgba($bg-color, 0.9);

	.link-message {
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
			color: $text-color;

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
