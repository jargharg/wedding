<template>
	<div ref="submitted" class="submitted">
		<picture>
			<source srcset="/thumbsup.webp" type="image/webp" />
			<source srcset="/thumbsup.gif" type="image/gif" />
			<img class="submitted__image" src="/thumbsup.gif" alt="Thumbs up!" />
		</picture>

		<caption class="submitted__caption">
			Got it, thanks!
		</caption>
	</div>
</template>

<script>
import gsap from 'gsap';

export default {
	name: 'RsvpSubmitted',
	props: { display: Boolean },
	watch: {
		display(newValue) {
			if (newValue === true) {
				gsap.timeline()
					.set(this.$refs.submitted, { display: 'block', scale: 0 })
					.to(this.$refs.submitted, {
						scale: 1,
						ease: 'back.out',
						duration: 0.5,
					});
			} else {
				gsap.set(this.$refs.submitted, { display: 'none', scale: 0 });
			}
		},
	},
};
</script>

<style lang="scss">
.submitted {
	background: var(--color-caption-background);
	border: 1px solid var(--color-caption-text);
	display: none;
	max-width: 100%;
	padding: 1rem;
	position: relative;
	width: 350px;

	&__image {
		max-width: 100%;
	}

	&__caption {
		color: var(--color-caption-text);
		display: block;
		font-family: var(--font-header);
		font-size: var(--font-size-subheader);
		font-style: italic;
		font-weight: 900;
		line-height: 0.8;
		margin-top: 1rem;
		text-transform: uppercase;
		width: 100%;
	}
}
</style>
