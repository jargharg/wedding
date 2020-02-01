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

		this.setFadeAnimation();
		this.rsvpFormTop = document.getElementById('rsvp').offsetTop;
		ScrollListener.addAction({
			startY: this.rsvpFormTop - window.innerHeight * 0.65,
			endY: this.rsvpFormTop - window.innerHeight * 0.55,
			actionToProgress: progress => {
				this.tl.progress(progress);
			},
		});
	},
	methods: {
		setFadeAnimation() {
			this.tl = gsap.timeline();
			this.tl
				.to(this.$el, { opacity: 0, duration: 1 })
				.to(this.$el, { visibility: 'hidden', duration: 0.1 })
				.pause();
		},
		goToRsvp() {
			gsap.to(window, {
				duration: 1.5,
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
	background-image: url('/rsvp-white.png');
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
