import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

const URL = "/api/pets"

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

  onChangeType = (newType) => {
    this.setState({
      //pets: [...this.state.pets],
      filters: {type: newType}
    })
  }

  updatePetsState = (aPet) => {
    this.setState({
      pets: aPet,
      filters: this.state.filters.type
    })
  }

  onFindPetsClick = () => {
    if (this.state.filters.type === "all") {
      return fetch(`${URL}`).then(response=> response.json()).then(pet=> this.updatePetsState(pet))
    } else {
      return fetch(`${URL}?type=${this.state.filters.type}`).then(response=> response.json()).then(pet=> this.updatePetsState(pet))
    }
  }

  onAdoptPet = (pet) => {
    let foundPet = this.state.pets.find(p => p.id === pet)
    let copyPets = this.state.pets.filter(pet=> pet.id !== foundPet)
    foundPet.isAdopted = true
    
    this.setState({
      pets: copyPets
    })
    
    // return fetch(`${URL}/${pet}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-type": "application/json",
		//     "Accept": "application/json"
    //   }, body: JSON.stringify({isAdopted: true})
    // }).then(response=>response.json())

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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
