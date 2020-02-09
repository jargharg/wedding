<template>
	<div class="error" v-if="display">
		Oops... Looks like there was an error sending your RSVP. Try again?
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'RsvpError',
	computed: mapState({
		display: (state) => state.submitStatus === 'failed',
	}),
};
</script>

<style lang="scss">
.error {
	background: red;
	color: white;
	font-size: var(--font-size-content-smallest);
	left: 0;
	padding: 1rem;
	position: absolute;
	top: 101%;
	width: 100%;
}
</style>
