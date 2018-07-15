import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const list = [
	{
		title: 'React',
		url: 'https://facebook.github.io/react/',
		author: 'Jordan Walke',
		num_comments: 3,
		points: 4,
		objectID: 0
	},
	{
		title: 'Redux',
		url: 'https://github.com/reactjs/redux',
		author: 'Dan Abramov, Andrew Clark',
		num_comments: 2,
		points: 5,
		objectID: 1 
	},
];


// isSearched(searchTerm) {
// 	return item => {
// 		// some condition which returns true or false
// 		// matches incoming search term property title
// 		return item.title.toLowerCase().includes(searchTerm.toLowerCase());
// 	}
// 



// use higher order es6 version 
const isSearched = searchTerm => item => 
	// some condition which returns true or false 
	// matches incoming search term property title
	item.title.toLowerCase().includes(searchTerm.toLowerCase());	


class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			list,
			searchTerm: '',
		}

		this.onDismiss = this.onDismiss.bind(this); // binding onDismiss to object class
		this.onSearchChange = this.onSearchChange.bind(this); // binding onSearch change to object class
	}

	onDismiss(id){
		// function isNotId(item){
		// 	return item.objectID !== id;
		// });
		// const updatedList = this.state.list.filter(isNotId);

		// ES6 const function => 
		const isNotId = item => item.objectID !== id;
		const updatedList = this.state.list.filter(isNotId);

		// or one-liner

		// const updatedList = this.state.list.filter(item => item.objectID !== id);

		// updating the state in the internal component state
		this.setState({list: updatedList});
	}


	onSearchChange(event){
		this.setState({ searchTerm: event.target.value });
		// do not forget to define the initial state for the searchTerm in the constructor 
	}

  render() {
  	const { searchTerm, list } = this.state;
  	// replaces this.state in the form when handling state, consider it destructuring
    return (
      <div className="App">

      	{/*this will be the search component*/}
      	{/*value is = to searchTerm, when the component is created below, value is = to value when called + references searchTerm*/}
      	<Search value={searchTerm} onChange={this.onSearchChange}>
      	Search
      	</Search>
				
				{/*this will be the table component*/}
				{/*pattern is = searchTerm, when the component is created below, pattern is = pattern when called + references searchTem*/}
				<Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />

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
	<div>
  	{list.filter(isSearched(pattern)).map(item => 
  			<div key={item.objectID}>
  				<span>
  					<a href={item.url}>{item.title}</a>
  				</span>
  				<span>{item.author}</span>
  				<span>{item.num_comments}</span>
  				<span>{item.points}</span>
  				<span>
  					<button onClick={() =>
  						onDismiss(item.objectID)} type="button">Dismiss
  					</button>
  				</span>
  				<hr/>
  			</div>
			)}
  </div>

class Button extends Component {
	render(){
		const {
			onClick, 
			className='',
			children,
		} = this.props;

		return(
			<button onClick={onClick} className={className} type="button">
				{children}
			</button>	
		);
	}
}


export default App;




















