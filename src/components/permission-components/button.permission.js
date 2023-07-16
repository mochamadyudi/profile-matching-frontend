import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {PERMISSION_ONE_OF} from "../../constants/component.constants";
import {Button, notification} from "antd";

function ButtonMaster(props){
    let { visible,config } = props
    if(!visible) return null
    return (
        <Button {...config} className={'btn-master'}>
            {props?.children ?? null}
        </Button>
    )
}

function ButtonByType(props){
    let { theme,config  } = props
    switch (theme?.type){
        case "visible":
            return (
                <ButtonMaster
                    visible={true}
                    config={{...config}}
                >
                    {props?.children ?? null}
                </ButtonMaster>
            )
        case "disabled":
            return (
                <ButtonMaster
                    visible={true}
                    config={{
                        ...config,
                        disabled:true
                    }}
                >
                    {props?.children ?? null}
                </ButtonMaster>
            )
        case "notification":
            return (
                <ButtonMaster
                    visible={true}
                    config={{
                        ...config,
                        onClick: function(){
                            notification.open({
                                message: props?.theme?.property?.message ?? "Access Denied",
                                description: props?.theme?.property?.description ?? "Anda Tidak dapat Melakukan aksi",
                                duration: props?.theme?.property?.duration ?? 0,
                            })
                        }
                    }}
                >
                    {props?.children ?? null}
                </ButtonMaster>
            )
        case "hidden":
        default:
            return null
    }
}

/**
 *
 * @param {Object} props
 * @param {Object} props.theme
 * @param {("element"| "visible" | "disabled" | "notification" | "hidden")} props.theme.type
 * @param {Object} props.theme.property
 * @param {(String|"Access Denied"|undefined|null)} props.theme.property.message
 * @param {(String|"Anda Tidak Dapat Melakukan Aksi"|undefined|null)} props.theme.property.description
 * @returns {JSX.Element}
 * @constructor
 */
function ButtonPermission(props){
    let { permission,role,config,theme} = props
    if(!permission){
        return <ButtonByType {...props} theme={theme}/>
    }
    if(typeof(permission) === 'string' && permission === role){
        return (
            <ButtonMaster
                visible={true}
                config={config}
            >
                {props?.children ?? null}
            </ButtonMaster>
        )
    }
    if(Array.isArray(permission) && permission.filter((child)=> child === role).length > 0){
        return (
            <ButtonMaster
                visible={true}
                config={config}
            >
                {props?.children ?? null}
            </ButtonMaster>
        )
    }
    return <ButtonByType {...props} theme={theme}/>

}

ButtonPermission.propTypes = {
    theme: PropTypes.shape({
        type: PropTypes.oneOf(['hidden','disabled','visible','notification','message']),
        property: PropTypes.any,
    }),
    permission: PropTypes.oneOfType([
        PropTypes.any,
        PropTypes.string.isRequired,
        PropTypes.array.isRequired
    ]),
    config: PropTypes.shape({
        type: PropTypes.oneOf(['primary','ghost','link','dashed','text','default']),
        onClick: PropTypes.func,
        target: PropTypes.string,
        size: PropTypes.oneOf(['large','middle','small']),
        shape: PropTypes.oneOf(['default','circle','round']),
        loading: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.shape({
                delay: PropTypes.number
            })
        ]),
        htmlType: PropTypes.oneOf(['button','submit']),
        href: PropTypes.oneOfType([
            PropTypes.any,
            PropTypes.string
        ]),
        ghost: PropTypes.oneOf([false, true]),
        disabled: PropTypes.oneOf([false, true]),
        block: PropTypes.oneOf([true, false]),
        danger: PropTypes.oneOf([false, true]),
        icon: PropTypes.node,
    })
}
ButtonPermission.defaultProps = {
    role: 'admin',
    theme: {
        type:"element",
        property: {}
    },
    permission: PERMISSION_ONE_OF,
    config:{
        block: false,
        danger: false,
        disabled: false,
        ghost: false,
        href: null,
        icon: null,
        loading: false,
        shape:'default',
        size:'large',
        target:null,
        type:'default',
        onClick: function(){}
    }
}

export default connect(()=> {
    return {}
},{})(React.memo(ButtonPermission))