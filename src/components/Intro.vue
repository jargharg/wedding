<template>
	<SlideWrapper class="intro__wrapper" id="intro">
		<section ref="intro" class="intro">
			<h2 class="intro__title">You're Invited!</h2>

			<p v-if="names" class="intro__text">{{ names }},</p>

			<p class="intro__text">
				<template v-if="isDayGuest">
					We're getting married on Saturday 25th September 2021, and would love
					for you to celebrate the day with us.
				</template>

				<template v-else>
					We're getting married on Saturday 25th September 2021, and would love
					for you to celebrate with us at our reception.
				</template>
			</p>

			<p class="intro__text">
				Our venue is HOME in central Manchester.

				<template v-if="isDayGuest">
					The ceremony will be at 4pm, with food, drinks and dancing to follow
					until late.
				</template>

				<template v-else>
					Join us from 8pm for pizzas, drinks and dancing until late.
				</template>
			</p>

			<p class="intro__text">
				Please let us know if you can come by the 25th of July.
			</p>

			<div class="intro__heart">
				<HeartSplit />
			</div>
		</section>
	</SlideWrapper>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import HeartSplit from './HeartSplit';
import SlideWrapper from './SlideWrapper';

export default {
	components: {
		HeartSplit,
		SlideWrapper,
	},
	computed: {
		...mapGetters(['isDayGuest']),
		...mapState(['names']),
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
