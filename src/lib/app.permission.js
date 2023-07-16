import {hasProperty} from "./helpers";

export default class AppPermissions{
    constructor(module) {
        Object.defineProperty(this,'TITLE',{
            get: ()=> {
                if(!hasProperty(module,'title')){
                    throw new Error('Module title must be defined')
                }
                return module.title
            },
            configurable: true,
        })
        Object.defineProperty(this,'DESCRIPTION', {
            get: ()=> {
                if(!hasProperty(module,'description')){
                    throw new Error('Module description must be defined')
                }
                return module.description
            },
            configurable: true
        })
    }

    getInstance(){
        let App = {}


    }

    _access(){}

    get Access(){
        return this._access()
    }
}