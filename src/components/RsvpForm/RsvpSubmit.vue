<template>
	<div class="rsvp-submit">
		<button class="rsvp-submit__button" :disabled="submitStatus === 'submitting'">
			{{ caption }}
		</button>
		<div ref="loaderBar" class="rsvp-submit__loader-bar"></div>
	</div>
</template>

<script>
import gsap from 'gsap';
import { mapState } from 'vuex';

export default {
	name: 'RsvpSubmit',
	data() {
		return {
			caption: 'Send RSVP',
		};
	},
	computed: mapState({
		submitStatus: (state) => state.submitStatus,
		submitPromises: (state) => state.submitPromises,
	}),
	methods: {
		async animateLoaderBar(maxLoadLength, promises) {
			const scaleXIncrement = 1 / promises.length;
			const completedPromises = [];
			const loadingAnimation = (scaleX) =>
				gsap.to(this.$refs.loaderBar, {
					scaleX,
					duration: maxLoadLength,
					ease: 'power2.out',
				});
			this.currentLoadingAnimation = loadingAnimation(scaleXIncrement);

			promises.forEach(async (promise) => {
				await promise;

				this.currentLoadingAnimation.kill();
				completedPromises.push(promise);
				const scaleX = completedPromises.length / promises.length;

				this.currentLoadingAnimation = gsap.to(this.$refs.loaderBar, {
					scaleX,
					duration: maxLoadLength / 10,
					onComplete: () => {
						if (completedPromises.length === promises.length) return;
						this.currentLoadingAnimation = loadingAnimation(
							scaleX + scaleXIncrement,
						);
					},
				});
			});
		},
	},
	watch: {
		submitStatus(newValue) {
			if (newValue === 'submitting') {
				this.animateLoaderBar(5, this.submitPromises);
				this.caption = 'Sending...';
			} else if (newValue === 'successful') {
				this.caption = 'Sent';
			} else {
				this.caption = 'Send RSVP';
				if (this.currentLoadingAnimation) this.currentLoadingAnimation.kill();
				gsap.set(this.$refs.loaderBar, { scaleX: 0 });
			}
		},
	},
};
</script>

<style lang="scss">
.rsvp-submit {
	position: relative;

	&__button {
		-webkit-appearance: button;
		background: var(--color-form-inverse);
		border: none;
		color: var(--color-form-submit-text);
		cursor: pointer;
		font-size: 2rem;
		margin: 0;
		outline: none;
		padding: 0.3em 1em;
		text-transform: uppercase;
		width: 100%;

		&:focus {
			outline: 2px solid var(--color-form-inverse);
		}
	}

	&__loader-bar {
		background: white;
		height: calc(100% - 4px);
		left: 2px;
		mix-blend-mode: difference;
		position: absolute;
		top: 2px;
		transform-origin: left;
		transform: scaleX(0);
		width: calc(100% - 4px);
	}
}
</style>
