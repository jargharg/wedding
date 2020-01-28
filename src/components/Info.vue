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
			startY: this.elementTop - 100,
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
			this.tl = gsap.timeline();
			this.tl
				.to('#app', {
					backgroundColor: bgColor,
					ease: 'power4.easeOut',
				})
				.pause();
		},
	},
};
</script>

<style scoped lang="scss">
.info {
	min-height: var(--slide-height);
	position: relative;

	&__content {
		padding: 1em;
		min-height: 100vh;
		height: 100%;
		color: var(--splash-bg-inverse-color);

		h2 {
			position: sticky;
			top: 0;
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
		padding: 1em;
		min-height: 200px;
		border-bottom: 1px solid var(--splash-bg-inverse-color);
	}
}
</style>
