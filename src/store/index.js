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
		setFormValuesFromParamString(state, paramString) {
			const parsedParamString = JSON.parse(paramString);

			state.formValues.guests = parsedParamString.guests.split(', ').map(name => ({ name: name }));
			state.formValues.emailAddress = parsedParamString.emailAddress;
			state.formValues.guestType = parsedParamString.guestType;
		},
		updateFormValues(state, formValues) {
			state.formValues = formValues;
		},
		updateGuests(state, guests) {
			state.formValues.guests = guests;
		},
		updateEmailAddress(state, emailAddress) {
			state.formValues.emailAddress = emailAddress;
		},
		updateGuestType(state, guestType) {
			state.formValues.guestType = guestType;
		},
		updateAdditionalDetails(state, additionalDetails) {
			state.formValues.additionalDetails = additionalDetails;
		},
	},
	actions: {},
	getters: {},
});
