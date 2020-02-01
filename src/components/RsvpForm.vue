<template>
	<section id="rsvp" class="rsvp">
		<h2 class="rsvp__header">
			<span class="rsvp__header--large">
				Respond if you please
			</span>

			<span class="rsvp__header--small">
				RSVP
			</span>
		</h2>

		<div class="rsvp__form__container">
			<form
				class="rsvp__form"
				action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSeAPLkA1YAVkFCAgIt7YlM1SUVIcYTZhhTKIXif9d9nciEd6Q/formResponse"
				target="_self"
				method="POST"
				id="mG61Hd"
			>
				<div class="rsvp__input rsvp__input--text">
					<label class="rsvp__input__header" for="name">
						Name(s)
					</label>

					<input
						id="name"
						type="text"
						aria-label="Name"
						name="entry.1042661726"
						placeholder="Boaty McBoatface"
						required
					/>
					<div class="rsvp__input__border"></div>
				</div>

				<div class="rsvp__input rsvp__input--text">
					<label class="rsvp__input__header" for="email">
						Email Address
					</label>

					<input
						id="email"
						type="email"
						aria-label="Email Address"
						name="entry.1024004482"
						placeholder="email@address.com"
						required
					/>

					<div class="rsvp__input__border"></div>
				</div>

				<div class="rsvp__input">
					<label class="rsvp__input__header">Will you be joining us?</label>

					<div class="rsvp__input--radio">
						<input
							type="radio"
							name="entry.187353647"
							id="rsvpYes"
							value="Yes"
						/>

						<label for="rsvpYes">
							Yes please
						</label>

						<input
							type="radio"
							name="entry.187353647"
							id="rsvpNo"
							value="No"
						/>

						<label for="rsvpNo">
							No thx
						</label>
					</div>
				</div>

				<div class="rsvp__input rsvp__input--text">
					<label class="rsvp__input__header" for="anythingElse">
						Anything else you want to say?
					</label>

					<input
						id="anythingElse"
						type="text"
						aria-label="Anything else you want to say?"
						name="entry.511653375"
						placeholder="Dietary requirements, excuses, well wishes..."
					/>

					<div class="rsvp__input__border"></div>
				</div>

				<button class="rsvp__submit">Submit</button>

				<!-- guest type hidden field -->
				<input type="hidden" name="entry.442594185" v-bind:value="guestType" />

				<!-- Google Form bumph whichc may or may not be required -->
				<input
					type="hidden"
					name="draftResponse"
					value='[null,null,"7665152008503844129"]'
				/>
				<input type="hidden" name="fvv" value="1" />
				<input type="hidden" name="pageHistory" value="0" />
				<input type="hidden" name="fbzx" value="7665152008503844129" />
			</form>
		</div>
	</section>
</template>

<script>
import ScrollListener from '@/services/ScrollListener';
import gsap from 'gsap';

export default {
	name: 'RsvpForm',
	props: { guestType: String },
	mounted() {
		this.setAnimation();
		this.elementTop = this.$el.offsetTop;
		ScrollListener.addAction({
			startY: this.elementTop - window.innerHeight * 0.6,
			endY: this.elementTop,
			actionToProgress: progress => {
				this.tl.progress(progress);
			},
		});
	},
	methods: {
		setAnimation() {
			const bgColor = getComputedStyle(document.body).getPropertyValue(
				'--color-inverse',
			);

			gsap.set(this.$el, { opacity: 0 });

			this.tl = gsap.timeline();
			this.tl
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
	},
};
</script>

<style scoped lang="scss">
.rsvp {
	--color-form-main: var(--color-main);
	--color-form-main-text: var(--color-main);
	--color-form-inverse: var(--color-inverse);
	--color-form-submit-text: var(--color-main);
	color: var(--color-main);
	min-height: 100vh;
	padding: var(--padding-section);
	display: flex;
	flex-direction: column;

	@media screen and (max-width: 600px) {
		--color-form-main: transparent;
		--color-form-main-text: var(--color-main);
		--color-form-inverse: var(--color-main);
		--color-form-submit-text: var(--color-inverse);
	}

	&__header {
		font-size: var(--font-size-header);

		&--small {
			display: none;
		}

		@media screen and (max-width: 500px) {
			&--large {
				display: none;
			}

			&--small {
				display: block;
			}
		}
	}

	&__form {
		background: var(--color-form-main);
		color: var(--color-form-inverse);
		box-shadow: 0 0 0 3px var(--color-form-inverse), 0 0 0 6px var(--color-form-main);
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		max-width: 600px;
		padding: 1.5rem;
		width: 100%;

		@media screen and (max-width: 600px) {
			box-shadow: none;
			padding: 0;
			flex: 1;
			height: 100%;
		}

		&__container {
			align-items: center;
			display: flex;
			flex: 1;
			justify-content: center;

			@media screen and (max-width: 600px) {
				padding-top: 1rem;
				flex: 0;
			}
		}
	}

	&__input {
		display: block;
		font-size: var(--font-size-content-small);
		margin-bottom: 2rem;
		padding: 0;
		position: relative;

		&__header {
			font-family: var(--font-header);
			font-size: var(--font-size-subheader);
			font-style: italic;
			font-weight: 900;
			margin: 0;
			text-transform: uppercase;
		}

		&__border {
			background: var(--color-form-inverse);
			bottom: 0;
			display: block;
			height: 3px;
			left: 0;
			position: absolute;
			width: 0;
			transition: 0.2s;
		}

		&--radio {
			width: 100%;

			label {
				margin-top: 0.5em;
				display: inline-block;
				width: 50%;
				padding: var(--padding-content);
				border: 1px solid var(--color-form-inverse);
				text-align: center;

				&:last-of-type {
					border-left: none;
				}

				@media screen and (max-width: 600px) {
					font-size: 1rem;
				}
			}

			input {
				opacity: 0;
				width: 0;
				position: absolute;

				&:focus + label {
					outline: 2px solid var(--color-inverse);
				}

				&:checked + label {
					background: var(--color-form-inverse);
					color: var(--color-form-main);
				}
			}
		}

		input:not([type='radio']) {
			background: transparent;
			border: none;
			border-bottom: 1px solid var(--color-form-inverse);
			color: var(--color-form-inverse);
			font-size: var(--font-size-content-small);
			padding: var(--padding-content);
			outline: none;
			width: 100%;

			@media screen and (max-width: 600px) {
				font-size: 1rem;
			}

			&:focus {
				+ .rsvp__input__border {
					width: 100%;
				}
			}

			&::placeholder {
				color: var(--color-form-inverse);
				opacity: 0.5;
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
}
</style>
