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
      id: this.props.id,
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
    localStorage.setItem("todolist", JSON.stringify(items));
    this.setState({items});
  }

  removeToDo(id){
    let items = [...this.state.items];
    let index = items.findIndex(function(val){
      return val.id === id;
    })
    items.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(items));
    this.setState({items});
  }

  handleSubmit(item, description){
    let items = [...this.state.items];
    items.push({id: this.state.id,
                item: item,
                description: description,
                status: this.state.status
              });
    let id = this.state.id;
    id++;
    this.toggleNewForm();
    localStorage.setItem("todolist", JSON.stringify(items));
    localStorage.setItem("id", JSON.stringify(id));
    this.setState({items, id});
  }

  toggleNewForm(){
    this.setState({newForm: !this.state.newForm});
  }

  handleEdit(id, item, description){
    let items = [...this.state.items];
    let index = items.findIndex(function(val){
      return val.id === id;
    });
    items[index].item = item;
    items[index].description = description;
    localStorage.setItem("todolist", JSON.stringify(items));
    this.setState({items})
  }

  render() {
    if(this.state.items){
      var allItems = this.state.items.map((val,i) => {
        return <ListItem 
        description={val.description} 
        key={val.id} 
        item={val.item} 
        status={val.status} 
        handleRemove={this.removeToDo.bind(this, val.id)} 
        handleStatus={this.changeStatus.bind(this,val.id)}
        handleEdit={this.handleEdit.bind(this,val.id)}
        id={val.id}
        />
      })
    }
    if(this.state.newForm) var form = <NewToDoForm 
                                          handleSubmit={this.handleSubmit} 
                                          item='' 
                                          description='' 
                                          verb='New'
                                          id={this.props.id}
                                          />
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

var storage;
var id;

if(localStorage.getItem("todolist")){
  storage = JSON.parse(localStorage.getItem("todolist"));
  id = JSON.parse(localStorage.getItem("id"));
} else {
  storage = [];
  id = 1;
}

ToDoList.defaultProps = {
  list: storage,
  id: id
}

export default ToDoList;