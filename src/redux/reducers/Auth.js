import {
    AUTH_TOKEN,
    AUTHENTICATED,
    SHOW_AUTH_MESSAGE,
    HIDE_AUTH_MESSAGE,
    SIGNOUT_SUCCESS,
    SIGNUP_SUCCESS,
    SHOW_LOADING,
    SIGNIN_WITH_GOOGLE_AUTHENTICATED,
    SIGNIN_WITH_FACEBOOK_AUTHENTICATED, USER_LOAD, OK_USER_LOAD, BAD_USER_LOAD, AUTH_UPDATE_PROFILE
} from '../constants/Auth';
import Utils from "../../utils";
import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";

const initState = {
    loading: true,
    message: '',
    showMessage: false,
    redirect: '/auth/login',
    isAuthenticated: false,
    token: null,
    profile: {
        loading:true,
        first_name:null,
        last_name:null,
        email:null,
    }
}
if(Utils.getToken('get')){
    Reflect.set(initState,'token',Utils.getToken('get'))
}else{

}

const auth = (state = initState, action) => {
    let { type, payload } = action
    switch (action.type) {
        case REQUEST(USER_LOAD):
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
                token: null,
            }
        case SUCCESS(USER_LOAD):
            return {
                ...state,
                loading: false,
                ...action?.payload
            }
        case FAILURE(USER_LOAD):
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                token: null
            }
            
            
        case REQUEST(AUTH_UPDATE_PROFILE):
            return {
                ...state,
                profile: {
                    ...state.profile,
                    loading: true,
                }
            }
        case SUCCESS(AUTH_UPDATE_PROFILE):
            return {
                ...state,
                profile: {
                    ...state.profile,
                    loading: false,
                  ...payload
                }
            }
        case FAILURE(AUTH_UPDATE_PROFILE):
            return {
                ...state,
                profile: {
                    ...state.profile,
                    loading: false
                }
            }
            
        case AUTHENTICATED:
            return {
                ...state,
                loading: false,
                redirect: '/',
                token: action.token
            }
        case SHOW_AUTH_MESSAGE:
            return {
                ...state,
                message: action.message,
                showMessage: true,
                loading: false
            }
        case HIDE_AUTH_MESSAGE:
            return {
                ...state,
                message: '',
                showMessage: false,
            }
        case SIGNOUT_SUCCESS: {
            return {
                ...state,
                token: null,
                redirect: '/',
                loading: false
            }
        }
        case SIGNUP_SUCCESS: {
            return {
                ...state,
                loading: false,
                token: action.token
            }
        }
        case SHOW_LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case SIGNIN_WITH_GOOGLE_AUTHENTICATED: {
            return {
                ...state,
                loading: false,
                token: action.token
            }
        }
        case SIGNIN_WITH_FACEBOOK_AUTHENTICATED: {
            return {
                ...state,
                loading: false,
                token: action.token
            }
        }
        default:
            return state;
    }
}

export default auth