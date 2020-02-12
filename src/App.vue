<template>
	<div id="app">
		<div class="in-progress" ref="inProgressNotice" @click="hideInProgressNotice">
			pls note:<br />not production<br />pre-pre-alpha<br />v0.0.0.1
		</div>

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

		const params =
			// 'eyJndWVzdHMiOiAiSmFyb2QgSGFyZ3JlYXZlcywgSGFubmFoIExlbmRydW0iLCAiZW1h' +
			// 'aWxBZGRyZXNzIjogImphcm9kQGhhbm5haC5jb20iLCAiZ3Vlc3RUeXBlIjogImRheSJ9';
			btoa(
				'{"guests": "Test Testerson, French Man", "emailAddress": "jimbob@gondola.com", "guestType": "day"}',
			);
		this.$store.dispatch('setFormValuesFromParams', params);

		if (localStorage.submitted) {
			this.$store.commit('updateSubmitStatus', 'successful');
		}
	},
	methods: {
		hideInProgressNotice() {
			this.$refs.inProgressNotice.style.display = 'none';
		},
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

.in-progress {
	background: red;
	color: white;
	cursor: pointer;
	font-size: 0.7rem;
	left: 0;
	letter-spacing: 0.1em;
	padding: 0.5em;
	position: fixed;
	text-transform: uppercase;
	top: 0;
	z-index: 999;
}
</style>
