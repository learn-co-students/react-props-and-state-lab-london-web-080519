import React from 'react'

import Pet from './Pet'
import { throws } from 'assert'

class PetBrowser extends React.Component {

  generatePets = () => {
    return this.props.pets.map(pet => {
      return <Pet pet={pet} onAdoptPet={this.props.onAdoptPet} key={pet.id}/>
    })
  }

  render() {
    
    return <div className="ui cards">{this.generatePets()}</div>
  }
}

export default PetBrowser
