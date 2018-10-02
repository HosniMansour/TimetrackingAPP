import React, { Component } from 'react';
import {CreateTasks} from "../actions/taskActions";
import {connect} from "react-redux";

class CurrentTracker extends Component {

    constructor(props){
        super(props);
        this.state = {
            name:"",
            desc:"",
            seconds: '00',
            minutes: '00',
            hours: '00',
            startedDate:null,
            newTracker: false,
            paused: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.startCountUp = this.startCountUp.bind(this);
        this.tick = this.tick.bind(this);

        this.initTime();
    }

    initTime(){
        this.secondsUp = 0;
        this.minutesUp = 0;
        this.hoursUp = 0;
    }

    componentDidMount() {
        this.startCountUp();
    }

    // Change || Submit

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        //this.FinishCountUp(e);

        let CTime = ((parseFloat(this.state.hours)*60)*60)+(parseFloat(this.state.minutes)*60)+parseFloat(this.state.seconds);
        let date = new Date();
        let name = (this.state.name==="")?("Task " + date.getFullYear()+"/"+date.getMonth()+"/"+date.getDay()):(this.state.name);
        let obj = {
            name:name,
            desc:this.state.desc,
            startedDate:this.state.startedDate,
            endDate:new Date(),
            duration:CTime,
        };
        console.log(obj);
        this.props.CreateTasks(obj);
        // init tracker
        this.CancelCountUp(e);
        // I need to figure how to update the state of an other component from a different component
        //window.location.reload();
    }

    // Timer function
    tick() {
        let hrs = this.hoursUp;
        let min = this.minutesUp;
        let sec = this.secondsUp;

        if(sec===60){
            sec=0;
            this.secondsUp=0;
            min++;
            this.minutesUp++;
        }

        if(min===60){
            min=0;
            this.minutesUp=0;
            hrs++;
            this.hoursUp++;
        }

        this.setState({
            hours: hrs,
            minutes: min,
            seconds: sec,
        });

        if (sec < 10) {
            this.setState({
                seconds: "0" + this.state.seconds,
            })
        }
        if (min < 10) {
            this.setState({
                minutes: "0" + min,
            })
        }
        if (hrs < 10) {
            this.setState({
                hours: "0" + hrs,
            })
        }
        if(!this.state.paused){
            this.secondsUp++;
        }
    }

    newCountUp(e){
        e.preventDefault();
        this.setState({
            newTracker:true
        });
    }

    // (Start / Resume / Pause / Finish / Cancel) Counter

    startCountUp() {
        this.intervalHandle = setInterval(this.tick, 1000);
        this.setState({
            startedDate:new Date(),
        });
    }

    ResumeCountUp(e) {
        e.preventDefault();
        this.setState({
            paused: false,
        });
    }

    PauseCountUp(e) {
        e.preventDefault();
        this.setState({
            paused: true,
        });
        // The tracker could be saved in the database here and be updated later when the user finish the task,
        // The update method API already exist /api/:id (update)
    }

    FinishCountUp(e) {
        e.preventDefault();
        // Debug Time
        let time = ((parseFloat(this.state.hours)*60)*60)+(parseFloat(this.state.minutes)*60)+parseFloat(this.state.seconds);
        console.log(time);
    }

    CancelCountUp(e) {
        e.preventDefault();
        this.setState({
            name:"",
            desc:"",
            startedDate:null,
            endDate:null,
            seconds: '00',
            minutes: '00',
            hours: '00',
            paused: false,
            newTracker:false
        });
        this.initTime();
    }

    render() {
        return (
            <div className="container">
                <div className={this.state.newTracker ? 'hidden' : ''}>
                    <div className="alert alert-info" role="alert">
                        <p className="card-text">
                            You have been in this page for <strong>{this.state.hours}:{this.state.minutes}:{this.state.seconds}</strong>, did you start a task and forgot to start the tracker ! Don't worry <strong><a onClick={(e) => this.newCountUp(e)}>Click Here</a></strong>.
                        </p>
                    </div>
                </div>
                <div className={this.state.newTracker ? '' : 'hidden'}>
                    <div className="card alert alert-info">
                        <h5 className="card-header">My current Task !</h5>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div>
                                    <label>Want to give a name to your task ?</label>
                                    <input type="text" name="name" value={this.state.name}  onChange={this.onChange} className="form-control" placeholder="Task YYYY/MM/DD" />
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-6">
                                        <label>Description :</label>
                                        <textarea name="desc" value={this.state.desc} onChange={this.onChange} rows="5" className="form-control"></textarea>
                                    </div>
                                    <div className="col-6 text-center">
                                        <br/>
                                        <h2>{this.state.hours}:{this.state.minutes}:{this.state.seconds}</h2>
                                        <br/>

                                        <div className="row">
                                            <div className="col-2"></div>
                                            <div className="col-3">
                                                <div className={this.state.paused ? 'hidden' : ''}>
                                                    <button onClick={(e) => this.PauseCountUp(e)} className="btn btn-primary"> <i className="fas fa-pause"></i> Pause</button>
                                                </div>
                                                <div className={this.state.paused ? '' : 'hidden'}>
                                                    <button onClick={(e) => this.ResumeCountUp(e)} className="btn btn-warning"> <i className="fas fa-play"></i> Resume</button>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <button onClick={(e) => this.CancelCountUp(e)} className="btn btn-dark"> <i className="fas fa-ban"></i> Cancel Task</button>
                                            </div>
                                            <div className="col-3">
                                                <button type="submit" className="btn btn-info"> <i className="fas fa-check"></i> Finish Task</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.tsk.error,
        loading:state.tsk.loading,
        msj:state.tsk.msj
    };
};

export default connect(mapStateToProps,{CreateTasks}) (CurrentTracker);
