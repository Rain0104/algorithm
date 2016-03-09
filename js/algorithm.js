/**
 * Created by alyona.bugayeva on 3/9/2016.
 */
(function () {
	window.App = window.App || {};
	function Algorithm() {
		this.generatedArray = [];
		this.neighborsArray = [];
	}

	Algorithm.prototype = {

		cleanNeighborsArray: function (){
			this.neighborsArray = [];
		},

		updateGeneratedArray: function (array){
			this.generatedArray = array;
		},

		findNeighbors: function (activeCellId) {
			var cells;
			var activeCell = this.generatedArray[activeCellId];
			var activeValue = activeCell.value;
			var activeRow = activeCell.rowIndex;
			var activeColumn = activeCell.columnIndex;

			if (!this.checkNeighborInArray(activeCell)) {
				this.neighborsArray.push(activeCell);
			}

			cells = this.findCellNeighbors(activeValue, activeRow, activeColumn, activeCellId);

			for (var i = 0; i < cells.length; i++) {
				if (!this.checkNeighborInArray(cells[i])) {
					this.neighborsArray.push(cells[i]);
					this.findNeighbors(cells[i].id);
				}
			}

			return this.neighborsArray;
		},

		checkNeighborInArray: function(cell){
			var isContains = false;
			for (var i = 0; i < this.neighborsArray.length; i++){
				if (this.neighborsArray[i].id === cell.id) {
					isContains = true;
					return isContains;
				}
			}
			return isContains;
		},

		findCellNeighbors: function (activeValue, activeRow, activeColumn, activeCellId) {

			var cells = [];
			var topNeighbor = null;
			var rightNeighbor = null;
			var leftNeighbor = null;
			var bottomNeighbor = null;

			var id = parseInt(activeCellId);

			if (activeRow !== 0) {
				topNeighbor = this.generatedArray[id - 7];
				if (topNeighbor.value === activeValue) {
					cells.push(topNeighbor);
				}
			}

			if (activeRow !== 6) {
				bottomNeighbor = this.generatedArray[id + 7];
				if (bottomNeighbor.value === activeValue) {
					cells.push(bottomNeighbor);
				}
			}

			if (activeColumn !== 0) {
				leftNeighbor = this.generatedArray[id - 1];
				if (leftNeighbor.value === activeValue) {
					cells.push(leftNeighbor);
				}
			}

			if (activeColumn !== 6) {
				rightNeighbor = this.generatedArray[id + 1];
				if (rightNeighbor.value === activeValue) {
					cells.push(rightNeighbor);
				}
			}

			return cells;
		}
	};

	window.App.algorithm = new Algorithm();
})();
