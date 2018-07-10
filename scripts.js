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
        this.$element = createColumn(); //  code for creating the column

        function createColumn() {
            // CREATING COMPONENTS OF COLUMNS
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('Delate column');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
            console.log(1);
            // ADDING EVENTS
            $columnDelete.click(function() {
                self.removeColumn();
            });

            $columnAddCard.click(function() { //Add a note after clicking on the button
                //	self.addCard(new Card(prompt("Enter the name of the card")));
                var input = prompt("Enter the name of the card");
                if (input !== null) { //prompt returns a string if the user presses OK 
                    self.addCard(new Card(input));
                }
            });
            // CONSTRUCTION COLUMN ELEMENT
            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);

            // RETURN OF CREATED COLUMN
            return $column;

        }
    }

    Column.prototype = {
        addCard: function(card) { //this.$element wskazuje na div.column
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    };

    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard();


        function createCard() {
            // CREATING THE BLOCK
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('Delate card');

            $cardDelete.click(function() {
                self.removeCard();
            });

            $card.append($cardDelete)
                .append($cardDescription);

            return $card;
        }

        Card.prototype = {
            removeCard: function() {
                this.$element.remove();
            }
        };

    }

    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };

    function initSortable() { //drag'n'drop
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }

    $('.create-column')
        .click(function() {
            var name = prompt('Enter a column name');
            if (name !== null) {
                var column = new Column(name);
                board.addColumn(column);
            }
        });

    // CREATING COLUMNS
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // ADDING COLUMNS TO THE BOARD
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // CREATING CARDS
    var card1 = new Card('New task');

    // ADDING CARDS TO COLUMNS
    todoColumn.addCard(card1);

});