import React, { Component } from 'react'
import Navbar from '../components/share/Navbar'
import Footer from '../components/share/Footer'
import { MDBContainer, MDBRow, MDBCol, MDBAnimation, MDBBtn, MDBTable, MDBTableBody, MDBTableHead, MDBInput } from "mdbreact"
import PickCard from '../components/CharacterCard/PickCard'
import BanCard from '../components/CharacterCard/BanCard'
import Stopwatch from '../components/Timing/StopWatch'

class Main extends Component {

  state = {
    team1Table: [
      { "FirstHalf": 0, "SecondHalf": 0 },
      { "FirstHalf": 0, "SecondHalf": 0 },
      { "FirstHalf": 0, "SecondHalf": 0 }
    ],
    team2Table: [
      { "FirstHalf": 0, "SecondHalf": 0 },
      { "FirstHalf": 0, "SecondHalf": 0 },
      { "FirstHalf": 0, "SecondHalf": 0 }
    ],
    team1name: "Team 1",
    team2name: "Team 2"
  }
  upTimeTable = (teamNo, time, chamber, half) => {
    if (teamNo == 1) {
      var buffer = this.state.team1Table
      buffer[chamber - 1][half] = time
      this.setState({ team1Table: buffer })
    }
    else {
      var buffer = this.state.team2Table
      buffer[chamber - 1][half] = time
      this.setState({ team2Table: buffer })
    }
  }
  formatToTime = (time) => {
    return "" + ("0" + Math.floor((time / 60000) % 60)).slice(-2) + ":" + ("0" + Math.floor((time / 1000) % 60)).slice(-2) + ":" + ("0" + ((time / 10) % 100)).slice(-2)
  }

  setTeamName = (team1, team2) => {
    this.setState({ team1name: team1, team2name: team2 })
  }

  plusTime = (teamNo,chamber,half) => {
    if (teamNo == 1) {
      var buffer = this.state.team1Table
      buffer[chamber][half] += 1000
      this.setState({ team1Table: buffer })
    }
    else {
      var buffer = this.state.team2Table
      buffer[chamber][half] += 1000
      this.setState({ team2Table: buffer })
    }
  }

  minusTime = (teamNo,chamber,half) => {
    if (teamNo == 1) {
      var buffer = this.state.team1Table
      buffer[chamber][half] -= 1000
      this.setState({ team1Table: buffer })
    }
    else {
      var buffer = this.state.team2Table
      buffer[chamber][half] -= 1000
      this.setState({ team2Table: buffer })
    }
  }

  render() {
    return (
      <div>
        <Navbar setTeam={this.setTeamName} />
        <br />
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol size="8">
              <h3 className='text-center blue-text'>{this.state.team1name} Picks</h3>
              <hr />
              <PickCard />
            </MDBCol>
            <MDBCol size="4">
              <h3 className='text-center blue-text'>{this.state.team1name} Bans</h3>
              <hr />
              <BanCard />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol size='4'>
              <MDBInput type="textarea" label={this.state.team1name + " First Half Cards"} rows="3" icon="id-card-alt" />
            </MDBCol>
            <MDBCol size='4'>
              <MDBInput type="textarea" label={this.state.team1name + " Second Half Cards"} rows="3" icon="id-card-alt" />
            </MDBCol>
            <MDBCol size='4'>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol size="8">
              <h3 className='text-center green-text'>{this.state.team2name} Picks</h3>
              <hr />
              <PickCard />
            </MDBCol>
            <MDBCol size="4">
              <h3 className='text-center green-text'>{this.state.team2name} Bans</h3>
              <hr />
              <BanCard />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol size='4'>
              <MDBInput type="textarea" label={this.state.team2name + " First Half Cards"} rows="3" icon="id-card-alt" />
            </MDBCol>
            <MDBCol size='4'>
              <MDBInput type="textarea" label={this.state.team2name + " Second Half Cards"} rows="3" icon="id-card-alt" />
            </MDBCol>
            <MDBCol size='4'>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol size="6">
              <h3 className='text-center blue-text'>{this.state.team1name} Timings</h3>
              <hr />
              <Stopwatch team={1} updateTable={this.upTimeTable} />
              <MDBTable hover small responsive>
                <MDBTableHead>
                  <tr>
                    <th>Chamber</th>
                    <th>First Half Time</th>
                    <th>Second Half Time</th>
                    <th>Total Time</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {this.state.team1Table && this.state.team1Table.map((x, i) => {
                    return (
                      <tr>
                        <td>12-{++i}</td>
                        <td><MDBBtn size="sm" onClick={() => this.minusTime(1,--i,"FirstHalf")} color="red">-</MDBBtn> {this.formatToTime(x.FirstHalf)} <MDBBtn size="sm" onClick={() => this.plusTime(1,--i,"FirstHalf")} color="blue">+</MDBBtn></td>
                        <td><MDBBtn size="sm" onClick={() => this.minusTime(1,--i,"SecondHalf")} color="red">-</MDBBtn>{this.formatToTime(x.SecondHalf)} <MDBBtn size="sm" onClick={() => this.plusTime(1,--i,"SecondHalf")} color="blue">+</MDBBtn></td>
                        <td>{this.formatToTime(x.FirstHalf + x.SecondHalf)} </td>
                      </tr>
                    )
                  })}
                  <tr>
                    <td>Total Time</td>
                    <td>{this.formatToTime(this.state.team1Table.map(x => x.FirstHalf).reduce((x, y) => x + y))}</td>
                    <td>{this.formatToTime(this.state.team1Table.map(x => x.SecondHalf).reduce((x, y) => x + y))}</td>
                    <td>{this.formatToTime(this.state.team1Table.map(x => x.SecondHalf).reduce((x, y) => x + y) + this.state.team1Table.map(x => x.FirstHalf).reduce((x, y) => x + y))}</td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </MDBCol>
            <MDBCol size="6">
              <h3 className='text-center green-text'>{this.state.team2name} Timings</h3>
              <hr />
              <Stopwatch team={2} updateTable={this.upTimeTable} />
              <MDBTable hover small responsive>
                <MDBTableHead>
                  <tr>
                    <th>Chamber</th>
                    <th>First Half Time</th>
                    <th>Second Half Time</th>
                    <th>Total Time</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {this.state.team2Table && this.state.team2Table.map((x, i) => {
                    return (
                      <tr>
                        <td>12-{++i}</td>
                        <td><MDBBtn size="sm" onClick={() => this.minusTime(2,--i,"FirstHalf")} color="red">-</MDBBtn> {this.formatToTime(x.FirstHalf)} <MDBBtn size="sm" onClick={() => this.plusTime(2,--i,"FirstHalf")} color="blue">+</MDBBtn></td>
                        <td><MDBBtn size="sm" onClick={() => this.minusTime(2,--i,"SecondHalf")} color="red">-</MDBBtn>{this.formatToTime(x.SecondHalf)} <MDBBtn size="sm" onClick={() => this.plusTime(2,--i,"SecondHalf")} color="blue">+</MDBBtn></td>
                        <td>{this.formatToTime(x.FirstHalf + x.SecondHalf)}</td>
                      </tr>
                    )
                  })}
                  <tr>
                    <td>Total Time</td>
                    <td>{this.formatToTime(this.state.team2Table.map(x => x.FirstHalf).reduce((x, y) => x + y))}</td>
                    <td>{this.formatToTime(this.state.team2Table.map(x => x.SecondHalf).reduce((x, y) => x + y))}</td>
                    <td>{this.formatToTime(this.state.team2Table.map(x => x.SecondHalf).reduce((x, y) => x + y) + this.state.team2Table.map(x => x.FirstHalf).reduce((x, y) => x + y))}</td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <br />
        <br />
        <Footer />
      </div>
    )
  }
}
export default Main