import React, { Component } from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBDropdownItem, MDBContainer } from 'mdbreact';
import hyuna from '../../assets/hyuna.jpeg';
import { MDBRow, MDBCol, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCard, MDBListGroup, MDBListGroupItem, MDBInput } from 'mdbreact';
import FlipCoin from '../CoinFlip/FlipCoin';

class Navbar extends Component {

    state = {
        collapseID: '',
        username: localStorage.getItem("name"),
        modal: false,
        modal1: false,
        modal2: false,
        team1name: "",
        team2name: "",
    };
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    toggle1 = () => {
        this.setState({
            modal1: !this.state.modal1
        });
    }
    toggle2 = () => {
        this.setState({
            modal2: !this.state.modal2
        });
    }
    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ''
        }));

    closeCollapse = collID => () => {
        const { collapseID } = this.state;
        window.scrollTo(0, 0);
        collapseID === collID && this.setState({ collapseID: '' });
    };
    updateTeamName = () => {
        this.props.setTeam("Team " + this.state.team1name, "Team " + this.state.team2name)
    }
    coinToss = () => {
        this.setState({ nader: "" }, () => {
            if (Math.random() < 0.5) {
                this.setState({ result: "heads" });
                console.log("heads");
            } else {
                this.setState({ result: "tails" });
                console.log("tails");
            }
        });
    }

    render() {
        const { collapseID } = this.state;
        const overlay = (
            <div
                id='sidenav-overlay'
                style={{ backgroundColor: 'blue' }}
                onClick={this.toggleCollapse('mainNavbarCollapse')}
            />
        );
        return (
            <div>
                <MDBNavbar color='indigo' dark expand='md' fixed='top' scrolling>
                    <MDBNavbarBrand href='/home' className='py-0 font-weight-bold'>
                        <img src={hyuna} height="50" alt="50" className="rounded-circle" />
                        <strong className='align-middle'>Genshin Abyss Draft</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        onClick={this.toggleCollapse('mainNavbarCollapse')}
                    />
                    <MDBCollapse id='mainNavbarCollapse' isOpen={collapseID} navbar>
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBNavLink
                                    disabled
                                    exact
                                    to='#'
                                    onClick={this.closeCollapse('mainNavbarCollapse')}
                                >
                                    <strong>Print Page</strong>
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem onClick={this.toggle2}>
                                <MDBNavLink
                                    exact
                                    to='#'
                                    onClick={this.closeCollapse('mainNavbarCollapse')}
                                >
                                    <strong>Coin Flip</strong>
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem onClick={this.toggle1}>
                                <MDBNavLink
                                    exact
                                    to='#'
                                    onClick={this.closeCollapse('mainNavbarCollapse')}
                                >
                                    <strong>Team Settings</strong>
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem onClick={this.toggle}>
                                <MDBNavLink
                                    exact
                                    to='#'
                                    onClick={this.closeCollapse('mainNavbarCollapse')}
                                >
                                    <strong>Draft Cycle Info</strong>
                                </MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>


                <MDBModal isOpen={this.state.modal1} toggle={this.toggle1}>
                    <MDBModalHeader toggle={this.toggle1}>Change Team Name</MDBModalHeader>
                    <MDBModalBody>
                        <MDBInput onChange={this.handleChange} id="team1name" value={this.state.team1name} label="Team 1 Name" icon="users" />
                        <MDBInput onChange={this.handleChange} id="team2name" value={this.state.team2name} label="Team 2 Name" icon="users" />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn onClick={this.updateTeamName} color="orange">Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                <MDBModal isOpen={this.state.modal2} toggle={this.toggle2}>
                    <MDBModalHeader toggle={this.toggle2}>Coin Flip</MDBModalHeader>
                    <MDBModalBody>
                        <FlipCoin setClick={click => this.clickChild = click} />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="blue" onClick={() => this.clickChild()}>Flip Coin</MDBBtn>
                        <MDBBtn color="secondary" onClick={this.toggle2}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>


                <MDBModal isOpen={this.state.modal} toggle={this.toggle1} size="lg" centered>
                    <MDBModalHeader toggle={this.toggle}>Draft Cycle</MDBModalHeader>
                    <MDBModalBody>
                        <MDBRow>
                            <MDBCol>
                                <h5>First Half Ban / Pick Phase</h5>
                                <MDBListGroup>
                                    <MDBListGroupItem className='blue-text font-weight-bolder'>Team 1 Ban</MDBListGroupItem>
                                    <MDBListGroupItem className='green-text font-weight-bolder'>Team 2 Ban</MDBListGroupItem>
                                    <MDBListGroupItem className='blue-text font-weight-bolder'>Team 1 Ban</MDBListGroupItem>
                                    <MDBListGroupItem className='green-text font-weight-bolder'>Team 2 Ban</MDBListGroupItem>
                                    <MDBListGroupItem className='blue-text font-weight-bolder'>Team 1 Pick</MDBListGroupItem>
                                    <MDBListGroupItem className='green-text font-weight-bolder'>Team 2 Pick</MDBListGroupItem>
                                    <MDBListGroupItem className='green-text font-weight-bolder'>Team 2 Pick</MDBListGroupItem>
                                    <MDBListGroupItem className='blue-text font-weight-bolder'>Team 1 Pick</MDBListGroupItem>
                                    <MDBListGroupItem className='blue-text font-weight-bolder'>Team 1 Pick</MDBListGroupItem>
                                    <MDBListGroupItem className='green-text font-weight-bolder'>Team 2 Pick</MDBListGroupItem>
                                    <MDBListGroupItem className='green-text font-weight-bolder'>Team 2 Pick</MDBListGroupItem>
                                    <MDBListGroupItem className='blue-text font-weight-bolder'>Team 1 Pick</MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCol>
                            <MDBCol>
                                <h5>Second Half Ban / Pick Phase</h5>
                                <MDBListGroup>
                                    <MDBListGroupItem className='green-text font-weight-bolder'>Team 2 Ban</MDBListGroupItem>
                                    <MDBListGroupItem className='blue-text font-weight-bolder'>Team 1 Ban</MDBListGroupItem>
                                    <MDBListGroupItem className='green-text font-weight-bolder'>Team 2 Ban</MDBListGroupItem>
                                    <MDBListGroupItem className='blue-text font-weight-bolder'>Team 1 Ban</MDBListGroupItem>
                                    <MDBListGroupItem className='green-text font-weight-bolder'>Team 2 Pick</MDBListGroupItem>
                                    <MDBListGroupItem className='blue-text font-weight-bolder'>Team 1 Pick</MDBListGroupItem>
                                    <MDBListGroupItem className='blue-text font-weight-bolder'>Team 1 Pick</MDBListGroupItem>
                                    <MDBListGroupItem className='green-text font-weight-bolder'>Team 2 Pick</MDBListGroupItem>
                                    <MDBListGroupItem className='green-text font-weight-bolder'>Team 2 Pick</MDBListGroupItem>
                                    <MDBListGroupItem className='blue-text font-weight-bolder'>Team 1 Pick</MDBListGroupItem>
                                    <MDBListGroupItem className='blue-text font-weight-bolder'>Team 1 Pick</MDBListGroupItem>
                                    <MDBListGroupItem className='green-text font-weight-bolder'>Team 2 Pick</MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCol>
                        </MDBRow>
                        <br />
                        <p className='text-left red-text font-weight-bold'>*Assume team 1 get first ban pick</p>
                    </MDBModalBody>
                    <MDBModalFooter>

                        <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </div>
        )

    }
}
export default Navbar