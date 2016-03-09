/**
 * Created by alyona.bugayeva on 3/9/2016.
 */
(function () {
	window.App = window.App || {};
	function Algorithm() {
		this.array = [];
		this.neighborsArray = [];
	}

	Algorithm.prototype = {

		cleanNeighborsArray: function (){
			this.neighborsArray = [];
		},

		findNeighbors: function (array, activeCellId) {
			this.array = array;
			var cells = [];
			//var neighbors = [];
			var activeCell = array[activeCellId];
			var activeValue = activeCell.value;
			var activeRow = activeCell.rowIndex;
			var activeColumn = activeCell.columnIndex;

			cells = this.findCellNeighbors(activeValue, activeRow, activeColumn, activeCellId);
			if (cells.length > 0) {
				for (var i = 0; i < cells.length; i++) {


					if (this.checkNeighborInArray(cells[i])) {
						this.neighborsArray.push(cells[i]);
						this.findNeighbors(this.array, cells[i].id);
					}
				}
			} else {
console.log();
				return this.neighborsArray;
			}

		},

		checkNeighborInArray: function(cell){
			console.log(cell);
			var isContains = true;
			for (var i = 0; i < this.array.length; i++){

			}

		},
		findCellNeighbors: function (activeValue, activeRow, activeColumn, activeCellId) {

			var cells = [];
			var topNeighbor = null;
			var rightNeighbor = null;
			var leftNeighbor = null;
			var bottomNeighbor = null;

			var id = parseInt(activeCellId);

			if (activeRow !== 0) {
				topNeighbor = this.array[id - 7];
				if (topNeighbor.value === activeValue) {
					cells.push(topNeighbor);
				}
			}

			if (activeRow !== 6) {
				bottomNeighbor = this.array[id + 7];
				if (bottomNeighbor.value === activeValue) {
					cells.push(bottomNeighbor);
				}
			}

			if (activeColumn !== 0) {
				leftNeighbor = this.array[id - 1];
				if (leftNeighbor.value === activeValue) {
					cells.push(leftNeighbor);
				}
			}

			if (activeColumn !== 6) {
				rightNeighbor = this.array[id + 1];
				if (rightNeighbor.value === activeValue) {
					cells.push(rightNeighbor);
				}
			}

			return cells;
		}
	};

	window.App.algorithm = new Algorithm();
})();
