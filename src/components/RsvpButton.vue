<template functional>
	<a class="rsvp-button" :href="data.attrs.href" target="_self">
		<svg viewBox="10 10 80 80">
			<defs>
				<path
					id="rsvpCurve"
					d="M 25, 50 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0"
				/>
			</defs>

			<g
				class="rsvp-button__text"
				:style="`font-size: ${data.attrs['font-size']}`"
				transform-origin="62.5% 62.5%"
			>
				<text>
					<textPath alignment-baseline="top" xlink:href="#rsvpCurve">
						<slot />
					</textPath>
				</text>
			</g>
		</svg>
	</a>
</template>

<style scoped lang="scss">
.rsvp-button {
	text-decoration: none !important;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	$root: &;
	background: transparent;
	border: none;
	cursor: pointer;
	display: block;
	fill: var(--color-secondary);
	height: var(--rsvp-size);
	outline: none;
	padding: 0.2rem;
	transition: 0.15s transform;
	width: var(--rsvp-size);
	z-index: 3;

	&:hover,
	&:focus {
		transform: scale(1.1);
	}

	svg {
		animation: rotate 20s infinite linear;
	}

	&__text {
		font-family: neue-haas-grotesk-display, sans-serif;
		font-style: normal;
	}
}

@keyframes rotate {
	from {
		transform: rotate(360deg);
	}

	to {
		transform: rotate(0deg);
	}
}
</style>
