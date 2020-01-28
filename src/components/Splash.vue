<template>
	<section class="splash">
		<header class="slide title__container">
			<h1 class="title">
				<span class="h-and-j">
					Hannah & Jarod <span class="get-married">get married</span>
				</span>
				<span class="date">
					{{ date }}<span class="date__3"> {{ date }} {{ date }}</span>
				</span>
				<span class="h-and-j">
					Hannah & Jarod <span class="get-married">get married</span>
				</span>
				<span class="date">
					{{ date }}<span class="date__3"> {{ date }} {{ date }}</span>
				</span>
				<span class="h-and-j">
					Hannah & Jarod <span class="get-married">get married</span>
				</span>
			</h1>
		</header>

		<svg display="none">
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
		</svg>
	</section>
</template>

<script>
import gsap from 'gsap';
import ScrollListener from '@/services/ScrollListener';

export default {
	name: 'Splash',
	data() {
		return {
			date: '12·09·20',
		};
	},
	mounted() {
		this.elementTop = this.$el.offsetTop;
		this.scrollTimeline = this.$el.scrollHeight - window.innerHeight;

		this.setAnimation();
		ScrollListener.addAction({
			startY: this.elementTop,
			endY: this.elementTop + this.scrollTimeline,
			actionToProgress: progress => {
				this.tl.progress(progress);
			},
		});
	},
	methods: {
		setAnimation() {
			this.tl = gsap.timeline();
			this.tl
				.to(this.$refs.turbScale, {
					attr: { scale: 100 },
				})
				.pause();
		},
	},
};
</script>

<style lang="scss">
.splash {
	--title-color: #ffc4c1;
	height: 220vh;
	margin-bottom: -100vh;
	position: relative;
}

.title {
	filter: url('#turbulence');
	font-size: 2.5rem;
	font-style: italic;
	font-weight: 900;
	text-align: center;
	text-transform: uppercase;

	@media screen and (max-width: 600px) {
		font-size: 2rem;
	}

	> span {
		display: block;
	}

	.h-and-j {
		color: var(--title-color);
	}

	.get-married {
		display: inline-block;
	}

	.date {
		-webkit-text-stroke: 1px var(--title-color);
		color: transparent;
		font-size: 3.1rem;

		&__3 {
			@media screen and (max-width: 600px) {
				display: none;
				visibility: hidden;
			}
		}
	}

	&__container {
		line-height: 0.8;
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background: linear-gradient(
				90deg,
				var(--splash-bg-alt-color) 0,
				transparent 1px,
				transparent 100%
			),
			linear-gradient(
				0deg,
				var(--splash-bg-alt-color) 0,
				transparent 1px,
				transparent 100%
			);
		background-size: 10vh 10vh;
		background-color: var(--splash-bg-color);
		background-attachment: fixed;
		background-position: center center;
		border: 1px solid var(--splash-bg-alt-color)
	}
}
</style>
