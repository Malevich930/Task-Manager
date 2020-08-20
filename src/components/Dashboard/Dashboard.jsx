import React from 'react'
import { connect } from 'react-redux'
import { addTask, deleteTask, editTask } from '../../redux/actions'
import { Link } from 'react-router-dom';
import '../Dashboard/Dashboard.css'
import Popup from "reactjs-popup";


class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      warn: false
    }
  }


  async addTask(name) {
    if (name.length > 0) {
      let response = await fetch('https://test.megapolis-it.ru/api/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset = utf-8' },
        body: JSON.stringify({ title: name })
      });
      let result = await response.json();
      let newTask = { id: result.id, title: name }
      this.props.addTask(newTask)
      this.setState({
        name: '',
        warn: false
      })
    } else {
      this.setState({
        warn: true
      })
    }
  }


  async delete(ID) {

    await fetch(`https://test.megapolis-it.ru/api/list/${ID}`, {
      method: 'DELETE',
    });
    const newArr = this.props.tasks.filter((item) => item.id !== ID)
    this.props.deleteTask(newArr)
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render() {


    return (
      <>
        <div class="page">
          <div class="wrapper">
            <div class="page-index">
              <div class="header">
                <div class="header-title">
                  <h1 class="header-title-entry">Список задач</h1></div>
                <div class="header-adding">
                  <Popup trigger={<button class="edit"> Добавить </button>} modal >
                    {close => (
                      <div class="modal">
                        <a class="close" onClick={close}>
                          &times;
                        </a>
                        <div class="main">
                          <div class="form">
                            <div class="form-group">
                              <label for="title" class="form-label text">Краткое описание</label>
                              <input type="text" class="form-input" value={this.state.name} onChange={this.handleChange} name="name" />
                              <label for="title" class="form-warn">{this.state.warn ? "Заголовок не может быть пустым." : null}</label>
                            </div>
                            <div class="form-group">
                              {this.state.name ? <a onClick={close}>
                                <button onClick={() => this.addTask(this.state.name)}>Добавить</button>
                              </a> : <button onClick={() => this.addTask(this.state.name)}>Добавить</button>
                              }

                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>
              </div>
              <div className="main">
                <div className="table">
                  {this.props.tasks.map(item => {
                    return (
                      <>
                        <div class="table-row">
                          <div class="table-cell id">{item.id}</div>
                          <div class="table-cell title">{item.title}</div>
                          <div class="table-cell action">
                            <ul class="list inline">
                              <li class="list-item">
                                <Link to={`/${item.id}`}>
                                  <button class="edit" onClick={() => this.props.editTask(item.title)}>Редактировать</button>
                                </Link>
                              </li>
                              <li class="list-item">
                                <button class="delete" onClick={() => this.delete(item.id)}>Удалить</button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </>
                    )
                  })}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (payload) => dispatch(addTask(payload)),
    deleteTask: (payload) => dispatch(deleteTask(payload)),
    editTask: (payload) => dispatch(editTask(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)