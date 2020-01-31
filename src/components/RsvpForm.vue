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

		<div class="form__container">
			<form
				class="rsvp__form"
				action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSeAPLkA1YAVkFCAgIt7YlM1SUVIcYTZhhTKIXif9d9nciEd6Q/formResponse"
				target="_self"
				method="POST"
				id="mG61Hd"
			>
				<label class="rsvp__input rsvp__input--text">
					<h3 class="rsvp__input__header">Name</h3>
					<input
						type="text"
						aria-label="Name"
						name="entry.1042661726"
						required
					/>
				</label>

				<label class="rsvp__input rsvp__input--text">
					<h3 class="rsvp__input__header">Email Address</h3>
					<input
						type="email"
						aria-label="Email Address"
						name="entry.1024004482"
						required
					/>
				</label>

				<label class="rsvp__input">
					<h3 class="rsvp__input__header">Will you be joining us?</h3>
					<label for="rsvpYes">
						<input
							type="radio"
							name="entry.187353647"
							id="rsvpYes"
							value="Yep"
						/>
						Yes
					</label>
					<label for="rsvpNo">
						<input
							type="radio"
							name="entry.187353647"
							id="rsvpNo"
							value="Nope"
						/>
						No
					</label>
				</label>

				<label class="rsvp__input rsvp__input--text">
					<h3 class="rsvp__input__header">Anything else you want to say?</h3>
					<input
						type="text"
						aria-label="Anything else you want to say?"
						name="entry.511653375"
						placeholder="Dietary requirements, excuses, well wishes..."
					/>
				</label>

				<button class="rsvp__submit">Submit</button>

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
	color: var(--color-main);
	min-height: 100vh;
	padding: var(--padding-section);
	display: flex;
	flex-direction: column;

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
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		max-width: 600px;
		padding: var(--padding-content);
		width: 100%;

		&__container {
			align-items: center;
			display: flex;
			flex: 1;
			justify-content: center;
		}
	}

	&__input {
		display: block;
		font-size: var(--font-size-subheader);
		margin-bottom: 2em;
		padding: 0;
		position: relative;

		&__header {
			font-size: var(--font-size-subheader);
		}

		&--text {
			&::after {
				background: var(--color-main);
				bottom: 0;
				content: '';
				display: block;
				height: 1px;
				left: 0;
				position: absolute;
				width: 100%;
			}
		}

		input:not([type='radio']) {
			background: transparent;
			border: none;
			color: var(--color-main);
			font-size: var(--font-size-content-small);
			outline: none;
			width: 100%;

			&::placeholder {
				color: var(--color-main);
				opacity: 0.5;
			}
		}
	}

	&__submit {
		background: var(--color-main);
		border: none;
		padding: 0.3em 1em;
		color: var(--color-inverse);
		font-family: var(--font-header);
		text-transform: uppercase;
		font-size: 2rem;
	}
}
</style>
