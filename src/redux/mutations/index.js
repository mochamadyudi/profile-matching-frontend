const Mutate = {
    settings: {

    },
    emit: {
        MasterData: {
            location:{
                list: function(state,action){
                    return {
                        ...state,
                        location: {
                            ...state.location,
                            list: {
                                ...state.location.list,
                                loading: true,
                                error:false,
                                data: []
                            }
                        }
                    }
                }
            },
            city:{
                list: function(state,action){
                    return {
                        ...state,
                        city: {
                            ...state.city,
                            list: {
                                ...state.city.list,
                                loading: true,
                                error:false,
                                data: []
                            }
                        }
                    }
                }
            },
            airlines:{
                list: function(state,action){
                    return {
                        ...state,
                        airlines: {
                            ...state.airlines,
                            list: {
                                ...state.airlines.list,
                                loading: true,
                                error:false,
                                data: []
                            }
                        }
                    }
                }
            },
            airlines_status:{
                list: function(state,action){
                    return {
                        ...state,
                        airlines_status: {
                            ...state.airlines_status,
                            list: {
                                ...state.airlines_status.list,
                                loading: true,
                                error:false,
                                data: []
                            }
                        }
                    }
                }
            },
            airlines_type:{
                list: function(state,action){
                    return {
                        ...state,
                        airlines_type: {
                            ...state.airlines_type,
                            list: {
                                ...state.airlines_type.list,
                                loading: true,
                                error:false,
                                data: []
                            }
                        }
                    }
                }
            },
            thin_client:{
                list: function(state,action){
                    return {
                        ...state,
                        thin_client: {
                            ...state.thin_client,
                            list: {
                                ...state.thin_client.list,
                                loading: true,
                                error:false,
                                data: []
                            }
                        }
                    }
                }
            },
        },
        settings: {
            switchCurrentInvitation: function(state,action){
                if(action?.payload){
                    state.current.invitations = []
                    state.current.invitations = [
                        {...action?.payload}
                    ]
                }
                return {
                    ...state,
                    current: {
                        ...state.current,
                        invitations: []
                    }
                }
            }
        }
    },
    subscribe: {
        MasterData: {
            location:{
                list: function(state,action){
                    return {
                        ...state,
                        location: {
                            ...state.location,
                            list: {
                                ...state.location.list,
                                loading: false,
                                error:false,
                                params :{
                                    ...state.location.list.params,
                                    ...action?.payload?.query,
                                },
                                pagination: {
                                    ...state.location.list.pagination,
                                    ...action?.payload?.pagination
                                },
                                data: [
                                    ...action?.payload?.data
                                ]
                            }
                        }
                    }
                }
            },
            city:{
                list: function(state,action){
                    return {
                        ...state,
                        city: {
                            ...state.city,
                            list: {
                                ...state.city.list,
                                loading: false,
                                error:false,
                                params :{
                                    ...state.city.list.params,
                                    ...action?.payload?.query,
                                },
                                pagination: {
                                    ...state.city.list.pagination,
                                    ...action?.payload?.pagination
                                },
                                data: [
                                    ...action?.payload?.data
                                ]
                            }
                        }
                    }
                }
            },
            airlines:{
                list: function(state,action){
                    return {
                        ...state,
                        airlines: {
                            ...state.airlines,
                            list: {
                                ...state.airlines.list,
                                loading: false,
                                error:false,
                                params :{
                                    ...state.airlines.list.params,
                                    ...action?.payload?.query,
                                },
                                pagination: {
                                    ...state.airlines.list.pagination,
                                    ...action?.payload?.pagination
                                },
                                data: [
                                    ...action?.payload?.data
                                ]
                            }
                        }
                    }
                }
            },
            airlines_status:{
                list: function(state,action){
                    return {
                        ...state,
                        airlines_status: {
                            ...state.airlines_status,
                            list: {
                                ...state.airlines_status.list,
                                loading: false,
                                error:false,
                                params :{
                                    ...state.airlines_status.list.params,
                                    ...action?.payload?.query,
                                },
                                pagination: {
                                    ...state.airlines_status.list.pagination,
                                    ...action?.payload?.pagination
                                },
                                data: [
                                    ...action?.payload?.data
                                ]
                            }
                        }
                    }
                }
            },
            airlines_type:{
                list: function(state,action){
                    return {
                        ...state,
                        airlines_type: {
                            ...state.airlines_type,
                            list: {
                                ...state.airlines_type.list,
                                loading: false,
                                error:false,
                                params :{
                                    ...state.airlines_type.list.params,
                                    ...action?.payload?.query,
                                },
                                pagination: {
                                    ...state.airlines_type.list.pagination,
                                    ...action?.payload?.pagination
                                },
                                data: [
                                    ...action?.payload?.data
                                ]
                            }
                        }
                    }
                }
            },
            thin_client:{
                list: function(state,action){
                    return {
                        ...state,
                        thin_client: {
                            ...state.thin_client,
                            list: {
                                ...state.thin_client.list,
                                loading: false,
                                error:false,
                                params :{
                                    ...state.thin_client.list.params,
                                    ...action?.payload?.query,
                                },
                                pagination: {
                                    ...state.thin_client.list.pagination,
                                    ...action?.payload?.pagination,
                                    ...action?.payload?.paginate
                                },
                                data: [
                                    ...action?.payload?.data
                                ]
                            }
                        }
                    }
                }
            }
        },
        settings: {
            primaryScreenLoading:function(state,action){
                return {
                    ...state,
                    loading: {
                        ...state.loading,
                        screen: {
                            ...state.loading.screen,
                            primary:  true
                        }
                    }
                }
            },
        }
    },
    describe: {
        MasterData: {
            location:{
                list: function(state,action){
                    return {
                        ...state,
                        location: {
                            ...state.location,
                            list: {
                                ...state.location.list,
                                loading: false,
                                error:false,
                                params :{
                                    ...state.location.list.params,
                                    ...action?.payload?.query,
                                },
                                pagination: {
                                    ...state.location.list.pagination,
                                    ...action?.payload?.pagination
                                },
                                data: []
                            }
                        }
                    }
                }
            },
            city:{
                list: function(state,action){
                    return {
                        ...state,
                        city: {
                            ...state.city,
                            list: {
                                ...state.city.list,
                                loading: false,
                                error:false,
                                params :{
                                    ...state.city.list.params,
                                    ...action?.payload?.query,
                                },
                                pagination: {
                                    ...state.city.list.pagination,
                                    ...action?.payload?.pagination
                                },
                                data: []
                            }
                        }
                    }
                }
            },
            airlines:{
                list: function(state,action){
                    return {
                        ...state,
                        airlines: {
                            ...state.airlines,
                            list: {
                                ...state.airlines.list,
                                loading: false,
                                error:false,
                                params :{
                                    ...state.airlines.list.params,
                                    ...action?.payload?.query,
                                },
                                pagination: {
                                    ...state.airlines.list.pagination,
                                    ...action?.payload?.pagination
                                },
                                data: []
                            }
                        }
                    }
                }
            },
            airlines_type:{
                list: function(state,action){
                    return {
                        ...state,
                        airlines_type: {
                            ...state.airlines_type,
                            list: {
                                ...state.airlines_type.list,
                                loading: false,
                                error:false,
                                params :{
                                    ...state.airlines_type.list.params,
                                    ...action?.payload?.query,
                                },
                                pagination: {
                                    ...state.airlines_type.list.pagination,
                                    ...action?.payload?.pagination
                                },
                                data: []
                            }
                        }
                    }
                }
            },
            airlines_status:{
                list: function(state,action){
                    return {
                        ...state,
                        airlines_status: {
                            ...state.airlines_status,
                            list: {
                                ...state.airlines_status.list,
                                loading: false,
                                error:false,
                                params :{
                                    ...state.airlines_status.list.params,
                                    ...action?.payload?.query,
                                },
                                pagination: {
                                    ...state.airlines_status.list.pagination,
                                    ...action?.payload?.pagination
                                },
                                data: []
                            }
                        }
                    }
                }
            },
            thin_client:{
                list: function(state,action){
                    return {
                        ...state,
                        thin_client: {
                            ...state.thin_client,
                            list: {
                                ...state.thin_client.list,
                                loading: false,
                                error:false,
                                params :{
                                    ...state.thin_client.list.params,
                                    ...action?.payload?.query,
                                },
                                pagination: {
                                    ...state.thin_client.list.pagination,
                                    ...action?.payload?.pagination
                                },
                                data: []
                            }
                        }
                    }
                }
            },
        },
        settings: {
            primaryScreenLoading: function (state,action){
                    return {
                        ...state,
                        loading: {
                            ...state.loading,
                            screen: {
                                ...state.loading.screen,
                                primary : false
                            }
                        }
                    }
                },
        }
    }
}

export default Mutate