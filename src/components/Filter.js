import React, {Component} from "react";
import { ReactDOM } from "react";
import './Filter.css'

class Filter extends Component{

    render() {
        const { todoCount, clickedItem } = this.props;
        const types = ['All', 'Active', 'Complete'];
        return (
            <footer className="filter">
                <span className="todo-count">{todoCount == 1 ? todoCount + ' item' : todoCount + ' items'} left</span>
                <ul className="filter-btn">
                  { types.map((type) => ( <li onClick={this.props.FilterClick} className={type === clickedItem ? 'btn active' : 'btn'}>{type}</li>))                 
                  }
                </ul>
                <span className="clear" onClick={this.props.clearComplete}>Clear complete</span>
              </footer>

        )
    }
}

export default Filter;
