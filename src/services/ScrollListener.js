class ScrollListener {
	lastScrollY = 0;
	ticking = false;
	actions = [];

	update = () => {
		for (let i = 0; i < this.actions.length; i++) {
			const action = this.actions[i];

			if (this.lastScrollY >= action.startY && this.lastScrollY <= action.endY) {
				const progress = (this.lastScrollY - action.startY) / action.distanceY;
				action.actionToProgress(progress);
			} else {
				action.actionToProgress(this.lastScrollY < action.startY ? 0 : 1);
			}
		}

		this.ticking = false;
	};

	requestTick = () => {
		if (!this.ticking) {
			window.requestAnimationFrame(this.update);
			this.ticking = true;
		}
	};

	onScroll = () => {
		this.lastScrollY = window.scrollY;
		this.requestTick();
	};

	/**
	 * Add an action to the scroll listener
	 * @param {Object} action
	 * @param {Number} action.startY The Y coordinate at which to start calling the action
	 * @param {Number=} action.endY The Y coordinate at which to stop calling the action
	 * @param {Function=} action.actionToProgress The action to call with a parameter of progress between start (0) and end (1)
	 */
	addAction(action) {
		action.distanceY = action.endY - action.startY;
		this.actions.push(action);
	}

	constructor() {
		window.addEventListener('scroll', () => this.onScroll());
	}
}

export default new ScrollListener();