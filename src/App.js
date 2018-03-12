import React, { Component } from 'react';
import PaginationButtons from './PaginationButtons';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    currentPage: 5,
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pagination Buttons</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <PaginationButtons
          totalPages={20}
          currentPage={this.state.currentPage}
          onSelect={pageNumber => this.setState({ currentPage: pageNumber })}
        />
      </div>
    );
  }
}

export default App;
