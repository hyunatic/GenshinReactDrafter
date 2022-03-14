import React, { Component } from 'react'
import genshindb from 'genshin-db'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import pick from '../../assets/pick.png'

class PickCharCard extends Component {
  state = {
    fullcharList: genshindb.characters('names', { matchCategories: true }),
    charDetails: {}
  }
  getCharDetails = (e) => {
    if(e.target.value === "null")
      return
    this.setState({ charDetails: genshindb.characters(e.target.value) })
  }
  picClick = () => {
    alert("it work")
  }

  render() {
    var picture = this.state.charDetails.images
    return (
      <div>
        <MDBCard color='cyan' style={{ width: "7rem" }}>
          <MDBCardImage className="img-fluid" src={picture ? picture.icon : pick} waves />
          <MDBCardBody>
            <MDBCardText>
              <select onChange={this.getCharDetails} className="browser-default custom-select">
                <option selected value="null">Select</option>
                {this.state.fullcharList && this.state.fullcharList.map(x => <option value={x}>{x}</option>)}
              </select>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </div>
    )
  }
}
export default PickCharCard