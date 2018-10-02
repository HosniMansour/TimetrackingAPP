import {GETTASKS_ATTEMPT, GETTASKS_SUCCESS,GETTASKS_FAILED} from "../actions/types";
import {CREATETASKS_ATTEMPT, CREATETASKS_SUCCESS,CREATETASKS_FAILED} from "../actions/types";
import {SEARCHTASKS_ATTEMPT, SEARCHTASKS_SUCCESS,SEARCHTASKS_FAILED} from "../actions/types";

const INITIAL_STATE = {
    tasks:null,
    loading:false,
    error:"",
    msj:null,
    added:false
};

export default (state=INITIAL_STATE, action) => {
    switch (action.type){
        case (GETTASKS_ATTEMPT||CREATETASKS_ATTEMPT|SEARCHTASKS_ATTEMPT):{
            return{...state, loading:true,added:false};
        }
        case (GETTASKS_SUCCESS):{
            return{...INITIAL_STATE, tasks:action.tasks,loading:false,added:false};
        }
        case (SEARCHTASKS_SUCCESS):{
            return{...INITIAL_STATE,tasks:action.tasks,loading:false};
        }
        case CREATETASKS_SUCCESS:{
            return{...INITIAL_STATE, msj:action.msj,loading:false,added:true};
        }
        case (GETTASKS_FAILED||CREATETASKS_FAILED|SEARCHTASKS_FAILED):{
            return{...INITIAL_STATE, loading:false,error:action.error};
        }
        default: return state;
    }
}