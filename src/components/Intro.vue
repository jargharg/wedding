<template>
	<section ref="intro" class="intro">
		<h2 class="intro__title">
			You're Invited!
		</h2>

		<p class="intro__text">
			Come join us at HOME, Manchester bla bla bla 4pm bla bla til 1am bla bla Lorem ipsum
			dolor sit amet, consectetur adipiscing elit. Donec posuere molestie ante, in ultricies
			libero fermentum et. Duis vehicula lorem vulputate nulla lobortis egestas.
		</p>

		<p class="intro__text">
			Aenean at finibus velit. Cras bibendum, risus sit amet volutpat feugiat, sapien elit
			scelerisque ante, sit amet condimentum arcu eros eget turpis. Morbi ullamcorper
			consequat vulputate. Mauris luctus arcu non nisi varius ultrices.
		</p>

		<p class="intro__text">
			Suspendisse potenti. Pellentesque tempus ex odio, in commodo risus tincidunt vel. Etiam
			eu pretium augue. Quisque sollicitudin mauris quis urna rhoncus, in dictum orci euismod.
			Mauris at augue ultrices justo blandit mollis ac eget dolor.
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
			actionToProgress: progress => {
				this.backgroundAnimation.progress(progress);
			},
		});
	},
	methods: {
		setBackgroundAnimation() {
			const bgColor = getComputedStyle(document.body).getPropertyValue('--color-inverse');

			gsap.set(this.$refs.intro, { opacity: 0 });

			this.backgroundAnimation = gsap.timeline();
			this.backgroundAnimation
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
}
</style>
