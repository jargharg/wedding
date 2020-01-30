<template>
	<section id="rsvp" class="slide rsvp-form">
		<h2>Respond if you please</h2>

		<form
			class="rsvp-form__form"
			action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSeAPLkA1YAVkFCAgIt7YlM1SUVIcYTZhhTKIXif9d9nciEd6Q/formResponse"
			target="_self"
			method="POST"
			id="mG61Hd"
		>
			<label class="rsvp-form__question rsvp-form__question__text">
				<h3>Name</h3>
				<input type="text" aria-label="Name" name="entry.1042661726" required />
			</label>

			<label class="rsvp-form__question rsvp-form__question__text">
				<h3>Email Address</h3>
				<input
					type="email"
					aria-label="Email Address"
					name="entry.1024004482"
					required
				/>
			</label>

			<label class="rsvp-form__question">
				<h3>Will you be joining us?</h3>
				<label for="rsvpYes">
					<input type="radio" name="entry.187353647" id="rsvpYes" value="Yep" />
					Yes
				</label>
				<label for="rsvpNo">
					<input type="radio" name="entry.187353647" id="rsvpNo" value="Nope" />
					No
				</label>
			</label>

			<label class="rsvp-form__question rsvp-form__question__text">
				<h3>Anything else you want to say?</h3>
				<input
					type="text"
					aria-label="Anything else you want to say?"
					name="entry.511653375"
					placeholder="Dietary requirements, excuses, well wishes..."
				/>
			</label>

			<button class="rsvp-form__submit">submit</button>

			<!--
	<input type="hidden" name="fvv" value="1" />

	<input type="hidden" name="draftResponse" value='[null,null,"7665152008503844129"]' />

	<input type="hidden" name="pageHistory" value="0" />

	<input type="hidden" name="fbzx" value="7665152008503844129" />
 -->
		</form>
	</section>
</template>

<script>
import ScrollListener from '@/services/ScrollListener';
import gsap from 'gsap';

export default {
	name: 'RsvpForm',
	mounted() {},
	methods: {},
};
</script>

<style scoped lang="scss">
h2 {
	font-size: 7vw;
}
.rsvp-form {
	padding: 1rem;
	color: white;

	&__form {
		width: 100%;
		max-width: 600px;
		// margin: 0 auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: stretch;
	}

	&__question {
		display: block;
		padding: 0;
		margin-bottom: 2em;
		position: relative;
		font-size: 1.5rem;

		&__text {
			&::after {
				content: '';
				display: block;
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 1px;
				background: white;
			}
		}

		input:not([type='radio']) {
			font-size: 1.2rem;
			color: white;
			width: 100%;
			border: none;
			// border-bottom: 1px solid white;
			background: transparent;
			outline: none;

			&::placeholder {
				color: rgba(255, 255, 255, 0.6);
			}
		}
	}

	&__submit {
		background: white;
		border: none;
		padding: 0.3em 1em;
		color: var(--splash-bg-color);
		font-family: var(--header-text);
		text-transform: uppercase;
		font-size: 2rem;
	}
}
</style>
