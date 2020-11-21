export const CHANGE_COLOR = "CHANGE_COLOR"

export const CHANGE_STROKEWIDTH = "CHANGE_STROKEWIDTH"

export const CHANGE_TENSION = "CHANGE_TENSION"

export const CHANGE_LINECAP = "CHANGE_LINECAP"

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//for changing the stage component
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

export const CHANGE_STAGE_HEIGHT = "CHANGE_STAGE_HEIGHT"

export const CHANGE_STAGE_WIDTH = "CHANGE_STAGE_WIDTH"

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//for CRUD actions
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const GET_STAGES = "GET_STAGES"

export const GET_STAGE = "GET_STAGE"

export const POST_STAGE = "POST_STAGE"

export const EDIT_STAGE = "EDIT_STAGE"

export const ADD_EISEL = "ADD_EISEL"

export const GET_SEARCH_INPUT = "GET_SEARCH_INPUT"

export const GET_SELECT_INPUT = "GET_SELECT_INPUT"


export const changeColor = (color) => {
    return {type: CHANGE_COLOR, payload: color
    }
}

export const changeStrokewidth = (strokeWidth) => {
    return {type: CHANGE_STROKEWIDTH, payload: strokeWidth
    }
}

export const changeTension = (tension) => {
    return {type: CHANGE_TENSION, payload: tension
    }
}

export const changeLinecap = (lineCap) => { return {type: CHANGE_LINECAP, payload: lineCap}
}

export const changeStageHeight = (stageHeight) => {
    return { type: CHANGE_STAGE_HEIGHT,payload: stageHeight}
}

export const changeStageWidth = (stageWidth) => {
    return {type: CHANGE_STAGE_WIDTH, payload: stageWidth
    }
}




export const getStage = (eisel) => {
    

        return {type: GET_STAGE, payload: eisel
    }
    
}

export const getStages = (data) => {
   
        return {type: GET_STAGES, payload: data}
    
}

export const addEisel = (eisel) => {
    return {type: ADD_EISEL, payload: eisel}
}

export const fetchStages = () => {
    return function(dispatch) {
        return fetch('http://localhost:3000/eisels').then(resp => resp.json()).then(data => dispatch({type: "GET_STAGES", payload: data})

        
        )}
    
}

export const fetchStage = (id) => {
return function(dispatch) {
    return fetch(`http://localhost:3000/eisel/${id}`).then(resp => resp.json()).then(data => dispatch({type: "GET_STAGE", payload: data})
    )}
}


export const postStage = (eiselObjFormData) => {
    return function(dispatch, getState) {
        let config = {
            method: "POST",
            body: eiselObjFormData
        }
        return fetch('http://localhost:3000/eisels', config).then(resp => resp.json()).then(data => dispatch({type: "ADD_EISEL", payload: [...getState().stages, data]})
        
        )}
}

export const getSearchInput = (searchinput) => {
    return {type: GET_SEARCH_INPUT, payload: searchinput}
}

export const getSelectInput = (selectinput) =>  {
    return {type: GET_SELECT_INPUT, payload: selectinput}
}


// export const editStage = (eisel) => {
//     return {type: EDIT_STAGE, payload: eisel
//     }
// }

//$$$$$$$$$$$$$$$$$$$$$
//FETCH section
//$$$$$$$$$$$$$$$$$$$$

// export const getStages = () => {
//     // return {type: GET_STAGES, payload: eisels
//     // }
//     return function(dispatch) {
//         return fetch('http://localhost:3000/eisels').then(resp => resp.json()).then(data => dispatch({type: "GET_STAGES", payload: data}))
//     }
// }

