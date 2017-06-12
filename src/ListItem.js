import React, { Component } from 'react';
import './ListItem.css';
import NewToDoForm from './NewToDoForm';

class ListItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      edit: false
    }
  this.toggleEdit = this.toggleEdit.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleEdit(){
    this.setState({edit: !this.state.edit});
  }

  handleSubmit(item, description){
    this.props.handleEdit(item, description);
    this.toggleEdit();
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
                                          handleSubmit={this.handleSubmit} 
                                          item={this.props.item} 
                                          description={this.props.description}
                                          verb='Edit'
                                          id={this.props.id}
                                          />
    return (
      <li className={string}>
        <p>{this.props.item}</p>
        <p>{this.props.description}</p>
        {editForm}
        <button onClick={this.props.handleStatus}>Press to mark '{string2}'</button>
        <button onClick={this.props.handleRemove}>X</button>
        <button onClick={this.toggleEdit}>Edit item</button>
      </li>
    )
  }
}

export default ListItem;