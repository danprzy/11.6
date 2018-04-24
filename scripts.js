
$(function() {
	
	function randomString() {
	    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	    var str = '';
		    for (var i = 0; i < 10; i++) {
		        str += chars[Math.floor(Math.random() * chars.length)];
		    }
	    return str;
	}

	function Column(name) {
	    var self = this; // useful for nested functions

	    this.id = randomString();
	    this.name = name;
	    this.$element = createColumn();//  code for creating the column
	}
	    function createColumn() {
	    // CREATING COMPONENTS OF COLUMNS
	    	var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete').text('x');
			var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
		console.log(1);
		// ADDING EVENTS
			$columnDelete.click(function() {
        		self.removeColumn();
			});
		
   			$columnAddCard.click(function() { //Add a note after clicking on the button
        		self.addCard(new Card(prompt("Enter the name of the card")));
        	console.log(2);
			});
   		// CONSTRUCTION COLUMN ELEMENT
   			$column.append($columnTitle)
		        .append($columnDelete)
		        .append($columnAddCard)
		        .append($columnCardList);

		// RETURN OF CREATED COLUMN
			return $column;

		}
	

	Column.prototype = {
	    addCard: function(card) { //this.$element wskazuje na div.column
	      this.$element.children('ul').append(card.$element);
	    },
	    removeColumn: function() {
	      this.$element.remove();
	    }
	};


});