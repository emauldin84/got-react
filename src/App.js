import React from 'react';
import './App.css';
import axios from 'axios';

import CharacterDetails from './CharacterDetails'
import Character from './Character'
import SearchBar from './SearchBar'


function searchingFor(searchWord) {
  return function(x) {
    return x.name.toLowerCase().includes(searchWord.toLowerCase()) || !searchWord;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNumber: 1,
      characterObj: {},
      allCharactersArray: [],
      searchWord: ''
    }
  }

  async componentDidMount() {
    this._getCharactersForPage();
  }

  _getCharactersForPage = async () => {
    const allCharsData = await axios.get(`https://my-little-cors-proxy.herokuapp.com/https://anapioficeandfire.com/api/characters?page=${this.state.pageNumber}&pageSize=20`);
    console.log(allCharsData.data);
    this.setState({
        allCharactersArray: allCharsData.data
      }) 
  }

  _incrementPageNumber = () => {
    this.setState ({
      pageNumber: this.state.pageNumber + 1
    }, this._getCharactersForPage);
  }
  _decrementPageNumber = () => {
    this.setState ({
      pageNumber: this.state.pageNumber - 1
    }, this._getCharactersForPage);
  }
  _handleClick = (charName) => {
    // console.log(charName)
    // console.log(this.state.allCharactersArray)
    // console.log(this.state.allCharactersArray.filter (function(character) { return character.name === charName}))
    // filter allCharacters array for targetName to return entire character object
    let targetName = (this.state.allCharactersArray.filter (function(character) { return character.name === charName}))
      
      this.setState ({
        characterObj: targetName
      })
    console.log(this.state.characterObj)
  }
  _searchHandler = (e) => {
    this.setState({
      searchWord: e.target.value
    })
  } 


  render() {
    return (
      <div className="container">
        <h5 className="pageNum">Page: {this.state.pageNumber}</h5>
        <button onClick={this._decrementPageNumber}>previous</button>
        <button onClick={this._incrementPageNumber}>next</button>
        <SearchBar search={this._searchHandler}/>
        <h3>Characters</h3>
        <div className="row">
          <div className="column1">
            {this.state.allCharactersArray.filter(searchingFor(this.state.searchWord)).map(character => <Character _handleClick={this._handleClick} data={character} />)}
          </div>
          <div className="column2">
          <h3>Character Details</h3>
            <CharacterDetails character={this.state.characterObj}
            />
          </div>
          
        </div>
      </div>
    );
  }

}


export default App;
