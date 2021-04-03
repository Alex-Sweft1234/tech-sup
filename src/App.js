import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import IndexTask from './pages/index_tasks/index_tasks.js';
import Contacts from './pages/contacts/contacts.js';
import NewTask from './pages/new_task/new_task.js';

export default class App extends Component {
  render() {
    return(
      <Router basename="/">

        <Route path="/tech-sup/" component = {IndexTask} exact />
        <Route path="/new-task/" component = {NewTask} />
        <Route path="/contacts/" component = {Contacts} />
    </Router>
    )
  }
}