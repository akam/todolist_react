import React, { Component } from 'react';
import './ListItem.css';
import NewToDoForm from './NewToDoForm';

class ListItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      item: this.props.item,
      description: this.props.description,
      edit: false
    }
  this.toggleEdit = this.toggleEdit.bind(this);
  this.handleEdit = this.handleEdit.bind(this);
  }

  toggleEdit(){
    var edit = this.state.edit;
    edit = !edit;
    this.setState({edit});
  }
  handleEdit(item, description){
    this.toggleEdit();
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
                                          description={this.state.description}/>
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