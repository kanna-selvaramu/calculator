import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux' ;

function mapStateToProps(state) {
  return {
    display_val: state.display_val
  };
}

class Display extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div class = "cls_skDisplayWrap">
				<div class = "cls_skDisplayScreen">{this.props.value}</div>
			</div>
		);
	}
}

class Key extends Component {
	constructor(props){
    super(props);
    this.handleInputClick = this.handleInputClick.bind(this);
  }
  handleInputClick(event) {
    this.props.onClick(event);
  }
	render() {
		const name = this.props.name;
		const val = this.props.val;
		return (
			<div class = {name} >
				<span class = "cls_skKeyVal" onClick = {this.props.onClick}>{val}</span>
			</div>
		);
	}
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleInputClick = this.handleInputClick.bind(this);
  }
  handleInputClick(event) {
    let parentClass = event.target.parentElement.className;
    if( parentClass == "cls_skNumKey")
    {
      this.props.dispatch({ type: "INPUT_NUM" , value : event.target.innerHTML});
    }
    else if(parentClass == "cls_skOpClearKey") 
    {
      this.props.dispatch({ type: "INPUT_CLEAR" });
    }
    else if(parentClass == "cls_skOpKey")
    {
      this.props.dispatch({ type: "OPERATION", value : event.target.innerHTML });
		}
		else if(parentClass == "cls_skOpEqKey")
    {
      this.props.dispatch({ type: "EQUALTO", value : event.target.innerHTML });
    }
  }
	render() {
		return(
			<div class = "cls_skCalculatorWrappper">
				<div class = "cls_skCalContainer">
					<div class = "cls_skCalcHeadWrapper">
						<Display value = {this.props.display_val}/>
					</div>
					<div class = "cls_skCalcBodyWrapper">
						<div class = "cls_skNumWrapper">
							<Key name = "cls_skNumKey" val = "9" onClick = {this.handleInputClick}/>
							<Key name = "cls_skNumKey" val = "8" onClick = {this.handleInputClick}/>
							<Key name = "cls_skNumKey" val = "7" onClick = {this.handleInputClick}/>
							<Key name = "cls_skOpKey" val = "/" onClick = {this.handleInputClick}/>
							<Key name = "cls_skNumKey" val = "6" onClick = {this.handleInputClick}/>
							<Key name = "cls_skNumKey" val = "5" onClick = {this.handleInputClick}/>
							<Key name = "cls_skNumKey" val = "4" onClick = {this.handleInputClick}/>
							<Key name = "cls_skOpKey" val = "*" onClick = {this.handleInputClick}/>
							<Key name = "cls_skNumKey" val = "3" onClick = {this.handleInputClick}/>
							<Key name = "cls_skNumKey" val = "2" onClick = {this.handleInputClick}/>
							<Key name = "cls_skNumKey" val = "1" onClick = {this.handleInputClick}/>
							<Key name = "cls_skOpKey" val = "+" onClick = {this.handleInputClick}/>
							<Key name = "cls_skNumKey" val = "0" onClick = {this.handleInputClick}/>
							<Key name = "cls_skOpClearKey" val = "C" onClick = {this.handleInputClick}/>
							<Key name = "cls_skOpKey" val = "-" onClick = {this.handleInputClick}/>
							<Key name = "cls_skOpEqKey" val = "=" onClick = {this.handleInputClick}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps)(App);