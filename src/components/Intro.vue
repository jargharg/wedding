<template>
	<SlideWrapper class="intro__wrapper" id="intro">
		<section ref="intro" class="intro">
			<h2 class="intro__title">
				You're Invited!
			</h2>

			<p class="intro__text">
				We're getting married on Saturday 25th September 2021, and would love for
				you to celebrate the day with us.
			</p>

			<p class="intro__text">
				Our venue is HOME in central Manchester. The ceremony will be at 4pm, with
				food, drinks and dancing to follow until late.
			</p>

			<p class="intro__text">
				Please let us know if you can come by the end of May.
			</p>

			<div class="intro__heart">
				<HeartSplit />
			</div>
		</section>
	</SlideWrapper>
</template>

<script>
import HeartSplit from './HeartSplit';
import SlideWrapper from './SlideWrapper';

export default {
	components: {
		HeartSplit,
		SlideWrapper,
	},
};
</script>

<style scoped lang="scss">
.intro {
	&__wrapper {
		background: var(--color-secondary);
		color: var(--color-primary);
		z-index: 2;
	}

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
