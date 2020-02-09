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
		submitStatus: null,
		submitPromises: [],
	},
	mutations: {
		setFormValuesFromParams(state, params) {
			const parsedParams = JSON.parse(atob(params));
			const mappedGuests = parsedParams.guests
				.split(', ')
				.map((name) => ({ name: name, attending: null }));

			Vue.set(state.formValues, 'emailAddress', parsedParams.emailAddress);
			Vue.set(state.formValues, 'guestType', parsedParams.guestType);
			Vue.set(state.formValues, 'guests', mappedGuests);
		},
		updateFormValues(state, formValues) {
			Vue.set(state, 'formValues', formValues);
		},
		updateGuestName(state, { index, name }) {
			Vue.set(state.formValues.guests, index, {
				...state.formValues.guests[index],
				name,
			});
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
		updateSubmitStatus(state, submitStatus) {
			Vue.set(state, 'submitStatus', submitStatus);
		},
		updateSubmitPromises(state, promises) {
			Vue.set(state, 'submitPromises', promises);
		},
	},
	actions: {
		async submitRsvp({ commit, state }) {
			commit('updateSubmitStatus', 'submitting');

			const { emailAddress, additionalDetails, guestType } = state.formValues;

			const promises = state.formValues.guests.map((guest) =>
				fetch('https://hannah.jarod.wedding/api/postToGoogleForm', {
					method: 'POST',
					headers: new Headers({ 'Content-Type': 'application/json' }),
					body: JSON.stringify({
						guest,
						emailAddress,
						additionalDetails,
						guestType,
					}),
				}),
			);

			commit('updateSubmitPromises', promises);

			const results = await Promise.all(promises.map((p) => p.catch((e) => e)));
			const invalidResults = results.filter((result) => result instanceof Error);

			if (invalidResults.length === 0) {
				commit('updateSubmitStatus', 'successful');
				// @TODO store in local storage / cookies that form has been submitted
			} else {
				console.log(invalidResults);
				commit('updateSubmitStatus', 'failed');
			}
		},
	},
});
