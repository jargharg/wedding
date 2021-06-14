<template>
	<div :class="['slide-wrapper', { 'slide-wrapper--with-padding': withPadding }]">
		<div ref="content" class="slide-wrapper__content">
			<slot />
		</div>
	</div>
</template>

<script>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default {
	props: {
		withPadding: {
			type: Boolean,
			default: true,
		},
	},
	mounted() {
		gsap.timeline({
			scrollTrigger: {
				trigger: this.$el,
				start: this.$el.offsetTop - window.innerHeight,
				end: this.$el.offsetTop - window.innerHeight * 0.5,
				scrub: 0.3,
			},
		}).from(this.$refs.content, {
			ease: 'linear',
			opacity: 0,
		});
	},
};
</script>

<style lang="scss">
.slide-wrapper {
	align-items: center;
	background: var(--color-secondary);
	color: var(--color-primary);
	display: flex;
	justify-content: center;
	min-height: 100vh;
	overflow: hidden;
	position: relative;
	z-index: 2;

	&__content {
		margin: 0 auto;
		position: relative;
		width: 100%;
	}

	&--with-padding .slide-wrapper__content {
		max-width: 1000px;
		padding: var(--padding-section);
		width: auto;
	}
}
</style>
