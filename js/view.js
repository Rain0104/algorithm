/**
 * Created by alyona.bugayeva on 3/9/2016.
 */
(function () {
	window.App = window.App || {};

	function AppView() {
		this.generatedArray = [];
		this.arrayTable = document.querySelector('.array-table');
	}

	AppView.prototype = {
		init: function (algorithm) {
			this.findNeighborsAlgorithm = algorithm;
			this.bindEvents();
			this.addCellsIds();
			this.generateArray();
		},

		bindEvents: function () {
			var generateArrayButton = document.querySelector('.generate-array-controller');
			var cells = this.arrayTable.getElementsByTagName('td');

			if (generateArrayButton) {
				generateArrayButton.addEventListener('click', this.generateArray.bind(this), false);
			}

			if (cells) {
				for (var i = 0; i < cells.length; i++) {
					var cell = cells[i];
					cell.addEventListener('click', this.selectCell.bind(this), false);
				}
			}
		},

		addCellsIds: function () {
			var cells = this.arrayTable.getElementsByTagName('td');
			for (var i = 0; i < cells.length; i++) {
				var cell = cells[i];
				cell.id = i;
			}
		},

		selectCell: function (event) {
			var activeCellId = event.target.id || event.srcElement.id;
			this.removeCellsHighlighting();
			this.highlightActiveCell(activeCellId);
			this.findNeighborsAlgorithm.cleanNeighborsArray();
			var neighborCells = this.findNeighborsAlgorithm.findNeighbors(this.generatedArray, activeCellId);
			this.highlightNeighbours(neighborCells);
		},

		removeCellsHighlighting: function () {
			var cells = this.arrayTable.getElementsByTagName('td');
			var length = cells.length;
			for (var i = 0; i < length; i++) {
				var cell = cells[i];
				cell.classList.remove('activeCell');
				cell.classList.remove('activeCellNeighbor');
			}
		},

		highlightActiveCell: function (id) {
			var cells = this.arrayTable.getElementsByTagName('td');
			var cell = cells[id];
			cell.classList.add('activeCell');
		},

		highlightNeighbours: function (cellsArray) {
			var cells = this.arrayTable.getElementsByTagName('td');
			for (var i = 0; i < cellsArray.length; i++) {
				var id = cellsArray[i].id;
				var cell = cells[id];
				cell.classList.add('activeCellNeighbor');
			}
		},

		showGeneratedValues: function () {
			var cells = this.arrayTable.getElementsByTagName('td');
			var generatedArray = this.generatedArray;
			var length = generatedArray.length;
			for (var i = 0; i < length; i++) {
				var cell = cells[i];
				cell.innerHTML = generatedArray[i].value;
			}
		},

		generateArray: function () {
			var generatedArray = [];
			var min = 0;
			var max = 9;
			var cellId = 0;

			this.generatedArray = [];
			for (var i = 0; i < 7; i++) {
				for (var j = 0; j < 7; j++) {
					var value = Math.floor(Math.random() * (max - min + 1) + min);
					var cell = {
						value: value,
						columnIndex: j,
						rowIndex: i,
						id: cellId++
					};
					generatedArray.push(cell);
				}
			}
			this.generatedArray = generatedArray;
			this.showGeneratedValues();
		}
	};
	window.App.appView = new AppView();
})();