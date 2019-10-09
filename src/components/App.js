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
      fetch(`${URL}`).then(response=> response.json()).then(pet=> this.updatePetsState(pet))
    } else {
      fetch(`${URL}?type=${this.state.filters.type}`).then(response=> response.json()).then(pet=> this.updatePetsState(pet))
    }
  }

  onAdoptPet = (pet) => {
    console.log(pet)
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
