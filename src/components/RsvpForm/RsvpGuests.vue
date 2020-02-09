<template>
	<div class="rsvp-guest">
		<div class="rsvp-guest__header">
			<label for="name0">
				Guest(s)
			</label>

			<label for="rsvpYes0">
				Attending
			</label>
		</div>

		<div class="rsvp-guest__row" v-for="(guest, index) in guests" :key="index">
			<input
				:aria-label="`Guest Name ${index + 1}`"
				:disabled="submitStatus === 'submitting'"
				:id="`name${index}`"
				:placeholder="`Guest Name ${index + 1}`"
				class="rsvp-guest__name"
				required
				type="text"
				:value="guest.name"
				@input="updateGuest"
			/>

			<div class="rsvp-guest__attending">
				<input
					:disabled="submitStatus === 'submitting'"
					:id="`rsvpYes${index}`"
					:name="`attending${index}`"
					required
					type="radio"
					value="Yes"
					:checked="guest.attending === 'Yes'"
					@change="updateGuest"
				/>

				<label :for="`rsvpYes${index}`">
					&#x2714;
				</label>

				<input
					:disabled="submitStatus === 'submitting'"
					:id="`rsvpNo${index}`"
					:name="`attending${index}`"
					required
					type="radio"
					value="No"
					:checked="guest.attending === 'No'"
					@change="updateGuest"
				/>

				<label :for="`rsvpNo${index}`">
					&#x2718;
				</label>
			</div>
		</div>

		<button type="button" class="rsvp-guest__add" @click="addGuest">&plus; add new guest</button>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'RsvpGuest',
	computed: {
		...mapState({
			guests: ({ formValues }) => formValues.guests,
			submitStatus: (state) => state.submitStatus,
		}),
	},
	methods: {
		// @TODO allow adding new guests (also maybe removing?)
		updateGuest(e) {
			const { value, type, id } = e.target;
			const index = +id.slice(-1);

			if (type === 'radio') {
				this.$store.commit('updateGuestAttending', { index, attending: value });
			} else {
				this.$store.commit('updateGuestName', { index, name: value });
			}
		},
		addGuest() {
			this.$store.commit('addGuest');
		}
	},
};
</script>

<style scoped lang="scss">
.rsvp-guest {
	--width-guests: 70%;
	--width-attending: 30%;

	@media screen and (max-width: 600px) {
		--width-guests: 60%;
		--width-attending: 40%;
	}

	&__header {
		font-family: var(--font-header);
		font-size: var(--font-size-subheader);
		font-style: italic;
		font-weight: 900;
		margin-bottom: 0.5rem;
		text-transform: uppercase;

		@media screen and (max-width: 600px) {
			padding-left: 0.5rem;
		}

		label {
			display: inline-block;

			&:first-of-type {
				width: var(--width-guests);
			}

			&:last-of-type {
				width: var(--width-attending);
			}
		}
	}

	&__row {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	&__name {
		background: transparent;
		border: none;
		border-left: 1px dashed var(--color-form-inverse);
		border-bottom: 1px dashed var(--color-form-inverse);
		color: var(--color-form-inverse);
		flex: 1;
		font-size: var(--font-size-content-small);
		height: 100%;
		outline: none;
		padding: 0.5rem;

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

	&__attending {
		display: flex;
		width: var(--width-attending);

		label {
			align-items: center;
			border-bottom: 1px dashed var(--color-form-inverse);
			display: flex;
			height: 100%;
			justify-content: center;
			padding: 0 1rem;
			text-align: center;
			user-select: none;
			width: 50%;

			&:first-of-type {
				border-left: 1px dashed var(--color-form-inverse);
				border-right: 1px dashed var(--color-form-inverse);
			}

			@media screen and (max-width: 600px) {
				font-size: 1rem;
			}
		}

		input {
			opacity: 0;
			position: absolute;
			width: 0;

			&:focus + label {
				outline: 2px solid var(--color-form-inverse);
				outline-offset: -1px;
			}

			&:checked + label {
				background: var(--color-form-inverse);
				color: var(--color-form-main);
			}
		}
	}

	&__add {
		background: transparent;
		border: none;
		color: var(--color-form-inverse);
		cursor: pointer;
		outline: none;
		padding: 0 0 1rem;
		text-align: left;
		width: 100%;
	}
}
</style>
