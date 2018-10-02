import React, { Component } from 'react';
import CurrentTracker from "./components/CurrentTracker";
import NewTracker from "./components/NewTracker";
import HistoryTracker from "./components/HistoryTracker";

class App extends Component {


    render() {
        return (
            <div>
                <div
                    className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                    <h5 className="my-0 mr-md-auto font-weight-normal"><i className="fas fa-business-time"></i> <strong>Welcome user !</strong> You can use this app to track and manage your tasks.</h5>
                    <a className="btn btn-outline-primary" target="_blank"  rel="noopener noreferrer" href="https://www.hosni.me">Developer website</a>
                </div>

                <br/>
                <CurrentTracker/>
                <br/>
                <NewTracker/>
                <br/>
                <HistoryTracker/>
                <br/>
            </div>
        );
    }
}


export default (App);
