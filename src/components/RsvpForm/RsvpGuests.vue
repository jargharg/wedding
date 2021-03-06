<template>
	<div class="rsvp-guest">
		<div class="rsvp-guest__header">
			<label for="name0">Name{{ guests.length > 1 ? 's' : '' }}</label>

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
					@click="$emit('confirmed', $event)"
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

		<button
			v-if="!formValuesRetrieved"
			type="button"
			class="rsvp-guest__add"
			@click="addGuest"
		>
			&plus; add another name
		</button>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'RsvpGuest',
	computed: {
		...mapState({
			formValuesRetrieved: ({ formValues }) => formValues.retrieved,
			guests: ({ formValues }) => formValues.guests,
			submitStatus: (state) => state.submitStatus,
		}),
	},
	methods: {
		updateGuest(event) {
			let { value, type, id } = event.target;
			let index = +id.slice(-1);

			if (type === 'radio') {
				this.$store.commit('updateGuestAttending', { index, attending: value });
			} else {
				this.$store.commit('updateGuestName', { index, name: value });
			}
		},
		addGuest() {
			this.$store.commit('addGuest');
		},
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
		border-left: 1px dashed var(--color-form-secondary);
		border-bottom: 1px dashed var(--color-form-secondary);
		color: var(--color-form-secondary);
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
			outline: 2px solid var(--color-form-secondary);
			outline-offset: -1px;
		}

		&::placeholder {
			color: var(--color-form-secondary);
			opacity: 0.5;
		}
	}

	&__attending {
		display: flex;
		width: var(--width-attending);

		label {
			align-items: center;
			border-bottom: 1px dashed var(--color-form-secondary);
			display: flex;
			height: 100%;
			justify-content: center;
			padding: 0 1rem;
			text-align: center;
			user-select: none;
			width: 50%;
			transition: 0.2s all;

			&:first-of-type {
				border-left: 1px dashed var(--color-form-secondary);
				border-right: 1px dashed var(--color-form-secondary);
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
				outline: 2px solid var(--color-form-secondary);
				outline-offset: -1px;
			}

			&:checked + label {
				background: var(--color-form-secondary);
				color: var(--color-form-primary);
			}
		}
	}

	&__add {
		background: transparent;
		border: none;
		color: var(--color-form-secondary);
		cursor: pointer;
		font-size: var(--font-size-content-smallest);
		opacity: 0.7;
		outline: none;
		padding: 0 0 1rem;
		text-align: left;
		transition: 0.2s;
		width: 100%;

		@media screen and (max-width: 600px) {
			padding: 0 0.5rem 1rem;
		}

		&:hover {
			opacity: 1;
		}

		&:focus {
			outline: 2px solid var(--color-form-secondary);
		}
	}
}
</style>
