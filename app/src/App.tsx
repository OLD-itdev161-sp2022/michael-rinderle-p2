import React, { Fragment } from 'react';
import CEditor from './components/CEditor';
import Header from './components/Header';

import './App.css';

class App extends React.Component
{
  render() {
    return(
      <div className="App">
        <Header siteTitle="Online C Compiler"/>
        <CEditor />
    </div>
    )
  }
}

export default App;
