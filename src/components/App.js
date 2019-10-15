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

  onChangeType = event => {
    let typeSelected = event.target.value;
    this.setState({
      filters: {
        type: typeSelected
      }
    });
  };

  updatePet = petArray => {
    this.setState({
      pets: petArray
    });
  };

  onFindPetsClick = () => {
    if (this.state.filters.type === "all") {
      fetch("/api/pets")
        .then(resp => resp.json())
        .then(this.updatePet);
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
        .then(resp => resp.json())
        .then(this.updatePet);
    }
  };

  onAdoptPet = petId => {
    let updatedArray = this.state.pets.map(pet => {
      if (pet.id === petId) {
        pet.isAdopted = true;
        console.log(pet);
        return pet;
      } else {
        return pet;
      }
    });
    this.setState({
      pets: updatedArray
    });
  };

  isAdopted = pet => {
    if (pet.isAdopted) {
      return "ui disabled button";
    } else {
      return "ui primary button";
    }
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.onAdoptPet}
                isAdopted={this.isAdopted}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
