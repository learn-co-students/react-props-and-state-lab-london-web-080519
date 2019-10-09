import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (selection) => {
    this.setState({ filters: {type: selection.value}}, () => console.log(this.state))
  }

  onFindPetsClick = () => {
    let query = this.state.filters.type === 'all' ? '' : "?type="+this.state.filters.type
    return fetch("/api/pets"+ query)
    .then(response => response.json())
    .then(response => {
      this.setState({pets: response})
    })
  }

  filterPets = () => {
    return this.state.pets.filter(pet => {
      return this.state.filters.type === "all" || pet.type === this.state.filters.type
    })
  }

  onAdoptPet = (pet_id) => {
    console.log(`${this.state.pets.find(pet => pet.id === pet_id ).name} adopted!`)
    this.setState({pets: this.state.pets.map(pet => {
      if (pet.id === pet_id) {pet.isAdopted = true; return pet}
      else {return pet}
      })
    })
  }

  render() {

    let filteredPets = this.filterPets()

    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={filteredPets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
