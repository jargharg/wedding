<template>
	<section id="rsvp" class="slide rsvp-form">
		<form
			class="rsvp-form__form"
			action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSeAPLkA1YAVkFCAgIt7YlM1SUVIcYTZhhTKIXif9d9nciEd6Q/formResponse"
			target="_self"
			method="POST"
			id="mG61Hd"
		>
			<label class="rsvp-form__question">
				<h3>Name</h3>
				<input type="text" aria-label="Name" name="entry.1042661726" required />
			</label>

			<label class="rsvp-form__question">
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

			<label class="rsvp-form__question">
				<h3>Anything else you want to let us know?</h3>
				<input
					type="text"
					aria-label="Anything else you want to say?"
					name="entry.511653375"
					placeholder="Dietary requirements, excuses, well wishes..."
				/>
			</label>

			<button>submit</button>

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
.rsvp-form {
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;

	&__form {
		width: 100%;
		max-width: 500px;
		display: flex;
		flex-direction: column;
		justify-content: stretch;
	}

	&__question {
		display: block;
		padding: 0;
		margin-bottom: 2em;
		border-top: 1px dashed rgba(255, 255, 255, 0.5);
		position: relative;

		&::after {
			content: '';
			display: block;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 2px;
			background: white;
		}

		input:not([type='radio']) {
			width: 100%;
			border: none;
			// border-bottom: 1px solid white;
			background: transparent;
			outline: none;
		}
	}
}
</style>
