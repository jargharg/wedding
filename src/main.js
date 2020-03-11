import Vue from 'vue';
import App from './App.vue';
import store from './store';
import { initializeApp, analytics, functions } from 'firebase/app';
import 'firebase/analytics';

initializeApp({
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
	authDomain: 'wedding-3b592.firebaseapp.com',
	databaseURL: 'https://wedding-3b592.firebaseio.com',
	projectId: 'wedding-3b592',
	storageBucket: 'wedding-3b592.appspot.com',
	messagingSenderId: '748430835911',
	appId: '1:748430835911:web:3c4f1e15ad3d0482abfee2',
	measurementId: 'G-LKYFGPQKRV',
});

analytics();

if (document.URL.indexOf('localhost') !== -1) {
	functions().useFunctionsEmulator('http://localhost:5000');
}

Vue.config.productionTip = false;

new Vue({
	store,
	render: h => h(App),
}).$mount('#app');
