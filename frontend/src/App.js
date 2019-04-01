import React, { Component } from 'react';
import Grid from './components/grid';

import { ButtonToolbar, Dropdown, DropdownButton } from 'react-bootstrap';

import "./style/style.css";



const arrayClone = (grid) => {
  return JSON.parse(JSON.stringify(grid));
}


class Buttons extends React.Component {

  handleSelect = (evt) => {
    this.props.gridSize(evt);
  }

  render() {
    return (
      <div className="center">
        <ButtonToolbar>
          <button className="btn btn-default" onClick={this.props.playButton}>Spustit</button>
          <button className="btn btn-default" onClick={this.props.pauseButton}>Zastavit</button>
          <button className="btn btn-default" onClick={this.props.clear}>Resetovat</button>
          <button className="btn btn-default" onClick={this.props.slow}>Zpomalit</button>
          <button className="btn btn-default" onClick={this.props.fast}>Zrychlit</button>
          <button className="btn btn-default" onClick={this.props.seed}>Vygenerovat</button>
          <DropdownButton className="btn" title="Velikost tabulky" id="dropdown-basic-button" onSelect={this.handleSelect}>
            <Dropdown.Item className="btn" eventKey="1">20x10</Dropdown.Item>
            <Dropdown.Item className="btn" eventKey="4">40x40</Dropdown.Item>
            <Dropdown.Item className="btn" eventKey="2">50x30</Dropdown.Item>
            <Dropdown.Item className="btn" eventKey="3">70x50</Dropdown.Item>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      grid: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.grid);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      grid: gridCopy
    });
  }

  seed = () => {
    let gridCopy = arrayClone(this.state.grid);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 5) === 1) {
          gridCopy[i][j] = true;
          this.clear();
          this.setState({
            grid: gridCopy
          });
        }
      }
    }
  }

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  }

  pauseButton = () => {
    clearInterval(this.intervalId);
  }

  play = () => {
    let g = this.state.grid;
    let g2 = arrayClone(this.state.grid);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({
      grid: g2,
      generation: this.state.generation + 1
    });
  }

  slow = () => {
    this.speed = 1000;
    this.playButton();
  }

  fast = () => {
    this.speed = 100;
    this.playButton();
  }

  clear = () => {
    var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    clearInterval(this.intervalId);

    this.speed = 100;

    this.setState({
      grid: grid,
      generation: 0
    });
  }

  gridSize = (size) => {
    switch (size) {
      case "1":
        this.cols = 20;
        this.rows = 10;
        break;
      case "2":
        this.cols = 50;
        this.rows = 30;
        break;
      case "3":
        this.cols = 70;
        this.rows = 50;
        break;
      default:
        this.cols = 40;
        this.rows = 40;
    }
    this.clear();
  }

  render() {

    
    

    return (
      <div className="App">
        <h1>Game of life</h1>
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
        />
        <Grid
          grid={this.state.grid}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
          className={this.speed > 100 ? "grid-slow" : "grid"}
        />
        <h2>Generace: {this.state.generation}</h2>
      </div>
    );
  }
}

export default App;
