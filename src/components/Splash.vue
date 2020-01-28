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
					ease: 'power4.easeIn',
					duration: 10,
				})
				.to(this.$refs.title, {
					opacity: 0,
					duration: 4,
					delay: -4,
					ease: 'power4.easeOut',
				})
				.pause();
		},
	},
};
</script>

<style lang="scss">
.splash {
	--title-color: white;
	height: 250vh;
	margin-bottom: -100vh;
	position: relative;
}

.title {
	filter: url('#turbulence');
	text-align: center;

	> span {
		display: block;
		color: var(--title-color);
		line-height: 0.8;
	}

	.h-and-j {
		font-size: 5.5vw;

		@media screen and (max-width: 600px) {
			font-size: 9.2vw;
		}
	}

	.get-married {
		display: inline-block;
		font-size: 5.5vw;

		@media screen and (max-width: 600px) {
			font-size: 12vw;
		}
	}

	.date {
		-webkit-text-stroke: 1px var(--title-color);
		color: transparent;
		font-size: 6.8vw;

		@media screen and (max-width: 600px) {
			font-size: 20vw;
		}

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
		justify-content: center;
		mix-blend-mode: difference;
	}
}
</style>
