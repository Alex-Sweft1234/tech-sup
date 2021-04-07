import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import IndexTask from './pages/index_tasks/index_tasks.js';
import Contacts from './pages/contacts/contacts.js';
import NewTask from './pages/new_task/new_task.js';
import Partners from './pages/partners/partners.js';
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
            <Route path="/partners  /" component = {Partners} />
          </Router>*
      </div>
      
    )
  }
}