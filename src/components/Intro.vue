<template>
	<section ref="intro" class="intro">
		<h2 class="intro__title">
			You're Invited!
		</h2>

		<p class="intro__text">
			We're getting married in central Manchester on Saturday the 12th of September
			2020, and would love for you to celebrate the day with us.
		</p>
		<p class="intro__text">
			Please let us know if you can come along by the 29th of February.
		</p>
		<p class="intro__heart">
			❤
		<!-- TODO: heart icon goes here -->
		</p>
	</section>
</template>

<script>
import ScrollListener from '@/services/ScrollListener';
import gsap from 'gsap';

export default {
	name: 'Intro',
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
	}

	&__heart {
		text-align: center;
		padding: 10vh 0;
	}
}
</style>
