var Card = React.createClass({
    render: function() {
        var style = {
            backgroundColor: 'lightcyan',
            display: 'inline-block',
            margin: this.props.margin,
            height: this.props.height,
            width: this.props.width
        };

        return (
            <div className="card" style={style}></div>
        );
    },

});

var Game = React.createClass({
    render: function() {
                var cards = [];

                var style = {
                    backgroundColor: 'salmon',
                    width: this.props.cardCountX * (this.props.cardWidth + this.props.cardMargin * 2)
                };

                for (var i = 0; i < this.props.cardCountX * this.props.cardCountY; i++) {
                    cards.push(
                        <Card 
                            key={i} 
                            margin={this.props.cardMargin}
                            width={this.props.cardWidth} 
                            height={this.props.cardHeight}
                        />);
                }

                return (
                    <div className="game" style={style}>
                        {cards}
                    </div>
                    );
            }
});

ReactDOM.render(
    <Game 
        cardCountX={5}
        cardCountY={4}
        cardMargin={5}
        cardHeight={100} 
        cardWidth={100} 
    />, 
    document.getElementById('content'));

