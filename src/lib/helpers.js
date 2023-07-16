export function hasProperty (object, property){
    return Object.hasOwnProperty.call(object,property);
}

export function UniqueKey(test = 0){
    var d = new Date();
    var u = d.getFullYear() + "," + d.getMonth() + "," +
        d.getHours() + "," + d.getMinutes() + "," +
        d.getSeconds() + "," + test;
    test++;
    return u.replace(/\,/g, "");
}
export function isArray(data){
    return Array.isArray(data)
}

export function _getBreadCrumb(init = 'dashboard'){
    if(window){
        let parts = []
        let arr = window.location.href.split('/')
        let indexed = arr.findIndex((child)=> child === init )
        if(indexed>=0){
            arr = arr.slice(indexed)
        }
        for(let i = 0 ; i < arr.length ; i ++){
            let part = arr[i];
            let pageName = part.toLowerCase();
            pageName = part.charAt(0).toUpperCase() + part.slice(1);
            let url  = [`/`,arr.slice(0, i + 1).join('/')].join('')
            parts.push({
                label: pageName,
                url: url
            })
        }
        return parts
    }
}
export function isDefined(obj,key){
    return typeof(obj[key]) !== 'undefined'
}

export function isFunction(obj,key){
    return typeof(obj[key]) === 'function';
}

export function isString(str,value = null){
    if(typeof(str) !== 'undefined' && typeof(str) === 'string'){
        return value !== null ? str === value : true
    }
    return false
}
export function NotDefined(obj,key){
    return typeof(obj[key]) === 'undefined'
}

export function isObject(object){
    return typeof(object) === 'object' && Object.keys(object).length >= 0
}

export function NotNull(value,key = null){
}

export function InitialParams({search = undefined,keys= []}){
    let val = {}
    if(typeof search !== 'undefined'){
        if(isArray(keys) && keys.length > 0){
            for(let i = 0 ; i < keys.length;i++){
                let keyVal = new URLSearchParams(search).get(keys[i])
                Reflect.set(val,keys[i],keyVal)
            }
            return val
        }
        return val
    }
    return val
}
export function _setInitParams({
    key = '',
    value = null,
    locations = {}
                               }){
    if (window) {

        const urlSearch = new URLSearchParams(window.location.search)
        if(urlSearch.get(key)){
            urlSearch.delete(key)
            urlSearch.append(key, value)
        }else{
            urlSearch.append(key, value)
        }
        let query = []
        urlSearch.forEach((value, key) => {
            query.push(`${key}=${value}`)
        })

        let newUrl = [window.origin, locations?.pathname].join("")
        window.history.pushState({article: 'read-all'}, 'Read All Article', [newUrl, query.join("&")].join("?"));

    }
}
export function ToNumber(value,defaultValue = 0){
    if(typeof(value) !== 'undefined' && typeof value !== 'object' && value !== null && value !== ''){
        if(typeof value === 'string'){
            if(!isNaN(parseInt(value))){
                return parseInt(value)
            }
            return value
        }
        return value
    }
    return defaultValue
}

export default class Helpers{
    constructor({...args}) {
        this._resolver(this,['value','description'])
    }

    _resolver(object , property = []){

        for( let i = 0; i < property.length ; i++){
            Object.defineProperty(this, property[i], {
                get:function(){
                    if(!hasProperty(object,property[i])){
                        throw new Error(`args ${property[i]} must be defined`)
                    }
                },
                configurable: true
            })
        }
    }

    /**
     * @private
     */
    _getter(){

    }

    _setter({setKey = 'value',getKey= 'data'}){
        let a = {}
        a.__defineSetter__(setKey, function(val){
            this[getKey] = val
        })
        return a
    }
}

