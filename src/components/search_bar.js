import React, {Component} from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

function searchingFor(term) {
	return function(x) {
		return x.title.toLowerCase().includes(term.toLowerCase()) || !term;
	}
}


class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			term: '',
			isHidden: true,
		};
		this.searchHandler = this.searchHandler.bind(this);
	}

	searchHandler(event){
		this.setState({term: event.target.value})
	}
	toggleHidden () {
		this.setState({
			isHidden: !this.state.isHidden
		})
	}
	componentDidMount() {
		axios.get(`http://www.reddit.com/r/lfg.json?limit=200&after=t3_10omtd/`).then(
			res => {
				const posts = res.data.data.children.map(obj => obj.data);
				this.setState({posts}) ;
			});
	}

  render() {

    return (
      <div className="searchBarStyling">
        <h1>{`/r/LFG`}</h1>
        <form>
        <label>Keyword for Game (ie: 5e, traveller, pathfinder)</label>
        <input 	type="text" 
				onChange={this.searchHandler}
        /> <br />
        <label>Online or offline?</label>
        <input 	type="text" 
				onChange={this.searchHandler}
        />
        </form>
        {this.state.posts.filter(searchingFor(this.state.term)).map(post =>
        <ul className="games-list">
            <li key={post.id}>{post.title}</li>
            <li><a key={post.id} href={'http://www.reddit.com' + post.permalink}>Click Here And Go Forth Adventurer</a></li>
            <li key={post.id}>Comments So Far... {post.num_comments}</li>
        </ul>
        )}
      </div>
    );
  }
}

export default SearchBar;