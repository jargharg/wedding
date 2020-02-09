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
		addGuest(state) {
			Vue.set(state.formValues, 'guests', [
				...state.formValues.guests,
				{ name: null, attending: null },
			]);
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
		setFormValuesFromParams({ commit }, params) {
			const parsedParams = JSON.parse(atob(params));
			const mappedGuests = parsedParams.guests
				.split(', ')
				.map((name) => ({ name: name, attending: null }));

			commit('updateEmailAddress', parsedParams.emailAddress);
			commit('updateGuestType', parsedParams.guestType);
			commit('updateGuests', mappedGuests);
		},
		async submitRsvp({ commit, state }) {
			commit('updateSubmitStatus', 'submitting');

			const { emailAddress, additionalDetails, guestType } = state.formValues;

			const promises = state.formValues.guests.map(async (guest) => {
				const response = await fetch(
					'https://hannah.jarod.wedding/api/postToGoogleForm',
					{
						method: 'POST',
						headers: new Headers({ 'Content-Type': 'application/json' }),
						body: JSON.stringify({
							guest,
							emailAddress,
							additionalDetails,
							guestType,
						}),
					},
				);

				if (!response.ok) {
					throw Error(response.error);
				}
				return response;
			});

			commit('updateSubmitPromises', promises);

			const results = await Promise.all(promises.map((p) => p.catch((e) => e)));
			const invalidResults = results.filter((result) => result instanceof Error);

			if (invalidResults.length === 0) {
				commit('updateSubmitStatus', 'successful');
				localStorage.setItem('submitted', true);
			} else {
				commit('updateSubmitStatus', 'failed');
			}
		},
		resetForm({ commit }) {
			commit('updateSubmitStatus', null);
			commit('updateGuests', []);
			commit('addGuest', []);
			commit('updateEmailAddress', '');
			commit('updateAdditionalDetails', '');
		},
	},
});
