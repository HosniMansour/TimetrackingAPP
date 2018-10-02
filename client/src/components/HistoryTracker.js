import React, { Component } from 'react';
import { GetTasks,DeleteTasks,SearchTasks } from "../actions/taskActions";
import {connect} from "react-redux";

class TasksList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            added:false
        }
    }

    deleteTask(e,id){
        e.preventDefault();
        this.props.passedFunction(id);
    }

    render(){
        return(
            <div className="row">
                {
                    this.props.data.map(function(a) {
                        // Date + Time Format
                        let sdate = new Date(a.startDate);
                        let startD = sdate.getFullYear()+"/"+sdate.getMonth()+"/"+sdate.getDay()+" - "+("0" + sdate.getHours()).slice(-2)+":"+("0" + sdate.getMinutes()).slice(-2);
                        let edate = new Date(a.endDate);
                        let endD = edate.getFullYear()+"/"+edate.getMonth()+"/"+edate.getDay()+" - "+("0" + edate.getHours()).slice(-2)+":"+("0" + edate.getMinutes()).slice(-2);
                        // Calculate Time
                        let hh   = Math.floor(a.duration / 3600);
                        let mm = Math.floor((a.duration - (hh * 3600)) / 60);
                        let ss = a.duration - (hh * 3600) - (mm * 60);
                        let durationf = ("0" + hh).slice(-2)+":"+("0" + mm).slice(-2)+":"+("0" + ss).slice(-2);
                        return (
                            <div key={a._id} className="col-md-4">
                                <div className="card mb-4 box-shadow">
                                    <div className="card-header">
                                        <h4 className="my-0 font-weight-normal">{a.name}</h4>
                                    </div>
                                    <div className="card-body">
                                        <p>
                                            {a.desc}
                                        </p>
                                        <hr/>
                                        <strong>Started : </strong> {startD}<br/>
                                        <strong>Finished : </strong> {endD}<br/>
                                        <strong>Spent : </strong> {durationf}<br/>
                                        <button onClick={(e) => this.deleteTask(e,a._id)} className="btn btn-danger float-right"><i className="fas fa-trash-alt"></i> </button>
                                    </div>
                                </div>
                            </div>
                        );
                    },this)
                }
            </div>
        );
    }
}

class HistoryTracker extends Component {

    constructor(props){
        super(props);
        this.state = {
            nbr:0,
            tasks:null,
            page:1,
            querry:""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.GetTasks(this.state.page);
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.loading){
            if(nextProps.tasks!=null){
                if(nextProps.tasks.nbr!==0){
                    this.setState({
                        nbr:nextProps.tasks.nbr,
                    });
                }
                this.setState({
                    tasks:nextProps.tasks.tasks
                });
            }
        }
    }

    passedFunction = (id) => {
        this.props.DeleteTasks(id);
        this.props.GetTasks(this.state.page);
        if(this.props.tasks!=null){
            this.setState({
                tasks:this.props.tasks.tasks
            });
            // Not Sure why I need to call this twice to get an instant update
            this.props.GetTasks(this.state.page);
            this.setState({
                tasks:this.props.tasks.tasks
            });
        }
    };

    tasksfn() {
        if(this.state.tasks!=null){
            return (
                <TasksList passedFunction={this.passedFunction} data={this.state.tasks}/>
            );
        }
    }

    changePage(e,p){
        e.preventDefault();
        this.setState({
            page:p,
        });
        this.props.GetTasks(p);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        if(this.state.querry!==""){
            this.props.SearchTasks(this.state.querry,1);
            this.setState({
                page:1,
            });
        }
    }

    reset(e){
        e.preventDefault();
        if(this.props.tasks!==null){
            this.setState({
                page:1,
                tasks:this.props.tasks.tasks
            });
            this.props.GetTasks(1);
        }
    }

    render() {
        if(this.props.added===true){
            this.props.GetTasks(this.state.page);
        }

        let pages = [];
        for (let i=1;i<((this.state.nbr)/3)+1;i++) {
            if(this.state.page===i){
                pages.push(<li key={i} className="page-item active"><a className="page-link" >{i}</a></li>);
            }else{
                pages.push(<li key={i} className="page-item"><a onClick={(e) => this.changePage(e,i)} className="page-link" >{i}</a></li>);
            }
        }
        return (
            <div className="container">
                <div className="card">
                    <h5 className="card-header">History</h5>
                    <div className="card-body">
                        <div className="container">
                            <form onSubmit={this.onSubmit}>
                                <div className="row">
                                    <div className="col-10">
                                        <label>Search : </label>
                                        <input type="text" name="querry" value={this.state.querry} onChange={this.onChange} className="form-control" placeholder="..." />
                                    </div>
                                    <div className="col-1">
                                        <br/><button onClick={(e) => this.reset(e)} className="btn">Reset</button>
                                    </div>
                                    <div className="col-1">
                                        <br/><button type="submit" className="btn btn-dark">Search</button>
                                    </div>
                                </div>
                            </form>
                            <br/>
                            {this.tasksfn()}
                            <nav aria-label="Page navigation example" className="float-right">
                                <ul className="pagination">
                                    {pages}
                                </ul>
                            </nav>
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
        tasks:state.tsk.tasks,
        added:state.tsk.added
    }
};

export default connect(mapStateToProps,{GetTasks,DeleteTasks,SearchTasks}) (HistoryTracker);
