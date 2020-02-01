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

		<div class="rsvp-guest__row" v-for="(guest, index) in guests" v-bind:key="index">
			<input
				class="rsvp-guest__name"
				name="entry.1042661726"
				required
				type="text"
				v-bind:aria-label="`Guest Name ${index + 1}`"
				v-bind:id="`name${index}`"
				v-bind:placeholder="`Guest Name ${index + 1}`"
				v-model="guest.name"
			/>

			<div class="rsvp-guest__attending">
				<input
					required
					type="radio"
					v-bind:id="`rsvpYes${index}`"
					v-bind:name="`attending${index}`"
					v-model="guest.attending"
					value="Yes"
				/>

				<label v-bind:for="`rsvpYes${index}`">
					&#x2714;
				</label>

				<input
					required
					type="radio"
					v-bind:id="`rsvpNo${index}`"
					v-bind:name="`attending${index}`"
					v-model="guest.attending"
					value="No"
				/>

				<label v-bind:for="`rsvpNo${index}`">
					&#x2718;
				</label>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'RsvpGuest',
	props: {
		guests: Array,
		label: String,
	},
};
</script>

<style scoped lang="scss">
.rsvp-guest {
	--width-guests: 70%;
	--width-attending: 30%;

	&__header {
		font-family: var(--font-header);
		font-size: var(--font-size-subheader);
		font-style: italic;
		font-weight: 900;
		margin-bottom: 0.5rem;
		text-transform: uppercase;

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
		border-bottom: 1px dashed var(--color-form-inverse);
		color: var(--color-form-inverse);
		flex: 1;
		font-size: var(--font-size-content-small);
		outline: none;
		padding: var(--padding-content);

		&:focus {
			outline: 2px solid var(--color-inverse);
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
				outline: 2px solid var(--color-inverse);
				outline-offset: -1px;
			}

			&:checked + label {
				background: var(--color-form-inverse);
				color: var(--color-form-main-text);
			}
		}
	}
}
</style>
