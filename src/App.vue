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
import RsvpButton from './components/RsvpButton.vue';
import RsvpForm from './components/RsvpForm.vue';

export default {
	name: 'app',
	components: {
		Splash,
		Intro,
		Info,
		RsvpButton,
		RsvpForm
	},
};
</script>

<style lang="scss">
@import url('https://use.typekit.net/hna6vse.css');

:root {
	--body-text: neue-haas-grotesk-text, serif;
	--header-text: neue-haas-grotesk-display, sans-serif;
	--margin-size: 0;
	--pop-color: rgb(255, 223, 84);
	--rsvp-position: 1rem;
	--rsvp-size: 15vh;
	--slide-height: 100vh;
	--slide-width: 100vw;
	--splash-bg-color: rgb(0, 57, 63);
	--splash-bg-inverse-color: rgb(255, 198, 192);
}

* {
	box-sizing: border-box;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

html {
	scroll-snap-type: y proximity;
	// scroll-behavior: smooth;
}

body {
	font-family: var(--body-text);
	margin: 0;
	padding: 0;
}

section {
	// scroll-snap-align: proximity;
	width: 100%;
}

h1,
h2,
h3 {
	font-family: var(--header-text);
	font-style: italic;
	font-weight: 900;
	margin: 0;
	text-transform: uppercase;
}

#app {
	background: var(--splash-bg-color);
}

.slide {
	margin: var(--margin-size) auto 0;
	height: var(--slide-height);
	width: var(--slide-width);
	position: sticky;
	top: var(--margin-size);
}
</style>
