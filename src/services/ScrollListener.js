class ScrollListener {
	lastScrollY = 0;
	ticking = false;
	actions = [];

	update = () => {
		for (let i = 0; i < this.actions.length; i++) {
			const action = this.actions[i];

			if (action.type === 'progress') {
				if (this.lastScrollY >= action.startY && this.lastScrollY <= action.endY) {
					action.actionToProgress((this.lastScrollY - action.startY) / action.distanceY);
				} else {
					action.actionToProgress(this.lastScrollY < action.startY ? 0 : 1);
				}
			} else if (action.type === 'trigger') {
				console.log('ok');
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
	 * @param {String} type Action type: 'progress' or 'trigger'
	 * @param {Number} action.startY The Y coordinate at which to start calling the action
	 * @param {Number=} action.endY The Y coordinate at which to stop calling the action
	 * @param {Function=} action.actionToProgress The action to call with a parameter of progress between start (0) and end (1)
	 * @param {Function=} action.actionToTrigger The action to trigger when scrolling past action.startY
	 */
	addAction(action) {
		if (action.type === 'progress') {
			action.distanceY = action.endY - action.startY;
		}
		this.actions.push(action);
	}

	constructor() {
		window.addEventListener('scroll', () => this.onScroll());
	}
}

export default new ScrollListener();
