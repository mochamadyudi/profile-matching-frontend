import {message} from 'antd'
import {first} from "lodash";
export *  from './get-path';


/**
 * @param {CALC_GAP[] | []} arr
 * @param {string} key
 * @param {number} compare
 */
export function calcGap(arr = [],key , compare ){
    if(!Array.isArray(arr) && arr.length === 0) return null
    let newArr = arr.filter((child)=> findKey(child,key ?? ['id']) === compare)
    if(Array.isArray(newArr) && newArr.length === 0) return null
    return first(newArr)
}
export const DeleteObjKey = async (data,key =[])=> {
    try {
        if(typeof(data) !== "undefined" && typeof(data) === "object"){
            for(let i = 0; i < key.length;i++){
                if(typeof(key[i]) !== "undefined"){
                    if('deleteProperty' in Reflect){
                        Reflect.deleteProperty(data,key[i])
                    }
                }
            }
            return data
        }
        return null
    }catch(err){
        return null
    }
}
export function SearchLikeArr(arr = [],key = [''], keyword = ''){
    return arr.filter(function(val){
        let re = new RegExp(keyword+'.+$','i');
        if(findKey(val,key)){
            return findKey(val,key).search(re) != -1;
        }
        return -1;
    })
}

/**
 * @param {object} data
 * @param {string|Array} key
 * @returns {null}
 */
export const findKey = (data, key)=> {
    if(data && typeof(data) !== 'object') return null
    if(typeof(data) ==='object'){
        if(Array.isArray(key) && key.length > 0){
            let value = data;
            for (const k of key) {
                value = value[k];
            }
            return value
        }else if (typeof(key) === 'string') {
            if(typeof(data[key]) !== 'undefined') return data[key]
            return null
        }
    }
    return null
}
class Utils {
    
    static rules(key) {
        let data =
          {
              initial: function (message) {
                  return {
                      required: true,
                      message
                  }
              },
              password: {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                  message: "Password is not valid. Use Upper case, numeric letter, and alphabets a-z"
              },
              validatePassword: function (fieldName) {
                  return ({getFieldValue}) => ({
                      validator(_, value) {
                          if (value.length > 0) {
                              if (!value || getFieldValue(fieldName) === value) {
                                  return Promise.resolve();
                              }
                              return Promise.reject(new Error('The two passwords that you entered do not match!'));
                          }
                          
                      },
                  })
              },
          }
        
        if (typeof (data[key]) !== "undefined") {
            return {
                instance: data[key],
                data: data[key]
            }
        }
        return {
            instance: null,
            data,
        }
        
    }
    /**
     * @param {string} str
     * @param {string} search
     * @param {string | ' '} prefix
     */
    static search(str,search,prefix = ' '){
        const text = str.split(prefix);
        const results = [];
        for(let i=0;i<text.length;i++){
            const result = text[i]
            if (result.toLowerCase().includes(search)) {
                results.push(result);
            }
        }
        console.log({results,search,str,text,prefix})
        return {
            status:results.length > 0,
            value:str
        }
    }
    static makeId(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
    static propNullable = propType => (props, propName, ...rest) =>
        props[propName] === null ? null : propType(props, propName, ...rest);
    static defaultImage = "/image-not-found.png"


    static getUserId(){
        return localStorage.getItem('userId')
    }

    /**
     *
     * @param {Array} disabledArr
     * @param {Number} maxLength
     */
    static disableMinutes(disabledArr = [], maxLength = 60){
        const minutes = [];
        for (let i = 0; i < maxLength; i++) {
            if (i < 9 || i > 10) {
                if(disabledArr.includes(i)){
                    minutes.push(i);
                }
            }
        }
        return minutes;
    }
    static randomColorStr() {
        let myArray = [
            "cyan",
            "red",
            "orange",
            "yellow",
            "blue",
            "green",
            "purple"
        ];

        return myArray[Math.floor(Math.random() * myArray.length)];
    }
    static beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    static MenuObjectToArray(obj) {
        try {
            let initialArray = []
            if (typeof (obj) === 'object' && Object.keys(obj).length > 0) {
                Object.keys(obj).forEach((key) => {
                    let item = obj[key]
                    initialArray.push({
                        menu_name: key,
                        ...item,
                    })
                })
            }
            return initialArray ?? []
        } catch (err) {
            return []
        }
    }

    static getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    static ObjectToArray(obj, objName = ['background', 'layouts', 'text']) {
        try {
            let initialArray = []

            if (typeof (obj) === 'object' && Object.keys(obj).length > 0) {
                if (Array.isArray(objName) && objName.length > 0) {
                    for (let i = 0; i < objName.length; i++) {
                        Object.keys(obj).forEach((key) => {
                            if (key === objName[i]) {
                                initialArray.push({
                                    tab_name: key,
                                    ...obj[key]

                                })
                            }
                        })
                    }
                }
            }
            return initialArray ?? []
        } catch (err) {
            return []
        }
    }

    /**
     * Get first character from first & last sentences of a username
     * @param {String} name - Username
     * @return {String} 2 characters string
     */
    static getNameInitial(name) {
        let initials = name.match(/\b\w/g) || [];
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }

    /**
     * Get current path related object from Navigation Tree
     * @param {Array} navTree - Navigation Tree from directory 'configs/NavigationConfig'
     * @param {String} path - Location path you looking for e.g '/app/dashboards/analytic'
     * @return {Object} object that contained the path string
     */
    static getRouteInfo(navTree, path) {
        if (navTree?.path === path) {
            return navTree;
        }
        let route;
        for (let p in navTree) {
            if (navTree.hasOwnProperty(p) && typeof navTree[p] === 'object') {
                route = this.getRouteInfo(navTree[p], path);
                if (route) {
                    return route;
                }
            }
        }
        return route;
    }

    /**
     * Get accessible color contrast
     * @param {String} hex - Hex color code e.g '#3e82f7'
     * @return {String} 'dark' or 'light'
     */
    static getColorContrast(hex) {
        if (!hex) {
            return 'dark'
        }
        const threshold = 130;
        const hRed = hexToR(hex);
        const hGreen = hexToG(hex);
        const hBlue = hexToB(hex);

        function hexToR(h) {
            return parseInt((cutHex(h)).substring(0, 2), 16)
        }

        function hexToG(h) {
            return parseInt((cutHex(h)).substring(2, 4), 16)
        }

        function hexToB(h) {
            return parseInt((cutHex(h)).substring(4, 6), 16)
        }

        function cutHex(h) {
            return (h.charAt(0) === '#') ? h.substring(1, 7) : h
        }

        const cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;
        if (cBrightness > threshold) {
            return 'dark'
        } else {
            return 'light'
        }
    }

    /**
     * Darken or lighten a hex color
     * @param {String} color - Hex color code e.g '#3e82f7'
     * @param {Number} percent - Percentage -100 to 100, positive for lighten, negative for darken
     * @return {String} Darken or lighten color
     */
    static shadeColor(color, percent) {
        let R = parseInt(color.substring(1, 3), 16);
        let G = parseInt(color.substring(3, 5), 16);
        let B = parseInt(color.substring(5, 7), 16);
        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);
        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;
        const RR = ((R.toString(16).length === 1) ? `0${R.toString(16)}` : R.toString(16));
        const GG = ((G.toString(16).length === 1) ? `0${G.toString(16)}` : G.toString(16));
        const BB = ((B.toString(16).length === 1) ? `0${B.toString(16)}` : B.toString(16));
        return `#${RR}${GG}${BB}`;
    }

    /**
     * Convert RGBA to HEX
     * @param {String} rgba - RGBA color code e.g 'rgba(197, 200, 198, .2)')'
     * @return {String} HEX color
     */
    static rgbaToHex(rgba) {
        const trim = str => (str.replace(/^\s+|\s+$/gm, ''))
        const inParts = rgba.substring(rgba.indexOf("(")).split(","),
            r = parseInt(trim(inParts[0].substring(1)), 10),
            g = parseInt(trim(inParts[1]), 10),
            b = parseInt(trim(inParts[2]), 10),
            a = parseFloat(trim(inParts[3].substring(0, inParts[3].length - 1))).toFixed(2);
        const outParts = [
            r.toString(16),
            g.toString(16),
            b.toString(16),
            Math.round(a * 255).toString(16).substring(0, 2)
        ];

        outParts.forEach(function (part, i) {
            if (part.length === 1) {
                outParts[i] = '0' + part;
            }
        })
        return (`#${outParts.join('')}`);
    }

    /**
     * Returns either a positive or negative
     * @param {Number} number - number value
     * @param {any} positive - value that return when positive
     * @param {any} negative - value that return when negative
     * @return {any} positive or negative value based on param
     */
    static getSignNum(number, positive, negative) {
        if (number > 0) {
            return positive
        }
        if (number < 0) {
            return negative
        }
        return null
    }

    /**
     * Returns either ascending or descending value
     * @param {Object} a - antd Table sorter param a
     * @param {Object} b - antd Table sorter param b
     * @param {String} key - object key for compare
     * @return {any} a value minus b value
     */
    static antdTableSorter(a, b, key) {
        if (typeof a[key] === 'number' && typeof b[key] === 'number') {
            return a[key] - b[key]
        }

        if (typeof a[key] === 'string' && typeof b[key] === 'string') {
            a = a[key].toLowerCase();
            b = b[key].toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
        }

    }

    /**
     * Filter array of object
     * @param {Array} list - array of objects that need to filter
     * @param {String} key - object key target
     * @param {any} value  - value that excluded from filter
     * @return {Array} a value minus b value
     */
    static filterArray(list, key, value) {
        let data = list
        if (list) {
            data = list.filter(item => item[key] === value)
        }
        return data
    }

    /**
     * Remove object from array by value
     * @param {Array} list - array of objects
     * @param {String} key - object key target
     * @param {any} value  - target value
     * @return {Array} Array that removed target object
     */
    static deleteArrayRow(list, key, value) {
        let data = list
        if (list) {
            data = list.filter(item => item[key] !== value)
        }
        return data
    }

    /**
     * Wild card search on all property of the object
     * @param {Number | String} input - any value to search
     * @param {Array} list - array for search
     * @return {Array} array of object contained keyword
     */
    static wildCardSearch(list, input) {
        const searchText = (item) => {
            for (let key in item) {
                if (item[key] == null) {
                    continue;
                }
                if (item[key].toString().toUpperCase().indexOf(input.toString().toUpperCase()) !== -1) {
                    return true;
                }
            }
        };
        list = list.filter(value => searchText(value));
        return list;
    }

    /**
     * Get Breakpoint
     * @param {Object} screens - Grid.useBreakpoint() from antd
     * @return {Array} array of breakpoint size
     */
    static getBreakPoint(screens) {
        let breakpoints = []
        for (const key in screens) {
            if (screens.hasOwnProperty(key)) {
                const element = screens[key];
                if (element) {
                    breakpoints.push(key)
                }
            }
        }
        return breakpoints
    }

    static getToken(type = 'get') {
        if (!localStorage) return null
        try {
            switch (type) {
                case "get":
                    if (localStorage.getItem("token")) {
                        return localStorage.getItem("token")
                    }
                    return null
                case "remove":
                    if (localStorage.getItem("token")) {
                        localStorage.removeItem('token')
                        return true
                    }
                    return true
                default:
                    if (localStorage.getItem("token")) {
                        return localStorage.getItem("token")
                    }
                    return null


            }


        } catch (err) {
            return null
        }

    }


    /**
     * format number
     * @param number
     * @param replaceTo
     * @returns {string}
     */
    static numberFormat = (number = Number, replaceTo = ',', prefix = null, prefixTo = '') => {
        let value = parseFloat(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, replaceTo);
        return prefix ? [prefix, value].join(prefixTo) : value
    }

    static onChangeParams(key = 'tab', value, ...arg) {
        if (window) {
            const urlSearch = new URLSearchParams(window.location.search)
            if (urlSearch.get(key)) {
                urlSearch.delete(key)
                urlSearch.append(key, value)
            } else {
                urlSearch.append(key, value)
            }
            let query = []
            urlSearch.forEach((value, key) => {
                query.push(`${key}=${value}`)
            })

            let newUrl = [window.origin, window.location.pathname].join("")
            window.history.pushState({...arg}, null, [newUrl, query.join("&")].join("?"));

        }
    }


    static async debounce(time = 1000, callback = function () {}, timeout) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            callback()
        }, time)
    }

}

export default Utils;
