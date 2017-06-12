import React, { Component } from 'react';
import './ToDoList.css';
import ListItem from './ListItem';
import NewToDoForm from './NewToDoForm';

class ToDoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: this.props.list,
      status: false,
      id: 4,
      newForm: false,
    }
  this.handleSubmit = this.handleSubmit.bind(this);
  this.toggleNewForm = this.toggleNewForm.bind(this);
  }
  changeStatus(id){
    let items = [...this.state.items];
    let index = items.findIndex(function(val){
      return val.id === id;
    })
    items[index].status = !items[index].status;
    this.setState({items});
  }

  removeToDo(id){
    let items = [...this.state.items];
    let index = items.findIndex(function(val){
      return val.id === id;
    })
    items.splice(index, 1);
    this.setState({items});
  }

  handleSubmit(item, description){
    let items = [...this.state.items];
    items.push({id: this.state.items,
                item: item,
                description: description,
                status: this.state.status
              });
    let id = this.state.id;
    id++;
    this.toggleNewForm();
    this.setState({items, id});
  }

  toggleNewForm(){
    this.setState({newForm: !this.state.newForm});
  }

  render() {
    var allItems = this.state.items.map((val,i) => {
      return <ListItem 
      description={val.description} 
      key={val.id} 
      item={val.item} 
      status={val.status} 
      handleRemove={this.removeToDo.bind(this, val.id)} 
      handleStatus={this.changeStatus.bind(this,val.id)}
      />
    })
    if(this.state.newForm) var form = <NewToDoForm handleSubmit={this.handleSubmit} item='' description='' verb='New'/>
    return (
      <div>
        <h1>To do list:</h1>
        <ul>
          {allItems}
        </ul>
        <button className="newFormButton" onClick={this.toggleNewForm}>New Item</button>
        {form}
      </div>
    );
  }
}

ToDoList.defaultProps = {
  list: [
  {
    id: 0,
    item: "Sailing",
    description: "Fix boat and sail with Tim",
    status: false
  },
  {
    id: 1,
    item: "Coding",
    description: "Learn React with Matt",
    status: false
  },
  {
    id: 2,
    item: "Warriors Game",
    description: "Watch the warriors game with my brother",
    status: true
  },
  {
    id: 3,
    item: "Homework",
    description: "Get help from Julia",
    status: true
  }
  ]
}

export default ToDoList;