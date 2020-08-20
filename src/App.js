import React from 'react';
import Dashboard from './components/Dashboard/Dashboard'
import Task from './components/Task/Task'
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { allTask } from './redux/actions'


class App extends React.Component {

  componentDidMount() {
    this.allTasks();
  }


  async allTasks() {

    let url = `https://test.megapolis-it.ru/api/list`
    let response = await fetch(url, {
      "method": "GET",
    })
    let result = await response.json();
    let arr = result.data
    await this.props.allTask(arr)
  }


  render() {

  return (
    <Switch>
      <Route exact path="/" render={(props) => <Dashboard {...props}/>} />
      <Route exact path="/:id" render={(props) => <Task {...props} id={props.match.params.id} />} />
    </Switch>

  );

}
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    allTask: (payload) => dispatch(allTask(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
