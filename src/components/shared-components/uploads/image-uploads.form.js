import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import {DeleteOutlined,UploadOutlined} from "@ant-design/icons";
import {Input, Form, message, Button,Image, Upload} from "antd";
import Utils from "../../../utils";
import ApiService from "../../../services/api.service";
import Flex from "../Flex";


/**
 *
 * @param { Object } props
 * @param { FunctionCallbackImageUpload } props.onCallback
 * @param { FunctionOnDeleteImageUpload } props.onDelete
 * @param { String[] | Array | string | } props.name
 * @param { String } props.label
 * @param { ...* } props.config
 * @param { String } props.initialValue
 * @returns {JSX.Element}

 */
function ImageUploadsForm(props)  {
    let {
        label = 'images',
        name,
        type = 'image',
        initialValue = null,
        onCallback,
        onDelete
    } = props

    /**
     * @namespace {Object}
     * @property {ReferenceState} 0
     * @property {ReferenceStateSetter} 1
     */
    const [ images,setImages] = useState(
        ()=> {
        if(initialValue) return initialValue
        return null
        }
    )
    
    useEffect(()=> {
        setImages(initialValue)
    },[initialValue])


    const imageUploadProps = {
        name: 'file',
        multiple: false,
        customRequest: async ({file, onSuccess}) => {

            const formdata = new FormData()
            formdata.append("file", file)
            message.loading({content: "Loading...", key: "update-thumbnail", duration: 10})
            const [ err, newData ] = await new ApiService({
                url:`/api/v1/media/upload`,
                body: formdata
            }).post()
                .then((response)=> {
                    setImages([process.env.REACT_APP_API_MASTER,response?.data?.url].join(''))
                    return [ null , response?.data]
                })
                .catch((err)=> {
                    return [ err, null ]
                })

            if(err){

            }else{
                const src = await new Promise(resolve => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                });
                message.success({content: "Successfully uploaded", key: "update-thumbnail", duration: 10})
                if(typeof(onCallback) !== 'undefined' && typeof(onCallback) === 'function'){
                    onCallback(src, newData)
                }
                onSuccess('ok')
            }
        },
        // onPreview: onPreview,
        showUploadList: false,
    }
    const onDeleteImage = ()=> {
        if(typeof(onDelete) !== 'undefined' && typeof(onDelete) === 'function'){
            onDelete({})
            setImages(null)
        }
    }
  return (
   <div>
       <div className={'mb-4'}>
           <Form.Item name={name} label={label} initialValue={images} {...props?.config}>
               <Input placeholder={'Input your logo'} defaultValue={images} value={images}/>
           </Form.Item>
           <div className={'w-100 yid-editor--component'}>
               {
                   images && (
                       <div className={'yid-editor--component-btn'} onClick={onDeleteImage}>
                           <DeleteOutlined/>
                       </div>
                   )
               }

               <div className="yid-editor--component-img">
                   <Image
                       preview={!!images}
                       sizes={120}
                       src={images ? [process.env.REACT_APP_API_MASTER,images].join('') : Utils.defaultImage}
                       width={320}
                       style={{
                           width:"100%",
                           minHeight:220,
                           objectFit:"cover",
                           objectPosition:"center"
                       }}
                   />
               </div>

           </div>
           <Flex alignItems={'center'} mobileFlex={true}
                 className={'yid-img-uploads mt-4'}>
               <Upload {...imageUploadProps} multiple={false}
                       beforeUpload={Utils.beforeUpload}>
                   <div className={'w-100 border'} style={{width:"100%"}}>
                       <Button
                           icon={<UploadOutlined/>}
                           type={'primary'}
                           size={'small'}
                           style={{width: '100%'}}>Click to Upload</Button>
                   </div>
               </Upload>
           </Flex>
       </div>
   </div>
  );
}

export default ImageUploadsForm