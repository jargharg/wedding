<template>
	<div class="hearts" ref="hearts">
		<svg
			v-for="(_, index) in 10"
			:key="index"
			class="heart"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="-1 -1 26 26"
		>
			<path
				stroke="rgb(0, 57, 63)"
				fill="rgb(255, 198, 192)"
				vector-effect="non-scaling-stroke"
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
			currentAnimation: null,
		};
	},
	methods: {
		sprayConfetti(event) {
			const { top, left, height, width } = event.target.getBoundingClientRect();
			const containerLocation = this.$refs.hearts.getBoundingClientRect();

			const startX = left + height / 2 - containerLocation.left;
			const startY = top + width / 2 - containerLocation.top;

			const container = document.querySelector('.hearts');
			const hearts = Array.from(document.querySelectorAll('.heart'));

			gsap.set(container, { visibility: 'visible' });
			gsap.set(hearts, { scale: 0 });

			const playAnimation = () => {
				if (this.currentAnimation) this.currentAnimation.kill();

				this.currentAnimation = gsap
					.timeline()
					.addLabel('start')
					.set(hearts, {
						x: startX,
						y: startY,
						rotate: 0,
						scale: 0,
					});

				hearts.forEach((heart, index) => {
					const heartAnimation = this.generateHeartAnimation({
						heart,
						index,
						startX,
						startY,
					});

					this.currentAnimation.add(heartAnimation, 'start');
				});
			};

			playAnimation();
		},
		generateHeartAnimation({ heart, index, startX, startY }) {
			const randomX = Math.random();

			return gsap
				.timeline()
				.to(heart, {
					delay: index * 0.02,
					duration: 0.3,
					ease: 'power3.out',
					rotate: 60 - randomX * 120,
					scale: 0.2 + Math.random(),
					x: startX + 150 - randomX * 300,
					y: startY - 50 - Math.random() * 150,
				})
				.to(heart, {
					duration: 1,
					ease: 'power1.in',
					rotate: 0,
					scale: 0,
					y: startY + 200,
				})
				.set(heart, { x: 0, y: 0 });
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
	opacity: 0.95;
}
</style>
