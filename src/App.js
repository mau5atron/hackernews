import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
console.log(url);

// use higher order es6 version 
const isSearched = searchTerm => item => 
	// some condition which returns true or false 
	// matches incoming search term property title
	item.title.toLowerCase().includes(searchTerm.toLowerCase());	


class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			result: null,
			searchTerm: DEFAULT_QUERY,
		}
		this.setSearchTopStories = this.setSearchTopStories.bind(this);
		this.onDismiss = this.onDismiss.bind(this); // binding onDismiss to object class
		this.onSearchChange = this.onSearchChange.bind(this); // binding onSearch change to object class
	}
	
	setSearchTopStories(result){
		this.setState({result});
	}
	
	componentDidMount(){
		const { searchTerm } = this.setState;

		fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
			.then(response => response.json())
			.then(result => this.setSearchTopStories(result))
			.catch(error => error);
	}
	onDismiss(id){
		// ES6 const function => 
		const isNotId = item => item.objectID !== id;
		const updatedHits = this.state.result.hits.filter(isNotId);
		this.setState({
			// result: Object.assign({}, this.state.result, { hits: updatedHits })
			// used spread operator to join objects instead of Object.assign();
			result: { ...this.state.result, hits: updatedHits }
		});
	}


	onSearchChange(event){
		this.setState({ searchTerm: event.target.value });
		// do not forget to define the initial state for the searchTerm in the constructor 
	}

  render() {
  	// replaces this.state in the form when handling state, consider it destructuring
  	const { searchTerm, result } = this.state;
  	// if result does not exist return null
  	if (!result){ return null; }
    return (
      <div className="page">
				<div className="interactions">
	      	{/*this will be the search component*/}
	      	{/*value is = to searchTerm, when the component is created below, value is = to value when called + references searchTerm*/}
	      	<Search value={searchTerm} onChange={this.onSearchChange}>
	      	Search
	      	</Search>
				</div>
				
				{/*this will be the table component*/}
				{/*pattern is = searchTerm, when the component is created below, pattern is = pattern when called + references searchTem*/}
				
				{/*conditional rendering happening here*/}
				{ 	
					result && <Table list={result.hits} pattern={searchTerm} onDismiss={this.onDismiss} />
				}
      </div>
    );
  }
}

// concise stateless component
const Search = ({value, onChange, children}) =>
	// const { value, onChange, children } = props;
	<form>
		{children} <input type="text" value={value} onChange={onChange}/>
	</form>

const Table = ({list, pattern, onDismiss}) => 
		// const { list, pattern, onDismiss } = this.props;
	<div className="table">
  	{
  		list.filter(isSearched(pattern)).map(item => 
  			<div key={item.objectID} className="table-row">
  				<span style={{ width: '40%' }}>
  					<a href={item.url}> {item.title} </a>
  				</span>
  				<span style={{ width: '30%' }}>{item.author}</span>
  				<span style={{ width: '10%' }}>{item.num_comments}</span>
  				<span style={{ width: '10%' }}>{item.points}</span>
  				<span style={{ width: '10%' }}>
  					<button onClick={() => onDismiss(item.objectID)} type="button" className="button-inline">
  						Dismiss
  					</button>
  				</span>
  			</div>
			)
  	}
  </div>

const Button = ({onClick, className='', children}) => 
		// const { onClick, className='', children, } = this.props;
	<button onClick={onClick} className={className} type="button">
		{children}
	</button>	

export default App;




















