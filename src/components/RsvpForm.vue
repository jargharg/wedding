<template>
	<section id="rsvp" class="rsvp" @submit="submitForm">
		<h2 class="rsvp__header">
			R • S • V • P •
		</h2>

		<div class="rsvp__form__container">
			<form class="rsvp__form" ref="rsvpForm" @submit="submitForm">
				<RsvpGuest v-bind:label="'Guests'" v-bind:guests="formValues.guests" />

				<RsvpText
					id="emailAddress"
					label="Main Email Address"
					placeholder="email@address.com"
					type="email"
					v-bind:autocomplete="true"
					v-bind:value="formValues.emailAddress"
				/>

				<RsvpText
					id="additionalDetails"
					label="Anything else you want to say?"
					placeholder="Dietary requirements, excuses, well wishes..."
					type="text"
					v-bind:autocomplete="false"
					v-bind:value="formValues.additionalDetails"
				/>

				<button class="rsvp__submit">Submit</button>
			</form>

			<div ref="submitted" class="rsvp__submitted">
				<img src="/thumpsup.webp" alt="Thanks!" />
			</div>
		</div>
	</section>
</template>

<script>
import ScrollListener from '@/services/ScrollListener';
import gsap from 'gsap';
import RsvpGuest from './RsvpForm/RsvpGuest';
import RsvpText from './RsvpForm/RsvpText';

export default {
	name: 'RsvpForm',
	components: {
		RsvpGuest,
		RsvpText,
	},
	props: {
		guests: Array,
		emailAddress: String,
		guestType: String,
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
		};
	},
	computed: {
		formValues() {
			return {
				guests: this.guests.map(guest => ({ name: guest })),
				emailAddress: this.emailAddress,
				guestType: this.guestType,
				additionalDetails: '',
			};
		},
	},
	mounted() {
		this.setBackgroundAnimation();
		this.setFormSubmitAnimation();

		const { offsetTop } = this.$el;
		ScrollListener.addAction({
			type: 'progress',
			startY: offsetTop - window.innerHeight * 0.6,
			endY: offsetTop,
			actionToProgress: progress => {
				this.backgroundAnimation.progress(progress);
			},
		});
	},
	methods: {
		setBackgroundAnimation() {
			const bgColor = getComputedStyle(document.body).getPropertyValue('--color-inverse');

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
		setFormSubmitAnimation() {
			this.formSubmitAnimation = gsap
				.timeline()
				.to(this.$refs.rsvpForm, {
					scale: 0,
					ease: 'back.in',
					duration: 1,
				})
				.set(this.$refs.rsvpForm, { display: 'none' })
				.set(this.$refs.submitted, { display: 'block', scale: 0 })
				.to(this.$refs.submitted, {
					scale: 1,
					ease: 'back.out',
					duration: 1,
				})
				.pause();
		},
		getFormUrl() {
			const { guests, emailAddress, additionalDetails, guestType } = this.formValues;
			const { fieldNames } = this.form;
			const fields = {
				[fieldNames.names]: guests.map(guest => guest.name).join(', '),
				[fieldNames.rsvps]: guests.map(guest => guest.attending).join(', '),
				[fieldNames.emailAddress]: emailAddress,
				[fieldNames.additionalDetails]: additionalDetails,
				[fieldNames.guestType]: guestType,
			};
			console.log(fields);

			return this.form.baseUrl;
		},
		submitForm(e) {
			e.preventDefault();
			this.formSubmitAnimation.play();
			this.getFormUrl();
		},
	},
};
</script>

<style lang="scss">
.rsvp {
	--color-form-main: var(--color-main);
	--color-form-main-text: var(--color-main);
	--color-form-inverse: var(--color-inverse);
	--color-form-submit-text: var(--color-main);
	color: var(--color-main);
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	max-width: 1000px;
	min-height: 100vh;
	padding: var(--padding-section);

	@media screen and (max-width: 600px) {
		--color-form-main: transparent;
		--color-form-main-text: var(--color-main);
		--color-form-inverse: var(--color-main);
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
			box-shadow: none;
			flex: 1;
			height: 100%;
			padding: 0;
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
				var(--color-form-main) 6px,
				var(--color-form-main) 7px
			);

			@media screen and (max-width: 600px) {
				padding-top: 1rem;
				flex: 0;
			}
		}
	}

	&__submit {
		background: var(--color-form-inverse);
		border: none;
		padding: 0.3em 1em;
		color: var(--color-form-submit-text);
		font-family: var(--font-header);
		text-transform: uppercase;
		font-size: 2rem;
	}

	&__submitted {
		display: none;
	}
}
</style>
