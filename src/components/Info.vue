<template>
	<section ref="info" class="info">
		<div class="info__content">
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
				<li>
					<h3>Food</h3>
				</li>
				<li>
					<h3>Owt Else?</h3>
				</li>
			</ul>
		</div>
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
				'--splash-bg-color',
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
	// min-height: var(--slide-height);
	position: relative;

	&__content {
		padding: 1em;
		// min-height: 100vh;
		height: 100%;
		color: var(--splash-bg-inverse-color);

		h2 {
			font-size: 4rem;

			@media screen and (max-width: 600px) {
				font-size: 2.2rem;
			}
		}

		h3 {
			font-size: 1.5rem;
		}
	}
}

.info-grid {
	display: grid;
	grid-gap: 1em;
	width: 100%;
	grid-template-columns: 1fr 1fr 1fr;
	list-style: none;
	padding: 0;

	@media screen and (max-width: 600px) {
		grid-template-columns: 100%;
	}

	li {
		font-size: 1.2rem;
		padding-bottom: 1em;
		min-height: 200px;
		border-bottom: 1px solid var(--splash-bg-inverse-color);
	}
}
</style>
