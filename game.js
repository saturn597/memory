// React classes
var Card = React.createClass({
    render: function() {
                const image = this.props.isSelected ? `url(${this.props.image})` : 'none';
                const visibility = this.props.wasMatched ? 'hidden' : 'visible';

                var style = {
                    backgroundImage: image,
                    visibility: visibility
                };

                const onClick = () => this.props.handleClick(this.props.myId);

                return (
                    <div
                        className="card"
                        style={style}
                        onClick={onClick}
                    >
                    </div>
                );
            },
});

var Game = React.createClass({
    evaluateMatch: function() {
                    var matched = this.state.matched.slice();

                    const a = this.state.selected[0];
                    const b = this.state.selected[1];

                    if (this.props.images[a] === this.props.images[b]) {
                        matched = matched.concat([a, b]);
                    }

                    this.setState({
                        selected: [],
                        matched: matched,
                        guesses: this.state.guesses + 1,
                    });

                    this.resetTimer = null;
                },

    getInitialState: function() {
                         return {selected: [], matched: [], guesses: 0};
                     },

    handleCardClick: function(cardId) {
                         if (this.resetTimer || this.state.selected.includes(cardId)) {
                             return;
                         }

                         if (this.state.selected.length >= 1) {
                             this.resetTimer = setTimeout(this.evaluateMatch, 500);
                         }

                         this.setState({selected: this.state.selected.concat(cardId)});
                 },

    render: function() {
                var cards = [];

                this.props.images.forEach((image, i) => {
                    cards.push(
                        <Card
                            handleClick={this.handleCardClick}
                            image={image}
                            isSelected={this.state.selected.includes(i)}
                            key={i}
                            myId={i}
                            wasMatched={this.state.matched.includes(i)}
                        />);
                });

                return (
                    <div className="game">
                        {cards}
                        <div>Guesses: {this.state.guesses}</div>
                        <div>Remaining: {cards.length - this.state.matched.length}</div>
                        <button onClick={this.restart}>Start again</button>
                    </div>
                    );
            },

    restart: function() {
                 this.setState(this.getInitialState());
             }
});


// Main
var images = ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg', 'f.jpg'].map(i => 'images/' + i);
images = images.concat(images);

shuffle(images);

ReactDOM.render(<Game images={images} />, document.getElementById('content'));


// Utility
function shuffle(arr) {
    // Implementing Fisher-Yates shuffle:
    // https://en.wikipedia.org/wiki/Fisher-Yates_shuffle

    var newIndex, swap;
    for (var i = arr.length - 1; i > 0; i--) {
        newIndex = Math.floor(Math.random() * (i + 1));
        swap = arr[newIndex];
        arr[newIndex] = arr[i];
        arr[i] = swap;
    }
}
