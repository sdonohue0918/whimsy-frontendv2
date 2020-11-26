import {combineReducers} from 'redux'

export const GET_STAGES = "GET_STAGES"

export const GET_STAGE = "GET_STAGE"

export const POST_STAGE = "POST_STAGE"

export const EDIT_STAGE = "EDIT_STAGE"

export const CHANGE_COLOR = "CHANGE_COLOR"

export const CHANGE_STROKEWIDTH = "CHANGE_STROKEWIDTH"

export const CHANGE_TENSION = "CHANGE_TENSION"

export const CHANGE_LINECAP = "CHANGE_LINECAP"

export const CHANGE_STAGE_HEIGHT = "CHANGE_STAGE_HEIGHT"

export const CHANGE_STAGE_WIDTH = "CHANGE_STAGE_WIDTH"

export const GET_SEARCH_INPUT = "GET_SEARCH_INPUT"

export const GET_SELECT_INPUT = "GET_SELECT_INPUT"

export const ADD_EISEL = "ADD_EISEL"





export const initialState = {
    width: 500,
    height: 500,
    stages: [],
    stage: {},
    stroke: "#1a1a18",
    strokeWidth: 2,
    tension: 0.3,
    lineCap: 'round',
    searchInput: "",
    selectInput: ""

}

export const widthReducer = (state = 500, action) => {
    switch(action.type) {
       
        case CHANGE_STAGE_WIDTH:
            return {
                ...state, width: action.payload
            }
        default:
            return state
            
    }
}

export const heightReducer = (state = 500, action) => {
    switch (action.type) {
        case CHANGE_STAGE_HEIGHT:
            return {
                ...state, height: action.payload
            }
        default:
            return state
            
    }
}



export const colorReducer = (state = "#1a1a18", action) => {
    switch(action.type) {
        case CHANGE_COLOR: 
            return {
            ...state, stroke: action.payload
        }
       
        default:
            return state
            
    
    
    } 
}

export const strokeWidthReducer = (state = 2, action) => {
    switch(action.type) {
        case CHANGE_STROKEWIDTH:
            return {
            ...state, strokeWidth: action.payload
        }
        default:
            return state
    }
}

export const tensionReducer = (state = 0.3, action) => {
    switch(action.type) {
        case CHANGE_TENSION:
            return {
                ...state, lineCap: action.payload 
            }

        default:
            return state
    }


}

export const linecapReducer = (state = 'round', action) => {
    switch(action.type) {
        case CHANGE_LINECAP:
            return {
                ...state, lineCap: action.payload
            }
        default:
            return state
            
    }
}




export const eiselsReducer = (state = [], action) => {
    switch (action.type) {
        case GET_STAGES:
            return {
                ...state,
                stages: action.payload
            }
        case ADD_EISEL:
            return {
                ...state, stages: [...state.tages, action.payload]
            }
        default:
            return state
    }
}

export const eiselReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_STAGE:
        return {
            ...state,
            stage: action.payload
        }
        default:
            return state
    }
}

export const searchInputReducer = (state = "", action) => {
    switch (action.type) {
        case GET_SEARCH_INPUT:
        return {
            ...state, searchInput: action.payload
        }
        default: 
        return state
    }
}

export const selectInputReducer = (state = "", action) => {
    switch (action.type) {
        case GET_SELECT_INPUT:
            return {
                ...state, selectInput: action.payload
            }
            default:
            return state
    }
}

 export const rootReducer = combineReducers({
        width: widthReducer,
        height: heightReducer,
        stages: eiselsReducer,
        stage: eiselReducer,
        stroke: colorReducer,
        strokeWidth: strokeWidthReducer,
        tension: tensionReducer,
        lineCap: linecapReducer,
        searchInput: searchInputReducer,
        selectInput: selectInputReducer
    
    })


export default rootReducer

// export const rootReducer = combineReducers({
//     width: widthReducer,
//     height: heightReducer,
//     stages: eiselsReducer,
//     stage: eiselReducer,
//     stroke: colorReducer,
//     strokeWidth: strokeWidthReducer,
//     tension: tensionReducer,
//     lineCap: linecapReducer,
//     searchInput: searchInputReducer,
//     selectInput: selectInputReducer

// })

// export const rootReducer = combineReducers({
//     widthReducer,
//     heightReducer,
//     eiselsReducer,
//     eiselReducer,
//     colorReducer,
//     strokeWidthReducer,
//     tensionReducer,
//     linecapReducer,
//     searchInputReducer,
//     selectInputReducer

// })