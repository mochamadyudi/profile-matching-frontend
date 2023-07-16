import {all} from 'redux-saga/effects';
import Auth from './Auth';
import Settings from './settings';
import Live from "./Live";
import Audio from "./Audio";
import MasterData from "./MasterData";
import Display from "./Display";
import WS from "./web-socket";
import Monitoring from './Monitoring'
import Announcement from './Announcement'
import Theme from './Theme'
import Global from './global'

export default function* rootSaga(getState) {
    yield all([
        Auth(),
        Display(),
        MasterData(),
        Audio(),
        Global(),
        WS(),
        Theme(),
        Announcement(),
        Monitoring(),
        Settings(),
        Live()
    ]);
}
