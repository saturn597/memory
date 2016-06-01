var Card = React.createClass({
    handleClick: function() {
                     this.props.handleClick(this.props.myId);
                 },

    render: function() {
                var backgroundColor = this.props.isSelected ? this.props.image : 'lightCyan';
                var visibility = this.props.wasMatched ? 'hidden' : 'visible';

                var style = {
                    backgroundColor: backgroundColor,
                    display: 'inline-block',
                    margin: this.props.margin,
                    visibility: visibility,
                    height: this.props.height,
                    width: this.props.width
                };

                return (
                    <div className="card" style={style} onClick={this.handleClick}></div>
                );
            },
});

var Game = React.createClass({
    evaluateMatch: function() {
                    var matched = this.state.matched.slice();

                    var a = this.state.selected[0];
                    var b = this.state.selected[1];

                    if (this.props.images[a] === this.props.images[b]) {
                        matched = matched.concat([a, b]);
                    }

                    this.setState({ selected: [], matched: matched });
                    this.resetTimer = null;
                },

    getInitialState: function() {
                         return {selected: [], matched: []}
                     },

    handleCardClick: function(cardId) {
                         if (this.resetTimer || this.state.selected.includes(cardId)) {
                             return;
                         }

                         if (this.state.selected.length >= 1) {
                             this.resetTimer = setTimeout(this.evaluateMatch, 1000);
                         }

                         this.setState({ selected: this.state.selected.concat(cardId) });
                 },

    render: function() {
                var style = {
                    backgroundColor: 'salmon',
                    width: this.props.cardCountX * (this.props.cardWidth + this.props.cardMargin * 2)
                };

                var cards = [];
                
                this.props.images.forEach((image, i) => {
                    cards.push(
                        <Card
                            handleClick={this.handleCardClick}
                            image={image}
                            key={i}
                            margin={this.props.cardMargin}
                            myId={i}
                            isSelected={this.state.selected.includes(i)}
                            wasMatched={this.state.matched.includes(i)}
                            width={this.props.cardWidth} 
                            height={this.props.cardHeight}
                        />);
                });

                return (
                    <div className="game" style={style}>
                        {cards}
                    </div>
                    );
            }
});


var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo'];
colors = colors.concat(colors);

ReactDOM.render(
    <Game 
        cardCountX={3}
        cardCountY={4}
        cardMargin={5}
        cardHeight={100} 
        cardWidth={100} 
        images={colors}
    />, 
    document.getElementById('content')
);

