<template>
	<div id="app">
		<RsvpButton />
		<div class="slide-container">
			<Splash />
			<Intro />
			<Info />
			<RsvpForm />
		</div>
	</div>
</template>

<script>
import Splash from './components/Splash.vue';
import Intro from './components/Intro.vue';
import Info from './components/Info.vue';
import RsvpForm from './components/RsvpForm.vue';
import RsvpButton from './components/RsvpButton.vue';

export default {
	name: 'app',
	components: {
		Splash,
		Intro,
		Info,
		RsvpForm,
		RsvpButton,
	},
	mounted() {
		this.innerWidth = window.innerWidth;

		window.onresize = () => {
			if (window.innerWidth !== this.innerWidth) {
				this.innerWidth === window.innerWidth;
				location.reload();
			}
		};

		if (location.pathname.length > 1) {
			this.$store.dispatch('setFormValuesFromDB', location.pathname.slice(1).toLowerCase());
		} else {
			this.$store.dispatch('resetForm');
		}

		if (localStorage.submitted) {
			this.$store.commit('updateSubmitStatus', 'successful');
		}
	},
};
</script>

<style lang="scss">
@import url('https://use.typekit.net/hna6vse.css');

:root {
	--color-inverse: rgb(255, 198, 192);
	--color-main: rgb(0, 57, 63);
	--font-body: neue-haas-grotesk-text, sans-serif;
	--font-header: neue-haas-grotesk-display, sans-serif;
	--font-size-content: 1.5rem;
	--font-size-content-small: 1.2rem;
	--font-size-content-smallest: 0.9rem;
	--font-size-header: 4rem;
	--font-size-subheader: 1.5rem;
	--padding-content: 0.5rem;
	--padding-section: 1rem;
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

body {
	background: var(--color-main);
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
	background: var(--color-main);
}
</style>
