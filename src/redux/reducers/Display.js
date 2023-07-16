const initialState = {
    System: {
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
    Scheduled: {
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
    Settings: {
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

export default function ( state = initialState, action){
    let { type } = action
    switch (type){
        default:
            return state;
    }
}