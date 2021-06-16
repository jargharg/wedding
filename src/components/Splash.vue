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
					class="text-path"
					id="textLine"
					d="M0,224C120,171,240,117,360,117.3C480,117,600,171,720,197.3C840,224,960,224,1080,213.3C1200,203,1320,181,1380,170.7L1440,160"
					transform-origin="center center"
				>
					<animateTransform
						v-if="!isSafari"
						attributeName="transform"
						attributeType="XML"
						type="scale"
						from="1.1"
						to="1"
						dur="2s"
						keyTimes="0;1"
						calcMode="spline"
						keySplines="0 0	 0 1"
					/>
				</path>
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

		<RsvpButton href="#intro" font-size="12.8px">
			READ • ALL • ABOUT • IT ◦
		</RsvpButton>

		<div v-if="isSafari" class="safari-warning">
			Right so Safari seems to hate this website when it's on a big screen. Please
			help us out and make the window smaller for a less glitchy experience (or even
			better, switch over to Chrome). THANX!!
		</div>
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

const SPEED = 0.1;
const FPMS = 60 / 1000;

export default {
	name: 'Splash',
	components: {
		RsvpButton,
		TextOnPath,
	},
	data() {
		return {
			ROWS,
			date: '25·09·21',
			isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
			buttonPos: null,
			mousePos: null,
			xSet: null,
			ySet: null,
			onMouseMove: null,
		};
	},
	mounted() {
		this.setWarpAnimation({
			start: this.$el.offsetTop,
			end: window.innerHeight,
		});
		this.setUpFollow();
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
		setUpFollow() {
			let button = this.$el.querySelector('.rsvp-button');

			gsap.set(button, { xPercent: -50, yPercent: -50 });
			gsap.from(button, {
				opacity: 0,
				display: 'none',
				duration: 1.2,
				delay: 1,
				ease: 'sine.out',
			});

			this.buttonPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
			this.mousePos = { ...this.buttonPos };

			if (this.isSafari) {
				gsap.set(button, this.buttonPos);
				return;
			}

			this.xSet = gsap.quickSetter(button, 'x', 'px');
			this.ySet = gsap.quickSetter(button, 'y', 'px');

			this.onMouseMove = ({ x, y }) => {
				this.mousePos = { x, y };
			};

			ScrollTrigger.create({
				start: -1,
				end: window.innerHeight,
				onEnter: this.startFollow,
				onLeave: this.stopFollow,
				onEnterBack: this.startFollow,
				onLeaveBack: this.stopFollow,
			});
		},
		startFollow() {
			window.addEventListener('mousemove', this.onMouseMove);
			gsap.ticker.add(this.followMouseWithButton);
		},
		stopFollow() {
			window.removeEventListener('mousemove', this.onMouseMove);
			gsap.ticker.remove(this.followMouseWithButton);
		},
		followMouseWithButton(_, deltaTime) {
			let dt = 1.0 - Math.pow(1.0 - SPEED, deltaTime * FPMS);
			let { x, y } = this.mousePos;
			this.buttonPos.x += (x - this.buttonPos.x) * dt;
			this.buttonPos.y += (y - this.buttonPos.y + window.pageYOffset) * dt;
			this.xSet(this.buttonPos.x);
			this.ySet(this.buttonPos.y);
		},
		setWarpAnimation({ start, end }) {
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
	},
};
</script>

<style lang="scss">
.splash {
	height: 100vh;
	position: relative;
	z-index: 4;
	background: var(--color-primary);
	overflow: hidden;
}

.title {
	filter: url('#turbulence');
	height: 100vh;
	width: 100vw;
	user-select: none;
	display: block;
	overflow: hidden;
}

.splash .rsvp-button {
	top: 0%;
	left: 0%;
	position: absolute;
	height: var(--rsvp-size);
	width: var(--rsvp-size);
	background: var(--color-primary);
	border-radius: 50%;
	fill: var(--color-secondary);
	box-shadow: 0 0 0 2px var(--color-secondary), 0 0 50px 5px var(--color-primary);
	stroke: none;
}

.safari-warning {
	position: absolute;
	top: 20%;
	left: 50%;
	transform: translateX(-50%);
	width: 20vw;
	display: none;
	color: var(--color-secondary);
	padding: 1rem;
	border-radius: 10px;
	background: #f008;
	border: 3px double var(--color-secondary);
	line-height: 1.3;

	@media screen and (min-width: 1450px) {
		display: block;
	}
}
</style>
