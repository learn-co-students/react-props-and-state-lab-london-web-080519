import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  onChangeType = event => {
    this.setState({ filters: { type: event.target.value } });
  };

  onFindPetsClick = () => {
    this.state.filters.type === "all"
      ? fetch("/api/pets")
          .then(response => response.json())
          .then(pets => this.setState({ pets: pets }))
      : fetch(`/api/pets?type=${this.state.filters.type}`)
          .then(response => response.json())
          .then(pets => this.setState({ pets: pets }));
  };

  onAdoptPet = id => {
    let petList = this.state.pets;
    let adoptedPet = this.state.pets.find(item => item.id === id);
    adoptedPet.isAdopted = true;
    let index = this.state.pets.indexOf(adoptedPet);
    petList[index] = adoptedPet;
    this.setState(petList);
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
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
