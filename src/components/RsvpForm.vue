<template>
	<section id="rsvp" class="rsvp" @submit="submitForm">
		<h2 class="rsvp__header">
			R • S • V • P •
		</h2>

		<div class="rsvp__form__container">
			<form class="rsvp__form" ref="rsvpForm" @submit="submitForm">
				<RsvpGuests />

				<RsvpText
					:autocomplete="true"
					:value="emailAddress"
					@updated="updateEmailAddress"
					id="emailAddress"
					label="Email"
					placeholder="email@address.com"
					type="email"
				/>

				<RsvpText
					:autocomplete="false"
					:value="additionalDetails"
					@updated="updateAdditionalDetails"
					id="additionalDetails"
					label="Anything else you want to say?"
					placeholder="Dietary requirements, excuses, well wishes..."
					type="text"
				/>

				<RsvpSubmit :promises="promises" :submittingStatus="submittingStatus" />
			</form>

			<div ref="submitted" class="rsvp__submitted">
				<picture>
					<source srcset="/thumbsup.webp" type="image/webp" />
					<source srcset="/thumbsup.gif" type="image/gif" />
					<img
						class="rsvp__submitted__image"
						src="/thumbsup.gif"
						alt="Thumbs up!"
					/>
				</picture>

				<caption class="rsvp__submitted__caption">
					Got it, thanks!
				</caption>
			</div>
		</div>
	</section>
</template>

<script>
import ScrollListener from '@/services/ScrollListener';
import gsap from 'gsap';
import RsvpGuests from './RsvpForm/RsvpGuests';
import RsvpText from './RsvpForm/RsvpText';
import RsvpSubmit from './RsvpForm/RsvpSubmit';
import { mapState } from 'vuex';

export default {
	name: 'RsvpForm',
	components: {
		RsvpGuests,
		RsvpText,
		RsvpSubmit,
	},
	data() {
		return {
			form: {
				baseUrl:
					'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeAPLkA1YAVkFCAgIt7YlM1SUVIcYTZhhTKIXif9d9nciEd6Q/formResponse',
				fieldNames: {
					names: 'entry.1042661726',
					rsvps: 'entry.187353647',
					emailAddress: 'entry.1024004482',
					additionalDetails: 'entry.511653375',
					guestType: 'entry.442594185',
				},
			},
			promises: [],
			submittingStatus: false,
		};
	},
	computed: mapState({
		emailAddress: ({ formValues }) => formValues.emailAddress,
		additionalDetails: ({ formValues }) => formValues.additionalDetails,
		submitStatus: (state) => state.submitStatus,
	}),
	mounted() {
		this.setBackgroundAnimation();

		const { offsetTop } = this.$el;
		ScrollListener.addAction({
			type: 'progress',
			startY: offsetTop - window.innerHeight * 0.6,
			endY: offsetTop,
			actionToProgress: (progress) => {
				this.backgroundAnimation.progress(progress);
			},
		});
	},
	methods: {
		setBackgroundAnimation() {
			const bgColor = getComputedStyle(document.body).getPropertyValue(
				'--color-inverse',
			);

			gsap.set(this.$el, { opacity: 0 });

			this.backgroundAnimation = gsap.timeline();
			this.backgroundAnimation
				.to('#app', {
					backgroundColor: bgColor,
					ease: 'power4.out',
					duration: 1,
				})
				.to(this.$el, {
					opacity: 1,
					delay: -1,
				})
				.pause();
		},
		playSubmitSuccessAnimation() {
			return gsap
				.timeline()
				.to(this.$refs.rsvpForm, {
					scale: 0,
					ease: 'back.in',
					duration: 0.5,
				})
				.set(this.$refs.rsvpForm, { display: 'none' })
				.set(this.$refs.submitted, { display: 'block', scale: 0 })
				.to(this.$refs.submitted, {
					scale: 1,
					ease: 'back.out',
					duration: 0.5,
				});
		},
		submitForm(e) {
			e.preventDefault();
			e.stopImmediatePropagation();
			this.$store.dispatch('submitRsvp');
		},
		updateEmailAddress(e) {
			this.$store.commit('updateEmailAddress', e.target.value);
		},
		updateAdditionalDetails(e) {
			this.$store.commit('updateAdditionalDetails', e.target.value);
		},
	},
	watch: {
		submitStatus(newValue) {
			if (newValue === 'successful') {
				this.playSubmitSuccessAnimation();
			}
		},
	},
};
</script>

<style lang="scss">
.rsvp {
	--color-caption-background: var(--color-inverse);
	--color-caption-text: var(--color-main);
	--color-form-inverse: var(--color-inverse);
	--color-form-main-text: var(--color-main);
	--color-form-main: var(--color-main);
	--color-form-submit-text: var(--color-main);

	color: var(--color-main);
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	max-width: 1000px;
	min-height: 100vh;
	padding: var(--padding-section);

	@media screen and (max-width: 600px) {
		--color-form-inverse: var(--color-main);
		--color-form-main-text: var(--color-main);
		--color-form-main: var(--color-inverse);
		--color-form-submit-text: var(--color-inverse);
	}

	&__header {
		font-size: var(--font-size-header);
	}

	&__form {
		background: var(--color-form-main);
		color: var(--color-form-inverse);
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		max-width: 600px;
		padding: 1.5rem;
		width: 100%;

		@media screen and (max-width: 600px) {
			border: 1px solid var(--color-form-inverse);
			padding: 1rem 0 0;
		}

		&__container {
			align-items: center;
			display: flex;
			flex: 1;
			justify-content: center;
			background: repeating-linear-gradient(
				135deg,
				transparent,
				transparent 6px,
				var(--color-main) 6px,
				var(--color-main) 7px
			);

			// @media screen and (max-width: 600px) {
			// 	padding-top: 1rem;
			// 	flex: 0;
			// }
		}
	}

	&__submitted {
		display: none;
		padding: 1rem;
		background: var(--color-caption-background);
		border: 1px solid var(--color-caption-text);
		width: 350px;
		max-width: 100%;

		&__image {
			max-width: 100%;
		}

		&__caption {
			color: var(--color-caption-text);
			display: block;
			font-family: var(--font-header);
			font-size: var(--font-size-subheader);
			margin-top: 1rem;
			font-style: italic;
			font-weight: 900;
			text-transform: uppercase;
			width: 100%;
			line-height: 0.8;
		}
	}
}
</style>
