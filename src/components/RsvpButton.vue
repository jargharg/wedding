<template>
	<button class="rsvp" @click="goToRsvp"></button>
</template>

<script>
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import ScrollListener from '@/services/ScrollListener';

export default {
	name: 'RsvpButton',
	mounted() {
		gsap.registerPlugin(ScrollToPlugin);

		this.rotationAnimation = gsap.from(this.$el, {
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
	methods: {
		goToRsvp() {
			gsap.to(window, {
				duration: 1,
				ease: 'power1.out',
				scrollTo: '#rsvp',
			});
			gsap.to(this.$el, {
				scale: 1.1,
				duration: 0.15,
				repeat: 1,
				yoyo: true,
			});
		},
	},
};
</script>

<style scoped lang="scss">
.rsvp {
	background-color: transparent;
	background-image: url('https://i.ibb.co/z5nRJrS/rsvp-white.png');
	background-position: center;
	background-repeat: no-repeat;
	background-size: contain;
	border: none;
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
