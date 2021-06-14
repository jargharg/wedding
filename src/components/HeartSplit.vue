<template>
	<svg
		ref="heart"
		class="heart"
		viewBox="0 -2 26 27"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g fill="currentColor" stroke="currentColor" stroke-width=".1">
			<path d="M13,24L10.946,21.982L15.054,21.982L13,24Z" />
			<path d="M15.054,21.982L10.946,21.982L8.928,20L17.072,20L15.054,21.982Z" />
			<path
				d="M17.588,19.493L17.072,20L8.928,20L8.413,19.493L7,18L19,18L17.588,19.493Z"
			/>
			<path d="M19,18L7,18L5.108,16L20.892,16L19,18Z" />
			<path
				d="M21.411,15.451L20.892,16L5.108,16L4.589,15.451L3.448,14L22.552,14L21.411,15.451Z"
			/>
			<path
				d="M22.899,13.56L22.552,14L3.448,14L3.102,13.56L2.137,12L23.863,12L22.899,13.56Z"
			/>
			<path
				d="M24.147,11.438C24.069,11.633 23.974,11.821 23.863,12C23.863,12 23.863,12 23.863,12L2.137,12L1.971,11.731L1.273,10L24.727,10C24.727,10 24.347,10.944 24.147,11.438Z"
			/>
			<path
				d="M24.984,8L25,8.192C25,8.792 24.908,9.394 24.727,10L1.273,10C1.092,9.394 1,8.792 1,8.192L1.016,8L24.984,8Z"
			/>
			<path
				d="M24.787,6.555C24.862,6.838 24.912,7.128 24.936,7.42C24.959,7.696 24.984,8 24.984,8L1.016,8L1.1,6.984L1.36,6L24.64,6C24.64,6 24.717,6.29 24.787,6.555Z"
			/>
			<path
				d="M1.36,6C3.028,1.146 10.227,0.489 13,5.248C15.754,0.523 22.972,1.137 24.64,6L1.36,6Z"
			/>
		</g>
	</svg>
</template>

<script>
import gsap from 'gsap';

export default {
	mounted() {
		let heartElements = this.$refs.heart.querySelectorAll('path');

		gsap.timeline({ repeat: -1 })
			.to(heartElements, {
				y: 0.5,
				duration: 0.5,
				ease: 'sine.inOut',
			})
			.to(heartElements, {
				y: 0,
				duration: 0.1,
				ease: 'sine.in',
			})
			.to(heartElements, {
				y: -3,
				stagger: -0.1,
				transformOrigin: 'center',
				duration: 0.5,
				ease: 'sine.out',
			})
			.to(heartElements, {
				y: 0,
				ease: 'bounce.out',
				duration: 0.5,
				delay: -0.05,
			})
			.to(null, { duration: 3 });
	},
};
</script>

<style lang="scss" scoped>
.heart {
	color: inherit;
	margin: 0 auto;
	width: 100px;
}
</style>
