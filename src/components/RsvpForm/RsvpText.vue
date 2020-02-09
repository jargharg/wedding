<template>
	<div class="rsvp-text">
		<label class="rsvp-text__header" :for="id">
			{{ label }}
		</label>

		<input
			class="rsvp-text__input"
			:aria-label="label"
			:autocomplete="autocomplete"
			:disabled="submitStatus === 'submitting'"
			:id="id"
			:placeholder="placeholder"
			:required="required"
			:type="type"
			:value="value"
			@input="updated"
		/>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'RsvpText',
	props: {
		autocomplete: Boolean,
		id: String,
		label: String,
		required: Boolean,
		placeholder: String,
		type: String,
		updateAction: Function,
		value: String,
	},
	computed: {
		...mapState({
			submitStatus: (state) => state.submitStatus,
		}),
	},
	methods: {
		updated() {
			this.$emit('updated', event);
		},
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

		@media screen and (max-width: 600px) {
			padding-left: 0.5rem;
		}
	}

	&__input {
		background: transparent;
		border: none;
		border-left: 1px dashed var(--color-form-inverse);
		border-bottom: 1px dashed var(--color-form-inverse);
		color: var(--color-form-inverse);
		font-size: var(--font-size-content-small);
		padding: 0.5rem;
		outline: none;
		width: 100%;

		@media screen and (max-width: 600px) {
			border-left: none;
			font-size: 1rem;
		}

		&:focus {
			outline: 2px solid var(--color-form-inverse);
			outline-offset: -1px;
		}

		&::placeholder {
			color: var(--color-form-inverse);
			opacity: 0.5;
		}
	}
}
</style>
