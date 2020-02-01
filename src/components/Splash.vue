<template>
	<section class="splash">
		<header class="slide title__container">
			<h1 ref="title" class="title">
				<span class="h-and-j">
					Hannah & Jarod <span class="get-married">get married</span>
				</span>
				<span class="date">
					{{ date }}<span class="date__extra"> {{ date }} {{ date }}</span>
				</span>
				<span class="h-and-j">
					Hannah & Jarod <span class="get-married">get married</span>
				</span>
				<span class="date">
					{{ date }}<span class="date__extra"> {{ date }} {{ date }}</span>
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
		const { offsetTop } = this.$el;
		const scrollTimeline = this.$el.scrollHeight - window.innerHeight;

		this.setWarpAnimation();
		ScrollListener.addAction({
			type: 'progress',
			startY: offsetTop,
			endY: offsetTop + scrollTimeline,
			actionToProgress: progress => {
				this.warpAnimation.progress(progress);
			},
		});
	},
	methods: {
		setWarpAnimation() {
			this.warpAnimation = gsap.timeline();
			this.warpAnimation
				.to(this.$refs.turbScale, {
					attr: { scale: 100 },
					ease: 'power2.out',
					duration: 10,
				})
				.to(this.$refs.title, {
					opacity: 0,
					duration: 4,
					delay: -7,
					ease: 'power1.out',
				})
				.pause();
		},
	},
};
</script>

<style lang="scss">
.splash {
	--date-size: 6.8vw;
	--get-married-size: 5.5vw;
	--hj-size: 5.5vw;
	--title-color: white;
	height: 200vh;
	margin-bottom: -100vh;
	position: relative;

	@media screen and (max-width: 600px) {
		--hj-size: 9.2vw;
		--get-married-size: 12vw;
		--date-size: 20vw;
	}
}

.title {
	filter: url('#turbulence');
	text-align: center;
	color: var(--title-color);
	line-height: 0.8;

	> span {
		display: block;
	}

	.h-and-j {
		font-size: var(--hj-size);
	}

	.get-married {
		display: inline-block;
		font-size: var(--get-married-size);
	}

	.date {
		-webkit-text-stroke: 1px var(--title-color);
		color: transparent;
		font-size: var(--date-size);

		&__extra {
			@media screen and (max-width: 600px) {
				display: none;
				visibility: hidden;
			}
		}
	}

	&__container {
		align-items: center;
		display: flex;
		flex-direction: column;
		height: 100vh;
		justify-content: center;
		mix-blend-mode: difference;
		position: sticky;
		top: 0;
		width: 100%;
	}
}
</style>
