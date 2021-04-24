import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import IndexTask from './pages/index_tasks/index_tasks.js';
import Contacts from './pages/contacts/contacts.js';
import NewTask from './pages/new_task/new_task.js';
import Partners from './pages/partners/partners.js';
import Info from './pages/info/info.js';
import Auth from './pages/auth/auth.js';
import UserReg from './pages/user-reg/user-reg.js';
import Task from './pages/task/task.js';
import CssBaseline from '@material-ui/core/CssBaseline';

export default class App extends Component {
  render() {
    return(
      <div>
          <CssBaseline />

          <Router basename="/">
            <Route path="/tech-sup/" component = {IndexTask} exact />
            <Route path="/new-task/" component = {NewTask} />
            <Route path="/contacts/" component = {Contacts} />
            <Route path="/partners/" component = {Partners} />
            <Route path="/info/" component = {Info} />
            <Route path="/auth/" component = {Auth} />
            <Route path="/user-reg/" component = {UserReg} />
            <Route path="/task/:id" component = {Task} />
          </Router>
      </div>
      
    )
  }
}