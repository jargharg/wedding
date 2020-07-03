<template>
	<section ref="intro" class="intro">
		<h2 class="intro__title">
			You're Invited!
		</h2>

		<p class="intro__text">
			We're getting married on Saturday 1st May 2021, and would love for you to
			celebrate the day with us.
		</p>

		<p class="intro__text">
			Our venue is HOME in central Manchester. The ceremony will be at 4pm, with
			food, drinks and dancing to follow until late.
		</p>

		<p class="intro__text">
			Please let us know if you can come some time before next year...
		</p>

		<p class="intro__heart">
			<HeartSplit />
		</p>
	</section>
</template>

<script>
import ScrollListener from '@/services/ScrollListener';
import HeartSplit from './HeartSplit';
import gsap from 'gsap';

export default {
	name: 'Intro',
	components: {
		HeartSplit,
	},
	mounted() {
		this.setBackgroundAnimation();

		const { offsetTop } = this.$el;
		ScrollListener.addAction({
			type: 'progress',
			startY: offsetTop - window.innerHeight * 0.6,
			endY: offsetTop,
			actionToProgress: (progress) => {
				this.backgroundAnimation.progress(progress);
			},
		});
	},
	methods: {
		setBackgroundAnimation() {
			const bgColor = getComputedStyle(document.body).getPropertyValue(
				'--color-inverse',
			);

			gsap.set(this.$refs.intro, { opacity: 0 });

			this.backgroundAnimation = gsap
				.timeline()
				.to('#app', {
					backgroundColor: bgColor,
					ease: 'power4.out',
					duration: 1,
				})
				.to(this.$refs.intro, {
					opacity: 1,
					duration: 1,
					delay: -1,
				})
				.pause();
		},
	},
};
</script>

<style scoped lang="scss">
.intro {
	color: var(--color-main);
	padding: var(--padding-section);
	max-width: 1000px;
	margin: 0 auto;

	&__title {
		font-size: var(--font-size-header);
	}

	&__text {
		font-size: var(--font-size-content);
		margin: 1rem 0;
		padding: var(--padding-content);
		line-height: var(--line-height-body);
	}

	&__heart {
		text-align: center;
		padding: 4vh 0;

		img {
			max-width: 100px;
		}
	}

	a {
		color: inherit;
	}
}
</style>
