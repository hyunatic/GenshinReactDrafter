import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBAnimation, MDBBtn, MDBContainer } from "mdbreact"
import diano from '../../assets/diano.gif'

const Stopwatch = ({ team, updateTable }) => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [chamber, setChamber] = useState(1)
    const [half, setHalf] = useState("FirstHalf")

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);
    function submitTime() {
        updateTable(team, time, chamber, half)
    }

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol size="4">
                    <div className="stopwatch text-center">
                        { running ? <span className="font-weight-bold"><img src={diano} height="30" width="30" /></span> : <React.Fragment></React.Fragment>}
                        <span className="font-weight-bold">{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                        <span className="font-weight-bold">{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                        <span className="font-weight-bold">{("0" + ((time / 10) % 100)).slice(-2)}</span>
                        { running ? <span className="font-weight-bold"><img src={diano} height="30" width="30" /></span> : <React.Fragment></React.Fragment>}
                        <div className="buttons">
                            <MDBBtn size="sm" color={!running ? "green" : "red"} onClick={() => setRunning(!running)}>{!running ? "Start" : "Stop"}</MDBBtn>
                            <MDBBtn size="sm" color="orange" onClick={() => setTime(0)}>Reset</MDBBtn>
                        </div>

                    </div>
                </MDBCol>
                <MDBCol size="8">
                    <MDBRow>
                        <h3>Set timing on:</h3>
                        <MDBCol>
                            <select onChange={(e) => setChamber(e.target.value)} className="browser-default custom-select">
                                <option selected value="1">Chamber 1</option>
                                <option value="2">Chamber 2</option>
                                <option value="3">Chamber 3</option>
                            </select>
                        </MDBCol>
                        <MDBCol>
                            <select onChange={(e) => setHalf(e.target.value)} className="browser-default custom-select">
                                <option selected value="FirstHalf">First Half</option>
                                <option value="SecondHalf">Second Half</option>
                            </select>
                        </MDBCol>
                        <MDBBtn size="sm" color="blue" onClick={submitTime}>Submit</MDBBtn>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </MDBContainer >
    );
};

export default Stopwatch;