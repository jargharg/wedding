<template>
	<section class="intro">
		<div class="slide">
			<div class="intro__content">
				<h2>
					You're Invited!
				</h2>

				hello hello etc

				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere
					molestie ante, in ultricies libero fermentum et. Duis vehicula lorem
					vulputate nulla lobortis egestas. Phasellus dignissim, sapien nec
					consectetur rhoncus, ex ante dignissim risus, et tempor massa lectus
					non ligula. Vivamus quis mattis massa. Nullam ullamcorper velit
					libero, ac luctus dui dapibus vitae. Aenean sollicitudin libero ac
					magna tempor, nec porttitor odio luctus. Ut rhoncus vestibulum
					pharetra. Cras ac magna nibh. Vivamus nisi odio, tempor in malesuada
					ut, fermentum ut enim. Vestibulum a gravida tellus. Nullam vel semper
					sem. Quisque accumsan interdum lorem nec ullamcorper. Fusce lobortis
					gravida metus, at molestie ante viverra id.
				</p>
				<p>
					Aenean at finibus velit. Cras bibendum, risus sit amet volutpat
					feugiat, sapien elit scelerisque ante, sit amet condimentum arcu eros
					eget turpis. Morbi ullamcorper consequat vulputate. Mauris luctus arcu
					non nisi varius ultrices. Nulla sed erat vehicula, facilisis ex in,
					convallis ligula. Nullam tempor elit vel tempor porta. Maecenas in
					lacinia sem, luctus ultrices erat. Suspendisse ornare tempus sem, ut
					facilisis turpis fringilla in.
				</p>
				<p>
					Suspendisse potenti. Pellentesque tempus ex odio, in commodo risus
					tincidunt vel. Etiam eu pretium augue. Quisque sollicitudin mauris
					quis urna rhoncus, in dictum orci euismod. Mauris at augue ultrices
					justo blandit mollis ac eget dolor. Sed lobortis ligula turpis, eu
					aliquam velit porttitor at. Suspendisse at ornare magna. Sed suscipit
					imperdiet arcu eget lobortis. Curabitur tempus neque eu nibh faucibus,
					eu fringilla est dictum. Ut dictum risus in mi blandit efficitur.
					Nullam vel enim eget nisl pellentesque sollicitudin. Duis fermentum
					molestie lacus. Curabitur in sagittis turpis. Morbi dictum
					sollicitudin luctus. Etiam ac suscipit nibh, a tincidunt nibh. Ut ut
					viverra velit, a fringilla dolor.
				</p>
			</div>
		</div>

		<svg display="none">
			<filter id="turbulence2">
				<feTurbulence
					type="fractalNoise"
					baseFrequency="0.01"
					numOctaves="1"
					data-filterId="3"
				/>
				<feDisplacementMap
					ref="turbScale"
					xChannelSelector="R"
					yChannelSelector="G"
					in="SourceGraphic"
					scale="0"
				/>
			</filter>
		</svg>
	</section>
</template>

<script>
import ScrollListener from '@/services/ScrollListener';
import gsap from 'gsap';

export default {
	name: 'Intro',
	mounted() {
		this.elementTop = this.$el.offsetTop;
		this.scrollTimeline = this.$el.scrollHeight - window.innerHeight;

		this.setAnimation();
		ScrollListener.addAction({
			startY: this.elementTop,
			endY: this.elementTop + this.scrollTimeline,
			actionToProgress: progress => {
				this.tl.progress(progress);
			},
		});
	},
	methods: {
		setAnimation() {
			this.tl = gsap.timeline();
			this.tl
				.to(this.$refs.turbScale, {
					attr: { scale: 50 },
				})
				.pause();
		},
	},
};
</script>

<style scoped lang="scss">
.intro {
	height: 220vh;
	margin-bottom: -100vh;
	position: relative;

	.slide {
		background: var(--pop-color);
	}

	&__content {
		padding: 1em;
		color: #444;
		// mix-blend-mode: difference;
		filter: url('#turbulence2');
	}
}
</style>
