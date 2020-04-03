<template>
	<section ref="info" class="info">
		<h2 class="info__title">
			All the details
		</h2>

		<ul class="info__grid">
			<li class="info__cell">
				<h3 class="info__cell__title">Location</h3>
				<div class="info__cell__content">
					<div>
						<a href="https://homemcr.org">HOME</a> <br />
						2 Tony Wilson Place, <br />
						First Street, <br />
						Manchester
					</div>

					<div>
						<a href="https://goo.gl/maps/d88LG3KAt4vfNoRJ6">
							See it on a map
						</a>
					</div>
				</div>
			</li>

			<li class="info__cell">
				<h3 class="info__cell__title">Timings</h3>
				<div class="info__cell__content">
					<div>
						Guests arrive: 3.30pm
					</div>
					<div>
						Ceremony: 4pm
					</div>
					<div>
						Carriages: 1am
					</div>
				</div>
			</li>

			<li class="info__cell">
				<h3 class="info__cell__title">Food</h3>
				<div class="info__cell__content">
					<div>
						All food will be vegetarian or vegan.
					</div>
					<div>
						Please let us know any other dietary requirements.
					</div>
				</div>
			</li>

			<li class="info__cell">
				<h3 class="info__cell__title">Accommodation</h3>
				<div class="info__cell__content">
					<div>
						There are plenty of
						<a
							href="https://www.google.co.uk/maps/search/hotel/@53.4744777,-2.2464111,16z/data=!3m1!4b1!4m5!2m4!5m2!5m1!1s2020-09-12!6e3"
							>nearby hotels</a
						>
						in central Manchester.
					</div>
					<div>
						We recommend booking early - please ask if you need recommendations!
					</div>
				</div>
			</li>

			<li class="info__cell">
				<h3 class="info__cell__title">Transport</h3>
				<div class="info__cell__content">
					<div>
						Walk from Deansgate and Oxford Road stations, or taxi from Piccadilly and Victoria.
					</div>
					<div>
						You can also book 24/7 parking at
						<a href="https://goo.gl/maps/wf9BUMMjgDFnP27h8" target="_blank"
							>First Street car park</a
						>.
					</div>
				</div>
			</li>

			<li class="info__cell">
				<h3 class="info__cell__title">Contact Details</h3>
				<div class="info__cell__content">
					<div>
						Hannah <br />
						07908 486631 <br />
						<a href="mailto:hannahvlendrum@gmail.com">hannahvlendrum@gmail.com</a>
					</div>
					<div>
						Jarod <br />
						07980 977763 <br />
						<a href="mailto:jarod.hargreaves@gmail.com">jarod.hargreaves@gmail.com</a>
					</div>
				</div>
			</li>
		</ul>

		<p class="info__heart">
			<img src="/gradient-heart-pink.png" alt="Heart" />
		</p>
	</section>
</template>

<script>
import ScrollListener from '@/services/ScrollListener';
import gsap from 'gsap';

export default {
	name: 'Info',
	mounted() {
		this.setBackgroundAnimation();

		const { offsetTop } = this.$el;
		ScrollListener.addAction({
			type: 'progress',
			startY: offsetTop - window.innerHeight * 0.6,
			endY: offsetTop,
			actionToProgress: progress => {
				this.backgroundAnimation.progress(progress);
			},
		});
	},
	methods: {
		setBackgroundAnimation() {
			const bgColor = getComputedStyle(document.body).getPropertyValue('--color-main');

			gsap.set(this.$refs.info, { opacity: 0 });

			this.backgroundAnimation = gsap.timeline();
			this.backgroundAnimation
				.to('#app', {
					backgroundColor: bgColor,
					ease: 'power4.out',
					duration: 1,
				})
				.to(this.$refs.info, {
					opacity: 1,
					delay: -1,
				})
				.pause();
		},
	},
};
</script>

<style scoped lang="scss">
.info {
	color: var(--color-inverse);
	padding: var(--padding-section);
	position: relative;
	max-width: 1000px;
	margin: 0 auto;

	&__title {
		font-size: var(--font-size-header);
	}

	&__grid {
		display: grid;
		grid-gap: 2em;
		grid-template-columns: 1fr 1fr 1fr;
		list-style: none;
		margin-top: 2rem;
		padding: 0;
		width: 100%;

		@media screen and (max-width: 800px) {
			grid-template-columns: 1fr 1fr;
		}

		@media screen and (max-width: 600px) {
			grid-template-columns: 100%;
		}
	}

	&__cell {
		font-size: var(--font-size-content-small);
		padding-bottom: 1.5rem;
		min-height: 200px;
		border-bottom: 1px solid var(--color-inverse);

		&__title {
			font-size: var(--font-size-subheader);
			padding-bottom: 0.3em;
		}

		&__content {
			div {
				padding: 0.3rem 0;
			}
		}
	}

	&__heart {
		text-align: center;
		padding: 7vh 0;

		img {
			max-width: 100px;
		}
	}

	a {
		color: inherit;
	}
}
</style>
