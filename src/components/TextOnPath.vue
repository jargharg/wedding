<template>
	<g class="text-on-path">
		<text>
			<textPath
				alignment-baseline="middle"
				class="text"
				:startOffset="startOffset"
				xlink:href="#textLine"
			>
				<slot />
				<slot />
				<slot />
			</textPath>
		</text>
	</g>
</template>

<script>
export default {
	props: {
		rowIndex: {
			type: Number,
			required: true,
		},
	},
	computed: {
		startOffset() {
			return this.rowIndex % 4 === 0 || (this.rowIndex + 1) % 4 === 0 ? -450 : 0;
		},
	},
};
</script>

<style lang="scss">
.text {
	letter-spacing: 0.05em;
	text-transform: uppercase;
	font-family: neue-haas-grotesk-display, sans-serif;
	fill: var(--color-secondary);
	font-size: 3rem;
	letter-spacing: 0.05em;
}

.text-on-path {
	.text-path {
		fill: none;
		stroke: none;
	}

	&:nth-child(2n) {
		.text {
			fill: none;
			stroke: var(--color-secondary);
			stroke-width: 1.5px;
			font-size: 4rem;
		}
	}

	&:nth-child(2n + 1) {
		.text {
			fill: var(--color-secondary);
			stroke: none;
		}
	}
}
</style>
