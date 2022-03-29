import React, { Fragment } from 'react';
import Header from './components/Header';
import GoalManager from './components/GoalManager';
import './App.css';
import './Form.css';
import './Table.css'

class App extends React.Component
{
  render() {
    return(
      <div className="App">
        <Header siteTitle="Online Personal Goal Manager"/>
        <GoalManager /> 
    </div>
    )
  }
}

export default App;
