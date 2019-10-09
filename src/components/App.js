import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  onChangeType = newType => {
    this.setState({ filters: { type: newType } });
  };

  onFindPetsClick = () => {
    let petType = this.state.filters.type
    this.getPets(petType);
  }

  getPets = (petType) => {
    if (petType === "all"){
      return this.get('/api/pets').then(this.changePetTypeState)
    } else if (petType === "cat"){
      return this.get('/api/pets?type=cat').then(this.changePetTypeState)
    } else if (petType === 'dog') { 
      return this.get('/api/pets?type=dog').then(this.changePetTypeState)
    } else if (petType === 'micropig') {
      return this.get('/api/pets?type=micropig').then(this.changePetTypeState)
    }
  }
  
  changePetTypeState = (json) => {
    this.setState({
      pets: json
    })
  }

  get = url => {
    return fetch(url).then(resp => resp.json())
  }

  onAdoptPet = (id) => {
    console.log(id)
      let newPetsArray = this.state.pets.map(pet => {
        if (pet.id === id){
          pet.isAdopted = true;
           return pet
        } else {return pet}})
      this.setState({
      pets: newPetsArray
    })
      }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
