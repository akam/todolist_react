import React, { Component } from 'react';
import './NewToDoForm.css';

class NewToDoForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      item: this.props.item,
      description: this.props.description
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleChange(e){
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleFormSubmit(e){
    e.preventDefault();
    this.props.handleSubmit(this.state.item, this.state.description);
    let item = '';
    let description = '';
    this.setState({item});
    this.setState({description});
  }
  render() {
    return (
      <form>
        <h2>{this.props.verb} to do item</h2>
        <input 
        type="text" 
        name="item"
        onChange={this.handleChange}
        value={this.state.item}
        placeholder="add item"
        />
        <input 
        type="text" 
        name="description"
        onChange={this.handleChange}
        value={this.state.description}
        placeholder="add description"
        />
        <input type="submit" onClick={this.handleFormSubmit}/>
      </form>
    )
  }
}

export default NewToDoForm;