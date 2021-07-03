<template>
	<div id="app">
		<Splash />
		<Intro />
		<RsvpButton href="#rsvp" font-size="14px">
			R • S • V • P • R • S • V • P •
		</RsvpButton>
		<Info />
		<RsvpForm />
	</div>
</template>

<script>
import Splash from './components/Splash.vue';
import Intro from './components/Intro.vue';
import Info from './components/Info.vue';
import RsvpForm from './components/RsvpForm.vue';
import RsvpButton from './components/RsvpButton.vue';

export const GUEST_TYPES = ['evening', 'day'];

export default {
	name: 'app',
	components: {
		Splash,
		Intro,
		Info,
		RsvpForm,
		RsvpButton,
	},
	beforeMount() {
		if (location.pathname.length > 1) {
			this.$store.dispatch(
				'setFormValuesFromDB',
				location.pathname.slice(1).toLowerCase(),
			);
		} else {
			this.$store.dispatch('resetForm');
		}

		let subdomain = location.host.split('.')[0];
		if (GUEST_TYPES.includes(subdomain)) {
			this.$store.commit('setGuestType', subdomain);
		}
	},
	mounted() {
		if (localStorage.submitted) {
			this.$store.commit('updateSubmitStatus', 'successful');
		}
	},
};
</script>

<style lang="scss">
@import url('https://use.typekit.net/hna6vse.css');

:root {
	--color-primary: #6187c5;
	--color-secondary: #ffeff6;
	--font-body: neue-haas-grotesk-text, sans-serif;
	--font-header: neue-haas-grotesk-display, sans-serif;
	--font-size-content: 1.5rem;
	--font-size-content-small: 1.2rem;
	--font-size-content-smallest: 0.9rem;
	--font-size-header: 4rem;
	--font-size-subheader: 1.5rem;
	--line-height-body: 1.4;
	--padding-content: 0.5rem;
	--padding-section: 1.5rem 1rem;
	--rsvp-position: 1rem;
	--rsvp-size: 15vh;

	@media screen and (max-width: 600px) {
		--font-size-content: 1.2rem;
		--font-size-content-smallest: 0.8rem;
		--font-size-header: 2rem;
		--font-size-subheader: 1.2rem;
		--padding-content: 0.5rem 0;
	}
}

* {
	box-sizing: border-box;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

html {
	scroll-behavior: smooth;
}

body {
	background: var(--color-primary);
	font-family: var(--font-body);
	margin: 0;
	overflow-x: hidden;
	padding: 0;
}

section {
	width: 100%;
}

h1,
h2,
h3,
button,
input[type='button'],
input[type='submit'] {
	font-family: var(--font-header);
	font-style: italic;
	font-weight: 900;
	margin: 0;
	text-transform: uppercase;
}

::selection {
	background: white;
	color: black;
}

#app {
	background: var(--color-primary);

	> .rsvp-button {
		bottom: var(--rsvp-position);
		fill: var(--color-primary);
		position: fixed;
		right: var(--rsvp-position);
		stroke: var(--color-secondary);
	}
}
</style>
