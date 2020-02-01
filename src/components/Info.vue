<template>
	<section ref="info" class="info">
		<h2 class="info__title">
			All the details...
		</h2>

		<ul class="info__grid">
			<li class="info__cell">
				<h3 class="info__grid__title">Location</h3>
				HOME, <br />
				<a href="https://goo.gl/maps/d88LG3KAt4vfNoRJ6" target="_blank">
					2 Tony Wilson Place, <br />
					Manchester
				</a>
			</li>

			<li class="info__cell">
				<h3 class="info__grid__title">Timings</h3>
				Ceremony 4pm <br />
				Reception etc til 1am
			</li>

			<li class="info__cell">
				<h3 class="info__grid__title">Accomodation</h3>
			</li>

			<li class="info__cell">
				<h3 class="info__grid__title">Transport</h3>
				HOME is right by Deansgate tram stop, round the corner from Oxford Road
				station and a short walk/even shorter taxi ride from Piccadilly. <br />
				There's parking close by at
				<a href="https://goo.gl/maps/wf9BUMMjgDFnP27h8" target="_blank">First Street car park</a>.
			</li>

			<li class="info__cell">
				<h3 class="info__grid__title">Food</h3>
			</li>

			<li class="info__cell">
				<h3 class="info__grid__title">Owt Else?</h3>
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
		this.setAnimation();
		this.elementTop = this.$el.offsetTop;
		ScrollListener.addAction({
			startY: this.elementTop - window.innerHeight * 0.6,
			endY: this.elementTop,
			actionToProgress: progress => {
				this.tl.progress(progress);
			},
		});
	},
	methods: {
		setAnimation() {
			const bgColor = getComputedStyle(document.body).getPropertyValue(
				'--color-main',
			);

			gsap.set(this.$refs.intro, { opacity: 0 });

			this.tl = gsap.timeline();
			this.tl
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

	&__title {
		font-size: var(--font-size-header);
	}

	&__grid {
		display: grid;
		grid-gap: 1em;
		width: 100%;
		grid-template-columns: 1fr 1fr 1fr;
		list-style: none;
		padding: var(--padding-content);

		@media screen and (max-width: 800px) {
			grid-template-columns: 1fr 1fr;
		}

		@media screen and (max-width: 600px) {
			grid-template-columns: 100%;
		}

		&__title {
			font-size: var(--font-size-subheader);
			padding-bottom: 0.3em;
		}
	}

	&__cell {
		font-size: var(--font-size-content-small);
		padding-bottom: var(--padding-content);
		min-height: 200px;
		border-bottom: 1px solid var(--color-inverse);
	}

	a {
		color: inherit;
	}
}
</style>
