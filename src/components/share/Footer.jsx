import React, { Component } from 'react'
import { MDBFooter } from 'mdbreact';

export default class Footer extends Component {
    /**
     * Footer 
     * @returns Footer
     */
    render() {
        return (
            <div>
                <MDBFooter className="fixed-bottom" color='indigo'>
                    <p className='footer-copyright mb-0 py-3 text-center'>
                        &copy; {new Date().getFullYear()} Copyright:
              <a href='#'> Coded by: 김현아#2808 </a>
                    </p>
                </MDBFooter>
            </div>
        )
    }
}
