// React classes

class Card extends React.Component {
    render() {
        const image = this.props.isSelected ? `url(${this.props.image})` : 'none';
        const visibility = this.props.wasMatched ? 'hidden' : 'visible';

        var style = {
            backgroundImage: image,
            visibility: visibility
        };

        return (
            <div
                className="card"
                style={style}
                onClick={this.props.handleClick}
            >
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.evaluateMatch = this.evaluateMatch.bind(this);
        this.restart = this.restart.bind(this);

        this.imageMap = this.props.images.slice();
        this.imageMap = this.imageMap.concat(this.imageMap);
        shuffle(this.imageMap);

        this.resetTimer = null;

        this.state = this.getCleanState();
    }

    evaluateMatch() {
        var matched = this.state.matched.slice();

        const selectedImages = this.state.selected.map(id => this.imageMap[id]);

        if (selectedImages[0] === selectedImages[1]) {
            matched = matched.concat(this.state.selected);
        }

        this.setState({
            selected: [],
            matched: matched,
            guesses: this.state.guesses + 1
        });

        this.resetTimer = null;
    }

    getCleanState() {
         return {selected: [], matched: [], guesses: 0};
    }

    handleCardClick(cardId) {
        if (this.resetTimer || this.state.selected.includes(cardId)) {
            return;
        }

        if (this.state.selected.length >= 1) {
            this.resetTimer = setTimeout(this.evaluateMatch, 500);
        }

        this.setState({selected: this.state.selected.concat(cardId)});
    }

    render() {
        const cards = this.imageMap.map((image, i) =>
            <Card
                handleClick={this.handleCardClick.bind(this, i)}
                image={image}
                isSelected={this.state.selected.includes(i)}
                key={i}
                wasMatched={this.state.matched.includes(i)}
            />
        );

        return (
                <div className="game">
                    {cards}
                    <div>Guesses: {this.state.guesses}</div>
                    <div>Remaining: {cards.length - this.state.matched.length}</div>
                    <button onClick={this.restart}>Start again</button>
                </div>
               );
    }

    restart() {
        shuffle(this.imageMap);
        this.setState(this.getCleanState());
    }
}

// Main
var images = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].map(i => 'images/' + i + '.jpg');

var promises = [];

for (var i of images) {
    promises.push(preload(i));
}

Promise.all(promises).then(() =>
    ReactDOM.render(<Game images={images} />, document.getElementById('content'))
).catch((failedImages) => {
    console.log('failed to load some images:');
    console.log(failedImages);
});


// Utility
function preload(url) {
    return new Promise(function(resolve, reject) {
        var img = new Image();
        img.onload = function() {
            resolve(url);
        }
        img.onerror = function() {
            reject(url);
        }
        img.src = url;
    });
}

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
