<template>
	<div class="rsvp-submit">
		<svg width="0" height="0">
			<defs>
				<clipPath
					id="loaderClipPath"
					ref="loaderClipPath"
					clipPathUnits="objectBoundingBox"
				>
					<rect
						x="0"
						y="0"
						width="1"
						height="1"
						transform-origin="left center"
					/>
				</clipPath>
			</defs>
		</svg>

		<button class="rsvp-submit__button" :disabled="submitStatus === 'submitting'">
			<div class="rsvp-submit__button__text">{{ caption }}</div>
			<div class="rsvp-submit__loader-bar">{{ caption }}</div>
		</button>
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
	mounted() {
		gsap.set(this.$refs.loaderClipPath, { scaleX: 0 });
	},
	methods: {
		async animateLoaderClipPath(maxLoadLength, promises) {
			let scaleXIncrement = 1 / promises.length;
			let completedPromises = [];
			let loadingAnimation = (scaleX) =>
				gsap.to(this.$refs.loaderClipPath, {
					scaleX,
					duration: maxLoadLength,
					ease: 'power2.out',
				});
			this.currentLoadingAnimation = loadingAnimation(scaleXIncrement);

			promises.forEach(async (promise) => {
				await promise;

				this.currentLoadingAnimation.kill();
				completedPromises.push(promise);
				let scaleX = completedPromises.length / promises.length;

				this.currentLoadingAnimation = gsap.to(this.$refs.loaderClipPath, {
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
				this.animateLoaderClipPath(5, this.submitPromises);
				this.caption = 'Sending...';
			} else if (newValue === 'successful') {
				this.caption = 'Sent';
			} else {
				this.caption = 'Send RSVP';
				if (this.currentLoadingAnimation) this.currentLoadingAnimation.kill();
				gsap.set(this.$refs.loaderClipPath, { scaleX: 0 });
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
		background: var(--color-form-secondary);
		border: none;
		color: var(--color-form-submit-text);
		cursor: pointer;
		font-size: 2rem;
		margin: 0;
		outline: none;
		padding: 0.3em 1em;
		position: relative;
		text-transform: uppercase;
		width: 100%;

		&:focus {
			outline: 2px solid var(--color-form-secondary);
		}
	}

	&__loader-bar {
		align-items: center;
		background: var(--color-form-submit-text);
		box-sizing: content-box;
		clip-path: url(#loaderClipPath);
		color: var(--color-form-secondary);
		display: flex;
		font-family: var(--font-header);
		font-style: italic;
		font-weight: 900;
		height: calc(100% - 4px);
		justify-content: center;
		left: 2px;
		padding: 0;
		position: absolute;
		top: 2px;
		user-select: none;
		width: calc(100% - 4px);
	}
}
</style>
