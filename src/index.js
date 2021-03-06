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
  return <button onClick = {props.onClick} className="inline-elements float-left">Set</button>;
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
    this.passState = this.passState.bind(this);
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
    passState(){
        this.props.handleState(this.state.time);
        
    }

  render() {
    return (
      <div id="timer-form">
        <UpButton onClick={this.incrementTimer} />
        <h3 className="float-left align-middle">{this.state.time} minutes </h3>
        <DownButton onClick={this.decrementTimer} />
        <StatusButton onClick={this.passState} />

      </div>
    );
  }
}

//--------------------------------------------------------//



class ClockFace extends React.Component{
     constructor(props){
    super(props);
    this.state = {isActive:false,
                  isStopped:false,
                  time_min:4,           
                  time_sec:0
                 }
    this.countdownTimer = this.countdownTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.tick = this.tick.bind(this);
    this.resetTime = this.resetTime.bind(this);
    
    }
    
    //Pretty useless function to pad an extra zero
    pad(n){
        if(n<10){
            return '0'+n;
        }
        return n;
    }
    componentWillReceiveProps(){
        this.setState({time_min:this.props.time,
                       time_sec:0})
        this.stopTimer();
        this.setState({isStopped:false});
    }
    
    
    //Start the countdown clock
    countdownTimer(){
        
        this.setState({
            isActive:true,
            isStopped:false
        })
        this.countdown = setInterval(this.tick,1000);

    }
    
    //Stop Countdown clock
    stopTimer(){
        this.setState({
            isActive:false,
            isStopped:true
        })
        clearInterval(this.countdown);
    }
    
    tick(){
        
        //Handle minute decrement
        if(parseInt(this.state.time_sec)===0){
            
            //Handle timeout
            if(parseInt(this.state.time_min) ===0){
                clearInterval(this.countdown);
                
            }
            
            this.setState((prevState)=>{
                return{time_min:prevState.time_min -1,
                       time_sec:59}
            })
        }
        //Handle Second decrement
        else{
            
            this.setState((prevState) => {
                return {time_sec:parseInt(prevState.time_sec)-1}
            });
        }
       
        
    }
    resetTime(){
        this.setState({time_min:this.props.time,
                       time_sec:0})
        this.stopTimer();
        this.setState({isStopped:false});
    }
    

    
    
  render()
    
    {
        let isActive = this.state.isActive;
        let isStopped = this.state.isStopped;
        let active_button =<button className = "btn btn-success btn-lg" onClick={this.countdownTimer}>Start</button>;
        var clock_classes = "clock-whole"
        if(isActive){
            active_button = <button className = "btn btn-danger btn-lg" onClick={this.stopTimer}>Stop</button>;
            clock_classes +=" isActive";
            
        }
        if(isStopped){
            clock_classes+=" isStopped"
        }
        
        let time_sec = this.state.time_sec;
        if(this.state.time_sec<10){
            time_sec = this.pad(time_sec)
        }
        

    return(
      <div className = {clock_classes}>
        <div className = "inside-clock">
          <h1>{this.state.time_min + ":"+time_sec}</h1>
            {active_button}
          <button className = "btn btn-success btn-lg" onClick={this.resetTime}>Reset</button>
         
        </div>
      </div>
    )
  }
}




class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {time_min:4};
        this.handleState = this.handleState.bind(this);
    }
    handleState(s){
        this.setState({time_min:s});
        
    }
  render() {
    return (
      <div>
        <h1>Pomodoro Clock</h1>
        <br />
        <TimerForm handleState = {this.handleState}/>
        <ClockFace time={this.state.time_min} />

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
