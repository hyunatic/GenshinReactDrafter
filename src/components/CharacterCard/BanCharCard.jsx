import React, { Component } from 'react'
import genshindb from 'genshin-db'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import ban from '../../assets/ban.png'

class BanCharCard extends Component {
  state = {
    fullcharList: genshindb.characters('names', { matchCategories: true }),
    charDetails: {}
  }
  getCharDetails = (e) => {
    if(e.target.value === "null")
      return
    this.setState({ charDetails: genshindb.characters(e.target.value) })
  }

  render() {
    var picture = this.state.charDetails.images
    return (
      <div>
        <MDBCard color='black' style={{ width: "7rem" }}>
          <MDBCardImage className="img-fluid" src={picture ? picture.icon : ban } waves />
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
export default BanCharCard