import React, { Component } from 'react'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { MDBContainer, MDBRow, MDBCol, MDBAnimation, MDBBtn } from "mdbreact"
import BanCharCard from './BanCharCard';


const SortableItem = SortableElement(({ value }) => {
    return (
        <MDBCol size='3'>
           <BanCharCard item={value} />
        </MDBCol>
    )
});

const SortableList = SortableContainer(({ items }) => {
    return (
        <ul>
            <MDBRow className='mr-5' around center>
                {items.map((value, index) => (
                    <SortableItem key={`item-${value}`} index={index} value={value} />
                ))}
            </MDBRow>
        </ul>
    );
});

class BanCard extends Component {
    state = {
        items: ['Ban 1', 'Ban 2', 'Ban 3', 'Ban 4'],
    };
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };

    render() {
        return (
            <div>
                <SortableList items={this.state.items} onSortEnd={this.onSortEnd} axis="xy" />
            </div>
        )
    }
}
export default BanCard