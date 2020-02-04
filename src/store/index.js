import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		formValues: {
			guests: [],
			emailAddress: '',
			guestType: '',
			additionalDetails: '',
		},
	},
	mutations: {
		setFormValuesFromParams(state, params) {
			const parsedParams = JSON.parse(atob(params));
			const mappedGuests = parsedParams.guests
				.split(', ')
				.map(name => ({ name: name, attending: null }));

			Vue.set(state.formValues, 'emailAddress', parsedParams.emailAddress);
			Vue.set(state.formValues, 'guestType', parsedParams.guestType);
			Vue.set(state.formValues, 'guests', mappedGuests);
		},
		updateFormValues(state, formValues) {
			Vue.set(state, 'formValues', formValues);
		},
		updateGuestName(state, { index, name }) {
			Vue.set(state.formValues.guests, index, { ...state.formValues.guests[index], name });
		},
		updateGuestAttending(state, { index, attending }) {
			Vue.set(state.formValues.guests, index, {
				...state.formValues.guests[index],
				attending,
			});
		},
		updateGuests(state, guests) {
			Vue.set(state.formValues, 'guests', guests);
		},
		updateEmailAddress(state, emailAddress) {
			Vue.set(state.formValues, 'emailAddress', emailAddress);
		},
		updateGuestType(state, guestType) {
			Vue.set(state.formValues, 'guestType', guestType);
		},
		updateAdditionalDetails(state, additionalDetails) {
			Vue.set(state.formValues, 'additionalDetails', additionalDetails);
		},
	},
	actions: {},
	getters: {
		formUrlEncoded: state => {
			console.log(state);

			const form = {
				baseUrl:
					'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeAPLkA1YAVkFCAgIt7YlM1SUVIcYTZhhTKIXif9d9nciEd6Q/formResponse',
				fieldNames: {
					names: 'entry.1042661726',
					rsvps: 'entry.187353647',
					emailAddress: 'entry.1024004482',
					additionalDetails: 'entry.511653375',
					guestType: 'entry.442594185',
				},
			};
			console.log(state);

			const { guests, emailAddress, additionalDetails, guestType } = state.formValues;

			const fields = {
				[form.fieldNames.names]: guests.map(guest => guest.name).join(', '),
				[form.fieldNames.rsvps]: guests.map(guest => guest.attending).join(', '),
				[form.fieldNames.emailAddress]: emailAddress,
				[form.fieldNames.additionalDetails]: additionalDetails,
				[form.fieldNames.guestType]: guestType,
			};

			return fields;
		},
	},
});
