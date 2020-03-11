import Vue from 'vue';
import Vuex from 'vuex';
import { firestore, functions } from 'firebase';

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
		async setFormValuesFromDB({ commit }, dbRef) {
			const guests = await firestore()
				.collection('guests')
				.doc(dbRef)
				.get()
				.then(doc => doc.data())
				.catch(error => {
					throw Error(error);
				});

			if (!guests) {
				commit('addGuest');
				return;
			}

			const mappedGuests = guests.guests
				.split(', ')
				.map(name => ({ name: name, attending: null }));

			commit('updateEmailAddress', guests.emailAddress);
			commit('updateGuestType', guests.guestType);
			commit('updateGuests', mappedGuests);
		},
		async submitRsvp({ commit, state }) {
			commit('updateSubmitStatus', 'submitting');

			const { emailAddress, additionalDetails, guestType } = state.formValues;

			const promises = state.formValues.guests.map(guest => {
				return functions()
					.httpsCallable('postToGoogleForm')({
						guest,
						emailAddress,
						additionalDetails,
						guestType,
					})
					.catch(error => {
						throw Error(error);
					});
			});

			commit('updateSubmitPromises', promises);

			const results = await Promise.all(promises.map(p => p.catch(e => e)));
			const invalidResults = results.filter(result => result instanceof Error);

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
