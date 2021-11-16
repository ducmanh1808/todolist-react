import './App.css';
import react, { Component} from 'react';
import TodoItem from './components/Todoitems';
import Tick from '../src/img/tick.png';
import Filter from './components/Filter'

class App extends Component {
  constructor(){
    document.title = "todolist";
    super();
    this.state = {
      newItem: '',
      TodoItems :  [],
      currentFilter: 'All'
    }
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
    this.deleteTask  = this.deleteTask.bind(this);
    this.clearComplete = this.clearComplete.bind(this);
  }

  onItemClicked(item){  
    return (event) => {
      const isComplete = item.isComplete;
      const { TodoItems } = this.state;
      const index = TodoItems.indexOf(item);
      this.setState({
        TodoItems: [ ...TodoItems.slice(0, index),
          { ...item, isComplete: !isComplete},  
        ...TodoItems.slice(index+1)]
      })
    }
  }

  onChange(event) {
    this.setState({
      newItem: event.target.value
    })

  }

  onKeyUp(event){
    if(event.keyCode === 13){
      let text = event.target.value.trim();
      if(text.length > 0 ){
        this.setState({
          newItem: '',
          TodoItems: [ { title: text, isComplete: false },...this.state.TodoItems]
        })
      }
    }
  }
  onFilterClick(event) {
      this.setState({
        currentFilter: event.target.innerHTML
      })
  }
  
  deleteTask(Task, itemidx) {
    this.setState({
      TodoItems: this.state.TodoItems.filter( (item,index) => { return (item.title !== Task || index !== itemidx)})
    })
  }

  clearComplete() {
    this.setState({
      TodoItems: this.state.TodoItems.filter( (item) => item.isComplete === false)
    })
  }

  render() {
    const {TodoItems, newItem, currentFilter} = this.state;
    const unDoTask = TodoItems.reduce((count,item) => (!item.isComplete ? count+1 : count),0)
    let filterTask = TodoItems;
    if(currentFilter === 'Active'){
      filterTask = filterTask.filter(item => item.isComplete === false)
    }
    if(currentFilter === 'Complete') {
      filterTask = filterTask.filter(item => item.isComplete === true)
    }

      return (
        <div className="App">
          <h1>todos</h1>
          <div className="todoapp">
            <div className="header">
              <img src={Tick} />
              <input value={newItem} onChange={this.onChange} onKeyUp={this.onKeyUp} placeholder="Add a new item!"/>
            </div>
            {
              TodoItems.length>0 && filterTask.map((item,index) => 
                <TodoItem key={index} item={item} index={index} onClick= {this.onItemClicked(item)} deleteTask={this.deleteTask} editTask={this.editTask}/>)
            }
            {
              TodoItems.length>0 && <Filter todoCount={unDoTask} clickedItem={currentFilter}  clearComplete={this.clearComplete} FilterClick={this.onFilterClick} />           
            }
            </div>
          <span className="guide">Double-click to edit a todo</span>
        </div>
          
      )   
  }
}

export default App;
