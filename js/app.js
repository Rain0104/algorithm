/**
 * Created by alyona.bugayeva on 3/9/2016.
 */
var App = (function () {
	function App() {
		this.init();
	}

	App.prototype = {
		init: function () {
			window.App.appView.init(window.App.algorithm);
		}
	};

	return new App();
})();