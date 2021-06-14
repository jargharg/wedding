<template>
	<g class="text-on-path">
		<path
			class="text-path"
			:id="`textLine${rowIndex}`"
			d="M0,224C120,171,240,117,360,117.3C480,117,600,171,720,197.3C840,224,960,224,1080,213.3C1200,203,1320,181,1380,170.7L1440,160"
		/>

		<text>
			<textPath
				alignment-baseline="middle"
				class="text"
				:startOffset="startOffset"
				:xlink:href="`#textLine${rowIndex}`"
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
			return 0 - Math.random() * 950;
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
