<template>
	<section class="splash">
		<svg
			viewBox="50 0 1340 1440"
			ref="title"
			class="title"
			id="splashImage"
			preserveAspectRatio="xMidYMid slice"
		>
			<defs>
				<filter id="turbulence">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.01"
						numOctaves="1"
						data-filterId="3"
					/>
					<feDisplacementMap
						ref="turbScale"
						xChannelSelector="R"
						yChannelSelector="G"
						in="SourceGraphic"
						scale="0"
					/>
				</filter>

				<path
					id="splashCurve"
					d="M 40,50 a 10,10 0 1,1 20,0 a 10,10 0 1,1 -20,0"
				/>
			</defs>

			<text-on-path
				v-for="(_, index) in new Array(ROWS)"
				:row-index="index"
				:key="index"
				:transform="`translate(0,${translates[index]})`"
			>
				{{
					index % 2
						? 'HANNAH & JAROD GET MARRIED •'
						: '25·09·21 • 25·09·21 • 25·09·21 •	'
				}}
			</text-on-path>
		</svg>
		<RsvpButton class="rsvp-button--splash" href="#intro" />
	</section>
</template>

<script>
import RsvpButton from './RsvpButton';
import TextOnPath from './TextOnPath';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ROWS = 26;
const SPACE_BETWEEN_LINES = 60;
const OVERLAP = SPACE_BETWEEN_LINES * 3;

export default {
	name: 'Splash',
	components: {
		RsvpButton,
		TextOnPath,
	},
	data() {
		return {
			date: '25·09·21',
			isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
			ROWS,
		};
	},
	mounted() {
		this.setWarpAnimation({
			start: this.$el.offsetTop,
			end: window.innerHeight,
		});
	},
	computed: {
		translates() {
			let translates = [];
			for (let i = 0; i < ROWS; i++) {
				translates.push(i * SPACE_BETWEEN_LINES - OVERLAP);
			}
			return translates;
		},
	},
	methods: {
		setWarpAnimation({ start, end }) {
			// @TODO fix svg filter for safari
			if (this.isSafari) return;

			this.warpAnimation = gsap
				.timeline({
					scrollTrigger: {
						trigger: this.$el,
						start,
						end,
						scrub: 0.3,
					},
				})
				.to(this.$refs.turbScale, {
					attr: { scale: 100 },
					ease: 'power4.out',
				});
		},
		getStyle(index) {
			return `transform: scale(${(1.27 ** index).toFixed(3)}) rotate(${index *
				20}deg)`;
		},
	},
};
</script>

<style lang="scss">
.splash {
	height: 100vh;
	position: relative;
	z-index: 4;
	background: var(--color-primary);
}

.title {
	color: var(--color-secondary);
	filter: url('#turbulence');
	height: 100vh;
	width: 100vw;
	user-select: none;
	display: block;
	overflow: hidden;
}

.splash .rsvp-button {
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	position: absolute;
	height: var(--rsvp-size);
	width: var(--rsvp-size);
	background: var(--color-primary);
	border-radius: 50%;
	fill: var(--color-secondary);
	box-shadow: 0 0 0 2px var(--color-secondary);
	stroke: none;

	&:hover {
		transform: translate(-50%, -50%) scale(1.05);
	}
}
</style>
