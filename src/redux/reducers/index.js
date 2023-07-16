import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import Auth from './Auth';
import Theme from './Theme';
import Settings from './Settings'
import _Audio from './Audio'
import MasterData from './master-data'
import Display from './Display'
import Monitoring from './Monitoring'
import Announcement from './Announcement'
import global from './global'

const reducers = combineReducers({
    theme: Theme,
    MasterData,
    Display,
    Monitoring,
    _Audio,
    _Announcement:Announcement,
    auth: Auth,
    Settings,
    Global: global,
    form: formReducer
});

export default reducers;