import React, { Component } from 'react';
import './ListItem.css';
import NewToDoForm from './NewToDoForm';

class ListItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      item: this.props.item,
      description: this.props.description,
      edit: false
    }
  this.toggleEdit = this.toggleEdit.bind(this);
  this.handleEdit = this.handleEdit.bind(this);
  }

  toggleEdit(){
    this.setState({edit: !this.state.edit});
  }
  handleEdit(item, description){
    this.toggleEdit();
    this.props.handleEditStorage(this.props.id, item, description);
    this.setState({item, description});
  }

  render() {
    var string = '';
    var string2 = '';
    if(this.props.status){
      string = 'complete';
      string2 = 'incomplete';
    } else {
      string = 'incomplete';
      string2 = 'complete';
    }
    if(this.state.edit) var editForm = <NewToDoForm 
                                          handleSubmit={this.handleEdit} 
                                          item={this.state.item} 
                                          description={this.state.description}
                                          verb='Edit'
                                          />
    return (
      <li className={string}>
        <p>{this.state.item}</p>
        <p>{this.state.description}</p>
        {editForm}
        <button onClick={this.props.handleStatus}>Press to mark '{string2}'</button>
        <button onClick={this.props.handleRemove}>X</button>
        <button onClick={this.toggleEdit}>Edit item</button>
      </li>
    )
  }
}

export default ListItem;