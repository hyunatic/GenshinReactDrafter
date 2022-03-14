import React, { Component } from 'react'
import Coin from './Coin'
import head from '../../assets/head.png'
import tail from '../../assets/tail.png'

class FlipCoin extends Component {
    static defaultProps = {
        coins: [
            // Sides of the coin
            {
                side: 'head', imgSrc: head
            },
            {
                side: 'tail', imgSrc: tail
            }
        ]
    }

    constructor(props) {
        super(props)
        // Responsible to render current updated coin face
        this.state = {
            currFace: null,
            totalFlips: 0,
            heads: 0
        }
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount(){
        this.props.setClick(this.handleClick)
    }
    choice(arr) {
        const randomIdx = Math.floor(Math.random() * arr.length)
        return arr[randomIdx]
    }

    flipCoin() {
        const newFace = this.choice(this.props.coins)
        this.setState(curState => {
            const heads = curState.heads +
                (newFace.side === 'head' ? 1 : 0)
            return {
                currFace: newFace,
                totalFlips: curState.totalFlips + 1,
                heads: heads
            }
        })
    }
    handleClick() {
        this.flipCoin()
    }
    render() {
        const { currFace, totalFlips, heads } = this.state
        return (
            <div className='align-content-center'>
                {currFace && <Coin info={currFace} />}
            </div>
        )
    }
}

export default FlipCoin
