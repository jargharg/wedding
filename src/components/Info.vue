<template>
	<SlideWrapper class="info__wrapper">
		<section class="info">
			<h2 class="info__title">
				All the details
			</h2>

			<ul class="info__grid">
				<li class="info__cell">
					<h3 class="info__cell__title">Location</h3>
					<p>
						<a href="https://homemcr.org">HOME</a>,<br />
						Cinema Bar & Roof Terrace,<br />
						2 Tony Wilson Place, <br />
						First Street, <br />
						Manchester
					</p>

					<p>
						<a href="https://goo.gl/maps/d88LG3KAt4vfNoRJ6">
							See it on a map
						</a>
					</p>
				</li>

				<li class="info__cell">
					<h3 class="info__cell__title">Timings</h3>
					<template v-if="isDayGuest">
						<p>
							Guests arrive: 3.30pm
						</p>
						<p>
							Ceremony: 4pm
						</p>
					</template>

					<template v-else>
						Arrive from: 8pm
					</template>

					<p>
						Carriages: 1am
					</p>
				</li>

				<li class="info__cell">
					<h3 class="info__cell__title">Food</h3>
					<p>
						All food will be vegetarian with vegan options.
					</p>
					<p>
						Please let us know if you have any other dietary requirements.
					</p>
				</li>

				<li class="info__cell">
					<h3 class="info__cell__title">Accommodation</h3>
					<p>
						There are plenty of
						<a
							href="https://www.google.co.uk/maps/search/hotel/@53.4744777,-2.2464111,16z/data=!3m1!4b1!4m5!2m4!5m2!5m1!1s2020-09-12!6e3"
						>
							nearby hotels
						</a>
						in central Manchester—please ask us if you need recommendations.
					</p>
					<p>
						We recommend looking for flexible cancellation policies, just in
						case!
					</p>
				</li>

				<li class="info__cell">
					<h3 class="info__cell__title">Transport</h3>

					<p>
						5-minute walk from Deansgate and Oxford Road stations, or quick
						taxi from Piccadilly and Victoria.
					</p>
					<p>
						You can also book 24/7 parking at
						<a
							href="https://www.q-park.co.uk/en-gb/cities/manchester/first-street/"
							target="_blank"
							>First Street car park</a
						>
						nearby.
					</p>
				</li>

				<li class="info__cell">
					<h3 class="info__cell__title">Contact Details</h3>

					<p>
						Hannah <br />
						07908 486631 <br />
						<a href="mailto:hannahvlendrum@gmail.com"
							>hannahvlendrum@gmail.com</a
						>
					</p>
					<p>
						Jarod <br />
						07980 977763 <br />
						<a href="mailto:jarod.hargreaves@gmail.com"
							>jarod.hargreaves@gmail.com</a
						>
					</p>
				</li>
			</ul>

			<div class="info__heart">
				<HeartSplit />
			</div>
		</section>
	</SlideWrapper>
</template>

<script>
import { mapGetters } from 'vuex';
import HeartSplit from './HeartSplit';
import SlideWrapper from './SlideWrapper';

export default {
	components: {
		HeartSplit,
		SlideWrapper,
	},
	computed: mapGetters(['isDayGuest']),
};
</script>

<style scoped lang="scss">
.info {
	&__wrapper {
		background: var(--color-primary);
		color: var(--color-secondary);
	}

	&__title {
		font-size: var(--font-size-header);
	}

	&__grid {
		display: grid;
		grid-gap: 2em;
		grid-template-columns: 100%;
		list-style: none;
		margin-top: 2rem;
		padding: 0;
		width: 100%;

		@media screen and (min-width: 600px) {
			grid-template-columns: 1fr 1fr;
		}

		@media screen and (min-width: 800px) {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	&__cell {
		border-bottom: 1px solid var(--color-secondary);
		font-size: var(--font-size-content-small);
		min-height: 200px;
		padding-bottom: 1.5rem;

		&__title {
			font-size: var(--font-size-subheader);
			padding-bottom: 0.3em;
		}

		p {
			margin: 0;
			padding: 0.3rem 0;
		}
	}

	&__heart {
		padding: 4vh 0;
		text-align: center;

		img {
			max-width: 100px;
		}
	}

	a {
		color: inherit;
	}
}
</style>
