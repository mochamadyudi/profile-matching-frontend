import {message} from "antd";
import ApiService from "../services/api.service";
import {isDefined, isFunction} from "./helpers";

class Events {
    /**
     * @param  {(Object|string|number|string[]|number[]|Array|undefined)} props
     * @param { (function|boolean ) } [props.callback=false]
     * @param {('dashboard'|'thin-client'|'airlines'|'city'|'audio'|'audio-announcement'|string|string[])} [props.type=null]
     * @param {(Object|string|FormData|URLSearchParams|undefined|null)} props.body
     * @param {(Object|undefined|null)} props.params
     * @param { (string|boolean|number|null|undefined) } props.value
     * @param { (string|number) } props.key
     * @param { ('v1'|'v2'|string|number) } props.version
     * @param {('delete'|'update'|string|boolean|undefined)} [props.event=false]
     */
    constructor({...props}) {
        this.props = {
            ...props,
            version: props?.version ?? 'v1'
        }
    }

    onClick() {
        if (!this.props.event) throw new Error('Error: args event must be defined');
        if (typeof (this[this.props.event]) === 'undefined' && typeof (this[this.props.event]) !== 'function') throw new Error("Error: args event not be function")
        return this[this.props.event]();
    }

    /**
     * @returns {{callback?: (Function|boolean), type?: ("dashboard"|"thin-client"|"airlines"|"city"|"audio"|"audio-announcement"|string|string[]), value: string, event?: ("onClick"|boolean)}|string|number|string[]|number[]|Array|undefined}
     * @private
     */
    async delete() {
        try {
            let keys = 'deletable';
            if (!this.props.type) throw new Error('Error: args type must be defined');
            if (!this.props.value) throw new Error('Error: args value must be defined');
            message.loading({
                key: keys,
                content: 'Loading...',
                duration: 1
            });
            if (isDefined(this.props, 'callback') && isFunction(this.props, 'callback')) {
                this.props.callback([this.props, null])
            }
            setTimeout(() => {
                message.success({
                    key: keys,
                    content: 'Successfully Deleted',
                    duration: 2
                });
            }, 1000)
            clearTimeout();


            /**
             * call service
             */
            // return await new ApiService({
            //     url: [this._apiUrl, this.props.value].join('/'),
            // }).delete()
            //     .then((response) => {
            //         if (isDefined(this.props, 'callback') && isFunction(this.props, 'callback')) {
            //             this.props.callback([this.props, response])
            //         }
            //         message.info({
            //             key: keys,
            //             content: response?.message ?? response?.msg ?? "",
            //             duration: 3000
            //         });
            //         return [null, [this, response]]
            //     })
            //     .catch((err) => {
            //         message.error({
            //             key: keys,
            //             content: err?.msg ?? "",
            //             duration: 3000
            //         });
            //         return [err, null]
            //     })

            return [null, [this.props, null]]

        } catch (err) {
            return [err, null]
        }
    }

    get _apiUrl() {
        let prefix = `/api${this.props.version ? ['/', this.props.version].join('') : ""}`
        switch (this.props.type) {
            case "airlines":
                return `${prefix}/master-data/airlines`
            case "city":
                return `${prefix}/master-data/city`
            case "thin-client":
            default:
                return "/api"

        }
    }
}


export {Events}
