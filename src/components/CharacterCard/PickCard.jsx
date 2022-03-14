import React, { Component } from 'react'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { MDBContainer, MDBRow, MDBCol, MDBAnimation, MDBBtn } from "mdbreact"
import PickCharCard from './PickCharCard';


const SortableItem = SortableElement(({ value }) => {
    return (
        <MDBCol size='1'>
           <PickCharCard item={value} />
        </MDBCol>
    )
});

const SortableList = SortableContainer(({ items }) => {
    return (
        <ul>
            <MDBRow className='mr-5' between center>
                {items.map((value, index) => (
                    <SortableItem key={`item-${value}`} index={index} value={value} />
                ))}
            </MDBRow>
        </ul>
    );
});

class PickCard extends Component {
    state = {
        items: ['Pick 1', 'Pick 2', 'Pick 3', 'Pick 4', 'Pick 5', 'Pick 6', 'Pick 7', 'Pick 8'],
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
export default PickCard