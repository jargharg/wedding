<template>
	<section ref="intro" class="intro">
		<h2 class="intro__title">
			You're Invited!
		</h2>

		<p class="intro__text">
			Although things are uncertain at the moment, we're planning to get married on
			Saturday 12th September 2020, and would love for you to celebrate the day with
			us.
		</p>

		<p class="intro__text">
			Our venue is HOME in central Manchester. The ceremony will be at 4pm, with
			food, drinks and dancing to follow until late.
		</p>

		<p class="intro__text">
			We want everyone to be safe, so we will keep you updated if anything has to
			change. For now we're expecting everything to go ahead, so please RSVP and
			plan as normal.
		</p>

		<p class="intro__text">
			We understand if you need to adjust your plans or if closer to the time you
			feel uncomfortable attending—just let us know!
		</p>

		<p class="intro__heart">
			<HeartSplit />
		</p>
	</section>
</template>

<script>
import ScrollListener from '@/services/ScrollListener';
import HeartSplit from './HeartSplit';
import gsap from 'gsap';

export default {
	name: 'Intro',
	components: {
		HeartSplit,
	},
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
				'--color-inverse',
			);

			gsap.set(this.$refs.intro, { opacity: 0 });

			this.backgroundAnimation = gsap
				.timeline()
				.to('#app', {
					backgroundColor: bgColor,
					ease: 'power4.out',
					duration: 1,
				})
				.to(this.$refs.intro, {
					opacity: 1,
					duration: 1,
					delay: -1,
				})
				.pause();
		},
	},
};
</script>

<style scoped lang="scss">
.intro {
	color: var(--color-main);
	padding: var(--padding-section);
	max-width: 1000px;
	margin: 0 auto;

	&__title {
		font-size: var(--font-size-header);
	}

	&__text {
		font-size: var(--font-size-content);
		margin: 1rem 0;
		padding: var(--padding-content);
		line-height: var(--line-height-body);
	}

	&__heart {
		text-align: center;
		padding: 4vh 0;

		img {
			max-width: 100px;
		}
	}

	a {
		color: inherit;
	}
}
</style>
