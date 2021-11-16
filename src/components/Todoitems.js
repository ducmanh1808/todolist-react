import react, { Component} from 'react';
import './Todoitems.css';
import checkImg from '../img/success.png';
import checkCompleteImg from '../img/success-complete.png'
import crossImg from '../img/cross.png';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            editItem: this.props.item.title
        }

        this.onClickDelete = this.onClickDelete.bind(this);
        this.blurInput = this.blurInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.enterInput = this.enterInput.bind(this);
        this.toggleInput = this.toggleInput.bind(this);
    }
    onClickDelete(event) {
        this.props.deleteTask(this.props.item.title, this.props.index);
    }

    handleChange(event) {
        this.setState ({
            editItem : event.target.value
        })
    }

    toggleInput() {
        let toggle = this.state.isEdit;
        this.setState({
            isEdit : !toggle,
            editItem : this.props.item.title
        })
    }

    blurInput(event) {
        let toggle = this.state.isEdit;
        this.props.item.title = this.state.editItem;
        this.setState({
            isEdit : !toggle,   
            editItem: this.props.item.title   
        })
       
    }

    enterInput(event) {
        let toggle = this.state.isEdit;
        if(event.keyCode === 13)
        {
            this.props.item.title = this.state.editItem;
            this.setState({
                isEdit : !toggle,
            })
        }
    }

    render() {
        const { item } = this.props;
        const { isEdit } = this.state;
        let ClassName = 'TodoItem';
        let CheckUrl = checkImg;
        let CrossUrl = crossImg;
        if(item.isComplete){
            CheckUrl = checkCompleteImg;
            ClassName += ' TodoItem-Complete';
        }
        
       

        return (
            <div className={ClassName}>
                <div className="body-item">
                    { isEdit ?  (<img onClick={this.props.onClick} src={CheckUrl} style={{zIndex: 0}} />) : (<img onClick={this.props.onClick} src={CheckUrl} />) }
                   
                    {!isEdit ? (
                        <p onDoubleClick={this.toggleInput}>{item.title}</p>
                    ) : (
                        <input type="text" 
                            value={this.state.editItem} 
                            onChange={this.handleChange} 
                            autoFocus 
                            onBlur={this.blurInput} 
                            onKeyUp={this.enterInput}
                        />
                    )}  
                </div>
                { !isEdit && <div className="delete-btn">
                    <img onClick={this.onClickDelete} src={CrossUrl}/>
                </div>}
                    
            </div>           
        )
    }
}

export default TodoItem;