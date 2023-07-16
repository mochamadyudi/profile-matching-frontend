import Utils from "../utils";
import AxiosInstance from "../utils/axios-instance";
import axios from "axios";
import AxiosExpress from "../utils/axios-express";
import {message} from "antd";

export default class ApiService {
  
  /**
   *
   * @param {object} props
   * @param {object} props.config
   * @param {string} props.url
   * @param {string | object | []} props.body
   * @param {string} props.responseType
   * @param {'default' | 'local' | 'server' | 'express'} props.mode
   */
      constructor(props = {}) {
        this.url = props?.url ?? "/"
        this.mode = props?.mode ?? "server"
        this.body = props?.body ?? ""
        this.responseType = props?.responseType ??null
        this.config = {
            ...props?.config,
            params:props?.config?.params ?? {},
            headers:  {
                ...props?.config?.headers,
                'Authorization': props?.config?.headers?.Authorization ?? `Bearer ${Utils.getToken('get')}`
            }
        }
        
        if(this.mode === 'local'){
          this.http = axios
        }else if (this.mode === 'server'){
          this.http = AxiosInstance
        }else if (this.mode === 'express'){
          this.http = AxiosExpress
        }else{
          this.http = AxiosInstance
        }

    }
    async get(){
        try{
            if(this.responseType){
                Reflect.set(this.config,'responseType',this.responseType)
            }
            return await this.http.get(this.url,{
                ...this.config
            })
                .then((response)=> {
                    let data = response?.data
                    let fields = {
                        ...response,
                        ...data,
                    } ?? {}


                    if(typeof(data?.query) !== "undefined"){
                        Reflect.set(fields,"params", data?.query)
                    }
                    if(typeof(data?.params) !== "undefined"){
                        Reflect.set(fields,"params", data?.params)
                        if(!data?.pagination){
                            fields = {
                                ...fields,
                                pagination: {
                                    max_page: data?.params?.max_page ?? 0,
                                    limit: data?.params?.limit ?? 0,
                                    page: data?.params?.page ?? 0,
                                    total_record: data?.params?.total_record ?? 0,
                                    total_page: data?.params?.total_page ?? 0,
                                }
                            }
                        }
                    }

                    if(typeof(data?.pagination) !== "undefined"){
                        Reflect.set(fields,"pagination", data?.pagination)
                    }

                    if(typeof(data?.data) !== "undefined"){
                        Reflect.set(fields,"data", data?.data)
                    }
                    if(typeof(data?.error) !== "undefined"){
                        Reflect.set(fields,"error",data?.error)
                    }
                    if(typeof(data?.message) !== "undefined"){
                        Reflect.set(fields,"message",data?.message)
                    }
                    return fields
                })
                .catch((err)=> {
                    return {
                        error:true,
                        message: err.message,
                        data: null
                    }
                })
        }catch(err){
            return {
                error:true,
                message: err.message,
                data: null
            }
        }
    }
    async patch(){
        try{
            return await this.http.patch(this.url,this.body, {
                ...this.config
            })
                .then((response)=> {
                    let data = response?.data
                    let fields = {
                        ...data,
                    }
                    if(typeof(data?.pagination) !== "undefined"){
                        Reflect.set(fields,"pagination", data?.pagination)
                    }
                    if(typeof(data?.query) !== "undefined"){
                        Reflect.set(fields,"params", data?.query)
                    }
                    if(typeof(data?.params) !== "undefined"){
                        Reflect.set(fields,"params", data?.params)
                    }

                    if(typeof(data?.data) !== "undefined"){
                        Reflect.set(fields,"data", data?.data)
                    }
                    if(typeof(data?.error) !== "undefined"){
                        Reflect.set(fields,"error",data?.error)
                    }
                    if(typeof(data?.message) !== "undefined"){
                        Reflect.set(fields,"message",data?.message)
                    }
                    return fields
                })
                .catch((err)=> {
                    return {
                        error:true,
                        message: err.message,
                        data: null
                    }
                })
        }catch(err){
            return {
                error:true,
                message: err.message,
                data: null
            }
        }
    }
    async post(){
        try{
            return await this.http.post(this.url,this.body,{
                ...this.config
            })
                .then((response)=> {
                    let data = response?.data
                    let fields = {
                        ...data,
                    }
                    if(typeof(data?.pagination) !== "undefined"){
                        Reflect.set(fields,"pagination", data?.pagination)
                    }
                    if(typeof(data?.query) !== "undefined"){
                        Reflect.set(fields,"params", data?.query)
                    }
                    if(typeof(data?.params) !== "undefined"){
                        Reflect.set(fields,"params", data?.params)
                    }

                    if(typeof(data?.data) !== "undefined"){
                        Reflect.set(fields,"data", data?.data)
                    }
                    if(typeof(data?.error) !== "undefined"){
                        Reflect.set(fields,"error",data?.error)
                    }
                    if(typeof(data?.message) !== "undefined"){
                        Reflect.set(fields,"message",data?.message)
                    }
                    return fields
                })
                .catch((err)=> {
                  message.error(err?.message ?? "Error: Some Error")
                    return {
                        error:true,
                        message: err.message,
                        data: null
                    }
                })
        }catch(err){
            return {
                error:true,
                message: err.message,
                data: null
            }
        }
    }
    async put(){
        try{
            return await this.http.put(this.url,this.body,{
                ...this.config
            })
                .then((response)=> {
                    let data = response?.data
                    let fields = {}
                    if(typeof(data?.pagination) !== "undefined"){
                        Reflect.set(fields,"pagination", data?.pagination)
                    }
                    if(typeof(data?.query) !== "undefined"){
                        Reflect.set(fields,"params", data?.query)
                    }
                    if(typeof(data?.params) !== "undefined"){
                        Reflect.set(fields,"params", data?.params)
                    }

                    if(typeof(data?.data) !== "undefined"){
                        Reflect.set(fields,"data", data?.data)
                    }
                    if(typeof(data?.error) !== "undefined"){
                        Reflect.set(fields,"error",data?.error)
                    }
                    if(typeof(data?.message) !== "undefined"){
                        Reflect.set(fields,"message",data?.message)
                    }
                    return fields
                })
                .catch((err)=> {
                    return {
                        error:true,
                        message: err.message,
                        data: null
                    }
                })
        }catch(err){
            return {
                error:true,
                message: err.message,
                data: null
            }
        }
    }
    async delete(){
        try{
            return await this.http.delete(this.url, {
                ...this.config
            })
                .then((response)=> {
                    let data = response?.data
                    let fields = {
                      ...data,
                    }
                    if(typeof(data?.pagination) !== "undefined"){
                        Reflect.set(fields,"pagination", data?.pagination)
                    }
                    if(typeof(data?.query) !== "undefined"){
                        Reflect.set(fields,"params", data?.query)
                    }
                    if(typeof(data?.params) !== "undefined"){
                        Reflect.set(fields,"params", data?.params)
                    }

                    if(typeof(data?.data) !== "undefined"){
                        Reflect.set(fields,"data", data?.data)
                    }
                    if(typeof(data?.error) !== "undefined"){
                        Reflect.set(fields,"error",data?.error)
                    }
                    if(typeof(data?.message) !== "undefined"){
                        Reflect.set(fields,"message",data?.message)
                    }
                    return fields
                })
                .catch((err)=> {
                    return {
                        error:true,
                        message: err.message,
                        data: null
                    }
                })
        }catch(err){
            return {
                error:true,
                message: err.message,
                data: null
            }
        }
    }
}