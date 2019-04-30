import React from 'react';
import './App.css';
import axios from 'axios';

import CharacterDetails from './CharacterDetails'
import Character from './Character'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNumber: 1,
      characterObj: {},
      allCharactersArray: [],
    }
  }

  async componentDidMount() {
    this._getCharactersForPage();
  }

  _getCharactersForPage = async () => {
    const allCharsData = await axios.get(`https://my-little-cors-proxy.herokuapp.com/https://anapioficeandfire.com/api/characters?page=${this.state.pageNumber}&pageSize=10`);
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


  render() {
    return (
      <div>
        <h5>Page: {this.state.pageNumber}</h5>
        <h3>Characters</h3>
        <button onClick={this._decrementPageNumber}>previous</button>
        <button onClick={this._incrementPageNumber}>next</button>
        {this.state.allCharactersArray.map(character => <Character _handleClick={this._handleClick} data={character} />)}
        <CharacterDetails character={this.state.characterObj}
        />
      </div>
    );
  }

}


export default App;
