import axios from "axios";

import {URL} from "./types";
import {GETTASKS_ATTEMPT, GETTASKS_SUCCESS,GETTASKS_FAILED} from "./types";
import {CREATETASKS_ATTEMPT, CREATETASKS_SUCCESS,CREATETASKS_FAILED} from "./types";
import {DELETETASKS_ATTEMPT, DELETETASKS_SUCCESS,DELETETASKS_FAILED} from "./types";
import {SEARCHTASKS_ATTEMPT, SEARCHTASKS_SUCCESS,SEARCHTASKS_FAILED} from "./types";

export const GetTasks = (page) =>{
    return (dispatch) => {
        dispatch({type:GETTASKS_ATTEMPT});
            axios.get(URL + "tasks/" + page)
            .then((response)=> {
                dispatch({type:GETTASKS_SUCCESS, tasks:response.data});
            })
            .catch((err)=>{
                dispatch({type:GETTASKS_FAILED, error:err.response});
                console.log(err);
            });
    };
};

export const CreateTasks = ({name, desc, startedDate,endDate, duration}) =>{
    return (dispatch) => {
        dispatch({type:CREATETASKS_ATTEMPT});
        axios.post(URL + "tasks", {name, desc, startedDate,endDate, duration})
            .then((response)=> {
                dispatch({type:CREATETASKS_SUCCESS, msj:response.data});
            })
            .catch((err)=>{
                dispatch({type:CREATETASKS_FAILED, error:err.response});
                console.log(err);
            });
    };
};

export const DeleteTasks = (id) =>{
    return (dispatch) => {
        dispatch({type:DELETETASKS_ATTEMPT});
        axios.delete(URL + "tasks/" + id)
            .then((response)=> {
                dispatch({type:DELETETASKS_SUCCESS, msj:response.data});
            })
            .catch((err)=>{
                dispatch({type:DELETETASKS_FAILED, error:err.response});
                console.log(err);
            });
    };
};

export const SearchTasks = (querry,page) =>{
    return (dispatch) => {
        dispatch({type:SEARCHTASKS_ATTEMPT});
        axios.get(URL + "tasks/searsh/" + querry + "/" + page)
            .then((response)=> {
                dispatch({type:SEARCHTASKS_SUCCESS, tasks:response.data});
            })
            .catch((err)=>{
                dispatch({type:SEARCHTASKS_FAILED, error:err.response});
                console.log(err);
            });
    };
};

