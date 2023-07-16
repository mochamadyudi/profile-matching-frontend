import PropTypes from 'prop-types'
import {DASHBOARD_PREFIX_PATH} from "../configs/AppConfig";




class GetPath{
    get _prefixDashboard() {
        return DASHBOARD_PREFIX_PATH
    }

    /**
     *
     * @param {('master-data'|'dashboard'|'thin-client'|string|string[])} type
     * @param {('airlines'|'city'|string|string[])} subType
     * @param {('overview'|string)} suffix
     * @returns {{}|null}
     */
    static overview(
        type ,
        subType ,
        suffix = 'overview'){
        let dashboard = new GetPath()._prefixDashboard;
        switch (type){
            case "master-data":
                switch (subType){
                    case "airlines":
                        return [dashboard,type,subType,suffix].join('/')
                    case "city":
                        return [dashboard,type,subType,suffix].join('/')
                    default:
                        return null;
                }
            case "dashboard":
            case "thin-client":
                return [dashboard,type,subType,suffix].join('/')
            default:
                return [dashboard,type,subType,suffix].join('/')

        }
    }

    /**
     *
     * @param {('city' | 'airlines' | 'location' | 'thin-client'| 'display'| 'audio-announcement','audio')} type
     * @param {(string|string[]|number|number[]|null)} val
     * @param {('update'|'show'|'delete'|string|string[])} prefix
     * @private
     */
    static _action(type,val,prefix){
        switch (type){
            case "location":
            case "city":
            case "airlines":
                return [GetPath.overview('master-data',type,val),prefix].join('/')
            case "thin-client":
                return [GetPath.overview('thin-client','',val),prefix].join('/')
            case "display":
                return [GetPath.overview('display','',val),prefix].join('/')
            case "audio-announcement":
            case "audio":
                return [GetPath.overview(type,'',val),prefix].join('/')
            default:
                return "/404"
        }
    }


    /**
     *
     * @param {('city' | 'airlines' | 'thin-client'| 'display'| 'location' | 'audio-announcement','audio')} type
     * @param {(string|string[]|number|number[]|null)} val
     * @returns {null}
     */
     static detail(type,val){
         return GetPath._action(type,val,'show')
     }


    /**
     * @param {('city' | 'airlines' | 'thin-client'| 'display'| 'audio-announcement','audio')} type
     * @param {(string|string[]|number|number[]|null)} val
     * @returns {null}
     */
     static update(type,val){
        return GetPath._action(type,val,'update')
     }
}

export { GetPath }
