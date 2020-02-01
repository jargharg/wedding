<template>
	<div class="rsvp-text">
		<label class="rsvp-text__header" :for="id">
			{{ label }}
		</label>

		<input
			class="rsvp-text__input"
			:aria-label="label"
			:id="id"
			:placeholder="placeholder"
			:type="type"
			:value="value"
			:autocomplete="autocomplete"
		/>
	</div>
</template>

<script>
export default {
	name: 'RsvpText',
	props: {
		label: String,
		placeholder: String,
		value: String,
		id: String,
		type: String,
		autocomplete: Boolean,
	},
};
</script>

<style lang="scss" scoped>
.rsvp-text {
	display: block;
	font-size: var(--font-size-content-small);
	padding: 0;
	position: relative;
	margin-bottom: 1rem;

	&__header {
		font-family: var(--font-header);
		font-size: var(--font-size-subheader);
		font-style: italic;
		font-weight: 900;
		margin: 0;
		text-transform: uppercase;
	}

	&__input {
		background: transparent;
		border: none;
		border-bottom: 1px dashed var(--color-form-inverse);
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
</style>
