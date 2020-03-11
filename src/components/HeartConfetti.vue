<template>
	<div class="hearts" ref="hearts">
		<svg
			v-for="(_, index) in 10"
			:key="index"
			class="heart"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			<path
				stroke="rgb(0, 57, 63)"
				fill="rgb(255, 198, 192)"
				d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"
			/>
		</svg>
	</div>
</template>

<script>
import gsap from 'gsap';

export default {
	name: 'HeartConfetti',
	data() {
		return {
			currentAnimation: null
		}
	},
	methods: {
		sprayConfetti(event) {
			const { top, left, height, width } = event.target.getBoundingClientRect();
			const heartsBoxLocation = this.$refs.hearts.getBoundingClientRect();

			const startX = left + height / 2 - heartsBoxLocation.left;
			const startY = top + width / 2 - heartsBoxLocation.top;

			const heartsContainer = document.querySelector('.hearts');
			const hearts = Array.from(document.querySelectorAll('.heart'));

			gsap.set(heartsContainer, { visibility: 'visible' });
			gsap.set(hearts, { opacity: 0 });

			const heartPop = () => {
				if (this.currentAnimation) this.currentAnimation.kill();

				this.currentAnimation = gsap.timeline().addLabel('start');

				hearts.forEach((heart, index) => {
					const heartAnimation = gsap
						.timeline()
						.set(heart, {
							opacity: 0.9,
							scale: 0,
							x: startX,
							y: startY,
						})
						.to(heart, {
							delay: index * 0.02,
							duration: 0.3,
							ease: 'power1.out',
							rotate: 60 - Math.random() * 120,
							scale: 0.2 + Math.random() * 1,
							x: startX + 150 - Math.random() * 300,
							y: startY - 50 - Math.random() * 150,
						})
						.to(heart, {
							duration: 1,
							ease: 'power1.in',
							rotate: 0,
							scale: 0,
							y: startY + 200,
						});

					this.currentAnimation.add(heartAnimation, 'start');
				});
			};

			heartPop();
		},
	},
};
</script>

<style lang="scss">
.hearts {
	visibility: hidden;
	position: absolute;
}

.heart {
	width: 50px;
	height: 50px;
	color: hotpink;
	pointer-events: none;
	z-index: 100;
	position: absolute;
}
</style>
