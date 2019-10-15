import React from "react";

class Pet extends React.Component {
  getGender = () => {
    if (this.props.pet.gender === "male") {
      return "♂";
    }
    if (this.props.pet.gender === "female") {
      return "♀";
    }
  };

  render() {
    const { id, name, type, age, weight, isAdopted } = this.props.pet;
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {this.getGender()}
            {name}
          </a>
          <div className="meta">
            <span className="date">{type}</span>
          </div>
          <div className="description">
            <p>Age: {age}</p>
            <p>Weight: {weight}</p>
          </div>
        </div>
        <div className="extra content">
          {isAdopted ? (
            <button className="ui disabled button">Already adopted</button>
          ) : null}
          {isAdopted ? null : (
            <button
              className="ui primary button"
              onClick={() => this.props.onAdoptPet(id)}
            >
              Adopt pet
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Pet;
