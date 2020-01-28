<template>
	<a class="rsvp" href="#rsvp"></a>
</template>

<script>
import gsap from 'gsap';
import ScrollListener from '@/services/ScrollListener';

export default {
	name: 'RsvpButton',
	mounted() {
		this.rotationAnimation = gsap
			.from(this.$el, {
				rotate: '360deg',
				ease: 'linear',
				duration: 10,
				repeat: -1,
			});

		// ScrollListener.addAction({
		// 	startY: 0,
		// 	endY: document.documentElement.offsetHeight,
		// 	actionToProgress: progress => {
		// 		this.rotationAnimation.progress(this.rotationAnimation.progress() + (progress / 100));
		// 	},
		// });
	},
};
</script>

<style scoped lang="scss">
.rsvp {
	background-image: url('https://i.ibb.co/z5nRJrS/rsvp-white.png');
	background-position: center;
	background-repeat: no-repeat;
	background-size: contain;
	bottom: var(--rsvp-position);
	cursor: pointer;
	display: block;
	height: var(--rsvp-size);
	mix-blend-mode: difference;
	outline: none;
	position: fixed;
	right: var(--rsvp-position);
	transform-origin: center center;
	width: var(--rsvp-size);
	z-index: 999;
}

@keyframes rotate {
	from {
		transform: rotate(360deg);
	}

	to {
		transform: rotate(0deg);
	}
}
</style>
