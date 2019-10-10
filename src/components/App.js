import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: { type: 'all'}
    }
  }

  onChangeType = (newType) => {
    console.log(newType)
    this.setState({
      filters: { type: newType }
    })
  }


  onFindPetsClick =() => {
    let filteredPets=this.state.filters.type
    // console.log(filteredPets)
    if (filteredPets === 'all') {
      return fetch('/api/pets').then(response => response.json()).then(data => this.filterPets(data))
    } else {
      return fetch(`/api/pets?type=${filteredPets}`).then(response => response.json()).then(data => this.filterPets(data))
    }
  }

  filterPets = (chosenPets) => {
    // console.log(chosenPets)
    this.setState({
      pets: chosenPets
    })
  }

  onAdoptPet = (petId) => {
    this.setState({
      pets: this.state.pets.map(pet => {
        if (pet.id === petId) {
          pet.isAdopted = true
        }
        return pet
      })
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
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
