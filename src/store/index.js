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
			retrieved: false,
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
		updatedFormValuesRetrieved(state, retrieved) {
			Vue.set(state.formValues, 'retrieved', retrieved);
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
			let guests = await firestore()
				.collection('guests')
				.doc(dbRef)
				.get()
				.then((doc) => doc.data())
				.catch((error) => {
					throw Error(error);
				});

			if (!guests) {
				commit('addGuest');
				return;
			}

			let mappedGuests = guests.guests
				.split(', ')
				.map((name) => ({ name: name, attending: null }));

			commit('updateEmailAddress', guests.emailAddress);
			commit('updateGuestType', guests.guestType);
			commit('updateGuests', mappedGuests);
			commit('updatedFormValuesRetrieved', true);
		},
		async submitRsvp({ commit, state }) {
			commit('updateSubmitStatus', 'submitting');

			let { emailAddress, additionalDetails, guestType } = state.formValues;

			let promises = state.formValues.guests.map((guest) => {
				return functions()
					.httpsCallable('postToGoogleForm')({
						guest,
						emailAddress,
						additionalDetails,
						guestType,
					})
					.catch((error) => {
						throw Error(error);
					});
			});

			commit('updateSubmitPromises', promises);

			let results = await Promise.all(promises.map((p) => p.catch((e) => e)));
			let invalidResults = results.filter((result) => result instanceof Error);

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
			commit('updatedFormValuesRetrieved', false);
			localStorage.removeItem('submitted');
		},
	},
});
