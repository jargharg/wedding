<template>
	<div id="app">
		<div class="slide-container">
			<Splash />
			<Intro />
			<Info />
		</div>

		<div class="top-spacer"></div>
		<RsvpButton />
	</div>
</template>

<script>
import Splash from './components/Splash.vue';
import Intro from './components/Intro.vue';
import Info from './components/Info.vue';
import RsvpButton from './components/RsvpButton.vue';

export default {
	name: 'app',
	components: {
		Splash,
		Intro,
		Info,
		RsvpButton,
	},
};
</script>

<style lang="scss">
@import url('https://use.typekit.net/hna6vse.css');

:root {
	--header-text: neue-haas-grotesk-display, sans-serif;
	--body-text: neue-haas-grotesk-text, sans-serif;
	--bg-color: white;
	--splash-bg-color: rgba(0, 57, 63, 1);
	--splash-bg-alt-color: rgba(255, 255, 255, 0.2);
	// --splash-bg-color: white;
	// --splash-bg-alt-color: rgba(0, 57, 63, 1);
	--pop-color: rgba(255, 223, 84, 1);
	--margin-size: 5vh;
	--slide-height: calc(100vh - var(--margin-size) * 2);
	--slide-width: calc(100vw - var(--margin-size) * 2);
	--rsvp-position: 1vh; // calc(var(--margin-size) * 1.2);
	--rsvp-size: 10vh;

	@media screen and (max-width: 600px) {
		--margin-size: 2vh;
		--rsvp-position: calc(var(--margin-size) * 1.5);
		// --rsvp-size: 70px;
	}
}

* {
	box-sizing: border-box;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

html {
	scroll-snap-type: y proximity;
}

body {
	background: white;
	font-family: var(--body-text);
	margin: 0;
	padding: 0;
}

section {
	scroll-snap-align: proximity;
	width: 100%;
}

h1,
h2,
h3 {
	margin: 0;
	text-transform: uppercase;
	font-family: var(--header-text);
}

.top-spacer {
	height: var(--margin-size);
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: var(--bg-color);
}

.slide-container {
	background: var(--bg-color);
}

.slide {
	margin: var(--margin-size) auto 0;
	height: var(--slide-height);
	width: var(--slide-width);
	position: sticky;
	top: var(--margin-size);
}
</style>
