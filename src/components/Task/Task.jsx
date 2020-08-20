import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { addEditTask, deleteTask } from '../../redux/actions'
import '../Task/Task.css'

class Task extends React.Component {
  constructor(props) {
    super(props)


    this.state = {
      name: this.props.taskEdit,
      edit: false
    }
  }

  async editTask(name) {

    await fetch(`https://test.megapolis-it.ru/api/list/${this.props.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
      body: JSON.stringify({ title: name })
    });
    const editName = name
    const editId = Number(this.props.id)
    let newTasks = this.props.tasks.map(item => {
      if (item.id === editId) {
        item.title = editName;
      } return item
    })
    await this.props.addEditTask(newTasks)
  }

  async delete() {

    await fetch(`https://test.megapolis-it.ru/api/list/${this.props.id}`, {
      method: 'DELETE',
    });
    const ID = Number(this.props.id)
    const newArr = this.props.tasks.filter((item) => item.id !== ID)
    this.props.deleteTask(newArr)
    
  }


  handleChange = (event) => {
    if (event.target.value !== this.props.taskEdit) {
      this.setState({
        [event.target.name]: event.target.value,
        edit: true
      })
    }
    else {
      this.setState({
        [event.target.name]: event.target.value,
        edit: false
      })
    }
  }


  render() {

    return (
      <>
        <div class="page">
          <div class="wrapper">
            <div class="page-index">
              <div class="header">
                <div class="header-title">
                  <h1 class="header-title-entry">Задача №{this.props.id}</h1>
                </div>
                <div class="header-adding">
                <Link to="/"><button class="delete" onClick={() => this.delete()}>Удалить</button></Link>
                </div>
              </div>
              <div class="main">
                <div class="form">
                  <div class="form-group">
                    <label for="title" class="form-label text">Краткое описание</label>
                    <input type="text" class="form-input text" value={this.state.name} onChange={this.handleChange} name="name" />
                    <div class="form-notify"></div>
                  </div>
                  <div class="form-group">
                    {this.state.edit ? (<Link to="/"><button class="save" onClick={() => this.editTask(this.state.name)}>Сохранить</button></Link>) :
                      <Link to="/"><button class="back" >Вернуться назад</button></Link>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    taskEdit: state.taskEdit
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addEditTask: (payload) => dispatch(addEditTask(payload)),
    deleteTask: (payload) => dispatch(deleteTask(payload))
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)