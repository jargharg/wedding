<template>
	<SlideWrapper :withPadding="false" class="rsvp__container" id="rsvp">
		<section class="rsvp" @submit="submitForm">
			<HeartConfetti ref="confetti" />

			<h2 class="rsvp__header">
				R • S • V • P •
			</h2>

			<div class="rsvp__form__container">
				<form class="rsvp__form" ref="rsvpForm" @submit="submitForm">
					<RsvpGuests @confirmed="sprayConfetti" />

					<RsvpText
						:autocomplete="true"
						:required="true"
						:value="emailAddress"
						@updated="updateEmailAddress"
						id="emailAddress"
						label="Email"
						placeholder="email@address.com"
						type="email"
					/>

					<RsvpText
						:autocomplete="false"
						:required="false"
						:value="additionalDetails"
						@updated="updateAdditionalDetails"
						id="additionalDetails"
						label="Anything else you want to say?"
						placeholder="Dietary requirements, excuses, well wishes..."
						type="text"
					/>

					<RsvpSubmit
						:promises="promises"
						:submittingStatus="submittingStatus"
					/>

					<RsvpError />
				</form>

				<RsvpSubmitted :display="displaySubmitted" />
			</div>

			<button ref="reset" type="button" class="rsvp__reset" @click="resetForm">
				Send another RSVP? (Please don't spam us)
			</button>
		</section>
	</SlideWrapper>
</template>

<script>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeartConfetti from './HeartConfetti.vue';
import SlideWrapper from './SlideWrapper.vue';
import RsvpError from './RsvpForm/RsvpError';
import RsvpGuests from './RsvpForm/RsvpGuests';
import RsvpSubmit from './RsvpForm/RsvpSubmit';
import RsvpSubmitted from './RsvpForm/RsvpSubmitted';
import RsvpText from './RsvpForm/RsvpText';

import { mapState } from 'vuex';

gsap.registerPlugin(ScrollTrigger);

export default {
	name: 'RsvpForm',
	components: {
		RsvpGuests,
		RsvpText,
		RsvpSubmit,
		RsvpSubmitted,
		SlideWrapper,
		RsvpError,
		HeartConfetti,
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
			displaySubmitted: false,
		};
	},
	computed: mapState({
		emailAddress: ({ formValues }) => formValues.emailAddress,
		additionalDetails: ({ formValues }) => formValues.additionalDetails,
		submitStatus: (state) => state.submitStatus,
	}),
	methods: {
		sprayConfetti(event) {
			this.$refs.confetti.sprayConfetti(event);
		},
		playSubmitSuccessAnimation() {
			return gsap
				.timeline()
				.to(this.$refs.rsvpForm, {
					scale: 0,
					ease: 'back.in',
					duration: 0.5,
				})
				.add(() => (this.displaySubmitted = true))
				.set(this.$refs.rsvpForm, { display: 'none' })
				.set(this.$refs.reset, { display: 'block', x: '150%' })
				.to(this.$refs.reset, { x: 0, duration: 0.5, delay: 2 });
		},
		resetForm() {
			this.displaySubmitted = false;
			this.$store.dispatch('resetForm');
			gsap.timeline()
				.set(this.$refs.rsvpForm, { scale: 1, display: 'block' })
				.set(this.$refs.reset, { display: 'none' });
		},
		submitForm(e) {
			e.preventDefault();
			e.stopImmediatePropagation();
			this.$store.dispatch('submitRsvp');
		},
		updateAdditionalDetails(e) {
			this.$store.commit('updateAdditionalDetails', e.target.value);
		},
		updateEmailAddress(e) {
			this.$store.commit('updateEmailAddress', e.target.value);
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
	--color-caption-background: var(--color-secondary);
	--color-caption-text: var(--color-primary);
	--color-form-secondary: var(--color-primary);
	--color-form-primary-text: var(--color-primary);
	--color-form-primary: var(--color-secondary);
	--color-form-submit-text: var(--color-secondary);

	color: var(--color-primary);
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	max-width: 1000px;
	min-height: 100vh;
	overflow-x: hidden;
	padding: var(--padding-section);
	position: relative;

	&__container {
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--color-secondary);
		z-index: 4;
		position: relative;
	}

	&__header {
		font-size: var(--font-size-header);
	}

	&__form {
		background: var(--color-form-primary);
		border: 1px solid var(--color-form-secondary);
		color: var(--color-form-secondary);
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		max-width: 600px;
		padding: 1.5rem;
		position: relative;
		width: 100%;

		@media screen and (max-width: 600px) {
			border: 1px solid var(--color-form-secondary);
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
				var(--color-form-secondary) 6px,
				var(--color-form-secondary) 7px
			);
			flex-direction: column;
		}
	}

	&__reset {
		background: var(--color-form-primary);
		border: none;
		bottom: 1.5rem;
		color: var(--color-caption-text);
		cursor: pointer;
		display: none;
		font-size: var(--font-size-content-smallest);
		outline: none;
		padding: 0.5rem;
		position: absolute;
		right: 1rem;

		&:focus {
			outline: 2px solid var(--color-form-secondary);
		}
	}
}
</style>
