<template>
	<section ref="intro" class="intro">
		<div class="intro__content">
			<h2 class="intro__title">
				You're Invited!
			</h2>

			<p class="intro__text">
				Come join us at HOME, Manchester bla bla bla 4pm bla bla til 1am bla bla
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere
				molestie ante, in ultricies libero fermentum et. Duis vehicula lorem
				vulputate nulla lobortis egestas.
			</p>

			<p class="intro__text">
				Aenean at finibus velit. Cras bibendum, risus sit amet volutpat feugiat,
				sapien elit scelerisque ante, sit amet condimentum arcu eros eget turpis.
				Morbi ullamcorper consequat vulputate. Mauris luctus arcu non nisi varius
				ultrices.
			</p>

			<p class="intro__text">
				Suspendisse potenti. Pellentesque tempus ex odio, in commodo risus
				tincidunt vel. Etiam eu pretium augue. Quisque sollicitudin mauris quis
				urna rhoncus, in dictum orci euismod. Mauris at augue ultrices justo
				blandit mollis ac eget dolor.
			</p>
		</div>
	</section>
</template>

<script>
import ScrollListener from '@/services/ScrollListener';
import gsap from 'gsap';

export default {
	name: 'Intro',
	mounted() {
		this.setAnimation();
		this.elementTop = this.$el.offsetTop;
		ScrollListener.addAction({
			startY: this.elementTop - window.innerHeight * 0.6,
			endY: this.elementTop,
			actionToProgress: progress => {
				this.tl.progress(progress);
			},
		});
	},
	methods: {
		setAnimation() {
			const bgColor = getComputedStyle(document.body).getPropertyValue(
				'--splash-bg-inverse-color',
			);

			gsap.set(this.$refs.intro, { opacity: 0 });

			this.tl = gsap.timeline();
			this.tl
				.to('#app', {
					backgroundColor: bgColor,
					ease: 'power4.out',
					duration: 1,
				})
				.to(this.$refs.intro, {
					opacity: 1,
					delay: -1,
				})
				.pause();
		},
	},
};
</script>

<style scoped lang="scss">
.intro {
	&__content {
		// min-height: 100vh;
		height: 100%;
		padding: 1rem;
		color: var(--splash-bg-color);
	}

	&__title {
		font-size: 4rem;

		@media screen and (max-width: 600px) {
			font-size: 2.2rem;
		}
	}

	&__text {
		font-size: 1.5rem;
		margin: 1rem 0;
		padding: 0.5rem;

		@media screen and (max-width: 600px) {
			font-size: 1.2rem;
		}
	}
}
</style>
