<template>
	<section class="info">
		<div class="slide info__content">
			<h2>
				All the details...
			</h2>

			<ul class="info-grid">
				<li>
					<h3>Location</h3>
					HOME, Manchester <br />
					Address
				</li>
				<li>
					<h3>Timings</h3>
					Ceremony 4pm <br />
					Reception etc til 1am
				</li>
				<li>
					<h3>Accomodation</h3>
				</li>
				<li>
					<h3>Transport</h3>
				</li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Info',
};
</script>

<style scoped lang="scss">
.info {
	background: white;
	min-height: 100vh;
	position: relative;

	&__content {
		position: sticky;
		top: 0;
		min-height: var(--slide-height);
		padding: 1em;

		h2 {
			position: sticky;
			top: var(--margin-size);
			background: white;
		}
	}
}

.info-grid {
	background: var(--splash-bg-color);
	display: grid;
	grid-gap: 1px;
	grid-template-columns: 25% 25% 25% 25%;
	list-style: none;
	padding: 0;

	@media screen and (max-width: 600px) {
	grid-template-columns: 100%;
	}

	li {
		background: white;
		padding: 1em;
		min-height: 200px;
	}
}
</style>
