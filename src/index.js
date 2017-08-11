import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



//-----------------------------------------------------------//
const DownButton = props => {
  return (
    <button onClick={props.onClick} className="inline-elements float-left">
      <i className="material-icons">keyboard_arrow_down</i>
    </button>
  );
};

const StatusButton = props => {
  return <button className="inline-elements float-left">Set</button>;
};

const UpButton = props => {
  return (
    <button onClick={props.onClick} className="inline-elements float-left">
      <i className="material-icons">keyboard_arrow_up</i>
    </button>
  );
};

class TimerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 4 };
    this.incrementTimer = this.incrementTimer.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
  }

  //Function to increment timer
  incrementTimer() {
    console.log(this.state.time);
    this.setState((prevState, props) => {
      return { time: prevState.time + 1 };
    });


  }
  decrementTimer() {
    if(this.state.time > 0){
      this.setState((prevState, props) => {
      return { time: prevState.time - 1 };
      
    });
    }
    
  }

  render() {
    return (
      <div id="timer-form">
        <UpButton onClick={this.incrementTimer} />
        <h3 className="float-left align-middle">{this.state.time} minutes </h3>
        <DownButton onClick={this.decrementTimer} />
        <StatusButton />

      </div>
    );
  }
}

//--------------------------------------------------------//
//ToDo
/*
1. Create states
    i. isActive
    ii.isfinished
2. Create classes for the button and clock-face to turn green/red while running/stopped

*/
class ClockFace extends React.Component{
     constructor(props){
    super(props);
    this.state = {isActive:false,
                  isFinished:false,
                  time_min:4,
                  time_sec:this.pad(0)
                 }
    this.countdownTimer = this.countdownTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    
    }
    pad(n){
        if(n<10){
            return '0'+n;
        }
        return n;
    }
    
    countdownTimer(){
        
        this.setState({
            isActive:true
        })
        
//        setInterval(function(){
//            console.
//        },1000)
    }
    
    stopTimer(){
        this.setState({
            isActive:false
        })
    }
    

    
    
  render()
    {
        let isActive = this.state.isActive;
        let active_button =<button className = "btn btn-success btn-lg" onClick={this.countdownTimer}>Start</button>;
        if(isActive){
            active_button = <button className = "btn btn-danger btn-lg" onClick={this.stopTimer}>Stop</button>;
            
        }
        

    return(
      <div id = "clock-whole">
        <div className = "inside-clock">
          <h1>{this.state.time_min + ":"+this.state.time_sec}</h1>
            {active_button}
          
          <button className = "btn btn-success btn-lg">Reset</button>
         
        </div>
      </div>
    )
  }
}




class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Pomodoro Clock</h1>
        <br />
        <TimerForm />
        <ClockFace time={4} />

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
