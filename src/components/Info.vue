<template>
	<section ref="info" class="info">
		<h2 class="info__title">
			All the details
		</h2>

		<ul class="info__grid">
			<li class="info__cell">
				<h3 class="info__cell__title">Location</h3>
				<div class="info__cell__content">
					HOME, <br />
					<a href="https://goo.gl/maps/d88LG3KAt4vfNoRJ6" target="_blank">
						2 Tony Wilson Place, <br />
						Manchester
					</a>
					<br />
					(not our home)
				</div>
			</li>

			<li class="info__cell">
				<h3 class="info__cell__title">Timings</h3>
				<div class="info__cell__content">
					Guests arrive at 3:30<br />
					Ceremony 4pm <br />
					Food, drinks, music, funtimes until 1am
				</div>
			</li>

			<li class="info__cell">
				<h3 class="info__cell__title">Accomodation</h3>
				<div class="info__cell__content">
					We're staying at
					<a href="https://www.themidlandhotel.co.uk/">The Midland</a> which is
					dead fancy, but there's
					<a
						href="https://www.google.co.uk/maps/search/hotel/@53.4744777,-2.2464111,16z/data=!3m1!4b1!4m5!2m4!5m2!5m1!1s2020-09-12!6e3"
						>plenty of choice</a
					>
					in central Manchester.
				</div>
			</li>

			<li class="info__cell">
				<h3 class="info__cell__title">Transport</h3>
				<div class="info__cell__content">
					HOME is right by Deansgate tram stop, round the corner from Oxford
					Road station and a short walk/even shorter taxi ride from Piccadilly.
					<br />
					There's parking close by at
					<a href="https://goo.gl/maps/wf9BUMMjgDFnP27h8" target="_blank"
						>First Street car park</a
					>.
				</div>
			</li>

			<li class="info__cell">
				<h3 class="info__cell__title">Food</h3>
				<div class="info__cell__content">
					All food will be vegetarian with some vegan options. Please let us
					know if you have any specific dietary needs and we'll do our best to
					accomodate.
				</div>
			</li>

			<li class="info__cell">
				<h3 class="info__cell__title">Contact Details</h3>
				<div class="info__cell__content"></div>
			</li>
		</ul>
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
			actionToProgress: (progress) => {
				this.backgroundAnimation.progress(progress);
			},
		});
	},
	methods: {
		setBackgroundAnimation() {
			const bgColor = getComputedStyle(document.body).getPropertyValue(
				'--color-main',
			);

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
		grid-gap: 1em;
		width: 100%;
		grid-template-columns: 1fr 1fr 1fr;
		list-style: none;
		padding: 0;

		@media screen and (max-width: 800px) {
			grid-template-columns: 1fr 1fr;
		}

		@media screen and (max-width: 600px) {
			grid-template-columns: 100%;
		}
	}

	&__cell {
		font-size: var(--font-size-content-small);
		padding-bottom: 0.5rem;
		min-height: 200px;
		border-bottom: 1px solid var(--color-inverse);

		&__title {
			font-size: var(--font-size-subheader);
			padding-bottom: 0.3em;
		}

		&__content {
			padding: 0.5rem 0;
		}
	}

	a {
		color: inherit;
	}
}
</style>
