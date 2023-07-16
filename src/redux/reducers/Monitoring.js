import {
    BAD_GET_MONITORING_LIST,
    GET_MONITORING_LIST,
    OK_GET_MONITORING_LIST, REMOVE_HIGHLIGHT_MONITORING,
    SET_HIGHLIGHT_MONITORING
} from "../constants/Monitoring";

const initialState = {
    tabActive: "arrival",
    loading: false,
    params: {
        page:1,
        limit:10
    },
    pagination: {
        page:1,
        limit: 10,
        max_page:0,
        total_record:0
    },
    data: []
}



export default function (state = initialState, action ){
    let { type, payload } = action
    switch (type){
        case GET_MONITORING_LIST:
            return {
                ...state,
                tabActive:payload?.type ?? "arrival",
                loading:true,
                params: {
                    ...payload?.params,
                },
                pagination: {
                    ...payload?.pagination
                },
                data: []
            }
        case OK_GET_MONITORING_LIST:
            if(Array.isArray(payload?.data) && payload?.data.length > 0){
                let newData = []
                for(let i =0;i< payload.data.length;i++){
                    newData.push({
                        ...payload.data[i],
                        isHighlight:false
                    })
                }
                state.data= newData ?? []
            }
            return {
                ...state,
                loading:false,
                params: {
                    ...state.params,
                    ...payload?.params
                },
                pagination: {
                    ...state.pagination,
                    ...payload?.pagination
                },
                data: [...state.data]
            }
        case BAD_GET_MONITORING_LIST:
            return {
                ...state,
                loading:false
            }
        case SET_HIGHLIGHT_MONITORING:
            if(state.tabActive === payload?.to){
                if(state.data.length > 0){
                    let indexed = state.data.findIndex((child)=> child?.id === payload?.data?.id)
                    if(indexed >= 0){
                        state.data[indexed] = payload?.data
                        state.data[indexed].isHighlight = true
                    }
                }
            }
            console.log({payload},'REDUX')
            return {
                ...state,
                payload:payload,
                data: [...state.data]
            }
        case REMOVE_HIGHLIGHT_MONITORING:
            if(state.data.length > 0){
                let indexed = state.data.findIndex((child)=> child?.id === payload?.id)
                if(indexed >= 0){
                    state.data[indexed].isHighlight = false
                }
            }
            return {
                ...state,
                payload:payload,
                data: [...state.data]
            }
        default:
            return state;
    }
}