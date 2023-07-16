import {reducer as formReducer} from "redux-form";
import {
    __BAD_LIST_MD_AIRLINES,
    __BAD_LIST_MD_AIRLINES_STATUS,
    __BAD_LIST_MD_AIRLINES_TYPE, __BAD_LIST_MD_CITY,
    __BAD_LIST_MD_LOCATION,
    __BAD_LIST_MD_THIN_CLIENT,
    __GET_LIST_MD_AIRLINES,
    __GET_LIST_MD_AIRLINES_STATUS,
        __GET_LIST_MD_AIRLINES_TYPE, __GET_LIST_MD_CITY,
    __GET_LIST_MD_LOCATION,
    __GET_LIST_MD_THIN_CLIENT, __OK_LIST_MD_AIRLINES,
    __OK_LIST_MD_AIRLINES_STATUS,
    __OK_LIST_MD_AIRLINES_TYPE, __OK_LIST_MD_CITY,
    __OK_LIST_MD_LOCATION,
    __OK_LIST_MD_THIN_CLIENT, GET_MD_THIN_CLIENT_STATUS
} from "../constants/MasterData";
import Mutate from "../mutations";
import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";

const initialState = {
    airlines : {
        show: {
            error: false,
            loading: false,
            params: {
                key:"id",
                value:null,
            },
            query : {},
            data:null
        },
        list: {
            error: false,
            loading: false,
            query: {},
            pagination: {
                page:1,
                limit:10
            },
            data: []
        },
        edit: {
            error: false,
            loading: false,
            params: {
                key:"id",
                value:null,
            },
            query : {},
            data:null,
            fields: {}
        },
        create: {
            fields: {},
            loading:false,
            isSubmit:false
        }
    },
    airlines_status : {
        show: {
            error: false,
            loading: false,
            params: {
                key:"id",
                value:null,
            },
            query : {},
            data:null
        },
        list: {
            error: false,
            loading: false,
            query: {},
            pagination: {
                page:1,
                limit:10
            },
            data: []
        },
        edit: {
            error: false,
            loading: false,
            params: {
                key:"id",
                value:null,
            },
            query : {},
            data:null,
            fields: {}
        },
        create: {
            fields: {},
            loading:false,
            isSubmit:false
        }
    },
    airlines_type : {
        show: {
            error: false,
            loading: false,
            params: {
                key:"id",
                value:null,
            },
            query : {},
            data:null
        },
        list: {
            error: false,
            loading: false,
            query: {},
            pagination: {
                page:1,
                limit:10
            },
            data: []
        },
        edit: {
            error: false,
            loading: false,
            params: {
                key:"id",
                value:null,
            },
            query : {},
            data:null,
            fields: {}
        },
        create: {
            fields: {},
            loading:false,
            isSubmit:false
        }
    },
    location : {
        show: {
            error: false,
            loading: false,
            params: {
                key:"id",
                value:null,
            },
            query : {},
            data:null
        },
        list: {
            error: false,
            loading: false,
            query: {},
            pagination: {
                page:1,
                limit:10
            },
            data: []
        },
        edit: {
            error: false,
            loading: false,
            params: {
                key:"id",
                value:null,
            },
            query : {},
            data:null,
            fields: {}
        },
        create: {
            fields: {},
            loading:false,
            isSubmit:false
        }
    },
    thin_client : {
        show: {
            error: false,
            loading: false,
            params: {
                key:"id",
                value:null,
            },
            query : {},
            data:null
        },
        list: {
            error: false,
            loading: false,
            query: {},
            pagination: {
                page:1,
                limit:10
            },
            data: []
        },
        edit: {
            error: false,
            loading: false,
            params: {
                key:"id",
                value:null,
            },
            query : {},
            data:null,
            fields: {}
        },
        create: {
            fields: {},
            loading:false,
            isSubmit:false
        },
        
        status: {
            show: {
                error: false,
                loading: false,
                params: {
                    key:"id",
                    value:null,
                },
                query : {},
                data:null
            },
            list: {
                error: false,
                loading: false,
                query: {},
                pagination: {
                    page:1,
                    limit:10
                },
                data: []
            },
        }
    },
    city : {
        show: {
            error: false,
            loading: false,
            params: {
                key:"id",
                value:null,
            },
            query : {},
            data:null
        },
        list: {
            error: false,
            loading: false,
            query: {},
            pagination: {
                page:1,
                limit:10
            },
            data: []
        },
        edit: {
            error: false,
            loading: false,
            params: {
                key:"id",
                value:null,
            },
            query : {},
            data:null,
            fields: {}
        },
        create: {
            fields: {},
            loading:false,
            isSubmit:false
        }
    },
}

export default function(state = initialState, action){
    let { type } = action
    switch (type){
        case __GET_LIST_MD_LOCATION:
            return Mutate.emit.MasterData.location.list(state,action)
        case __OK_LIST_MD_LOCATION:
            return Mutate.subscribe.MasterData.location.list(state,action)
        case __BAD_LIST_MD_LOCATION:
            return Mutate.describe.MasterData.location.list(state,action)



        case __GET_LIST_MD_AIRLINES:
            return Mutate.emit.MasterData.airlines.list(state,action)
        case __OK_LIST_MD_AIRLINES:
            return Mutate.subscribe.MasterData.airlines.list(state,action)
        case __BAD_LIST_MD_AIRLINES:
            return Mutate.describe.MasterData.airlines.list(state,action)


        case __GET_LIST_MD_AIRLINES_TYPE:
            return Mutate.emit.MasterData.airlines_type.list(state,action)
        case __OK_LIST_MD_AIRLINES_TYPE:
            return Mutate.subscribe.MasterData.airlines_type.list(state,action)
        case __BAD_LIST_MD_AIRLINES_TYPE:
            return Mutate.describe.MasterData.airlines_type.list(state,action)


        case __GET_LIST_MD_AIRLINES_STATUS:
            return Mutate.emit.MasterData.airlines_status.list(state,action)
        case __OK_LIST_MD_AIRLINES_STATUS:
            return Mutate.subscribe.MasterData.airlines_status.list(state,action)
        case __BAD_LIST_MD_AIRLINES_STATUS:
            return Mutate.describe.MasterData.airlines_status.list(state,action)


        case __GET_LIST_MD_THIN_CLIENT:
            return Mutate.emit.MasterData.thin_client.list(state,action)
        case __OK_LIST_MD_THIN_CLIENT:
            return Mutate.subscribe.MasterData.thin_client.list(state,action)
        case __BAD_LIST_MD_THIN_CLIENT:
            return Mutate.describe.MasterData.thin_client.list(state,action)
        
        case REQUEST(GET_MD_THIN_CLIENT_STATUS):
            return {
                ...state,
                thin_client: {
                    ...state.thin_client,
                    status: {
                        ...state.thin_client.status,
                        list: {
                            ...state.thin_client.status.list,
                            loading: true,
                            data: [],
                            
                        }
                    }
                }
            }
        case SUCCESS(GET_MD_THIN_CLIENT_STATUS):
            return {
                ...state,
                thin_client: {
                    ...state.thin_client,
                    status: {
                        ...state.thin_client.status,
                        list: {
                            ...state.thin_client.status.list,
                            loading: false,
                            ...action?.payload,
                            data: [...action?.payload?.data],
                        }
                    }
                }
            }
        case FAILURE(GET_MD_THIN_CLIENT_STATUS):
            return {
                ...state,
                thin_client: {
                    ...state.thin_client,
                    status: {
                        ...state.thin_client.status,
                        list: {
                            ...state.thin_client.status.list,
                            loading: false,
                            ...action?.payload,
                            data: [],
                        }
                    }
                }
            }


        case __GET_LIST_MD_CITY:
            return Mutate.emit.MasterData.city.list(state,action)
        case __OK_LIST_MD_CITY:
            return Mutate.subscribe.MasterData.city.list(state,action)
        case __BAD_LIST_MD_CITY:
            return Mutate.describe.MasterData.city.list(state,action)
        default:
            return state;
    }
}