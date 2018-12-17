import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

// DO NOT MODIFY THIS FILE FOR BASE MODE!

class AnimalListItem extends Component {
    // Renders the list of animals
    handleClick = () => {
      this.props.dispatch({ type: 'REMOVE_ANIMAL', payload: this.props.classData.id })
    }

    render() {
        return (
            <tr>
                <td>{this.props.classData.species_name}</td>
                <td>{this.props.classData.class_name}</td>
                <td>
                  <Button size="small" color="secondary" onClick={this.handleClick}>
                    Transfer
                  </Button>
                </td>
            </tr>
        );
    }
}

export default connect()(AnimalListItem);
