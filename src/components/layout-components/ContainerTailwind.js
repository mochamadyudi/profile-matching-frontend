import React from 'react'
import PropTypes from 'prop-types'
import {ComponentChildren} from "./component-children";

function ContainerTailwind(props){
    return (
        <div {...props} className={props?.className ? [props?.className, "mk-w-full !mk-max-w-[1444px]  !mk-mx-auto mk-px-0"].join(' '): "mk-w-full !xl:mk-max-w-[1028px] 2xl:mk-max-w-[1444px]  !mk-mx-auto mk-px-0"}>
            <ComponentChildren children={props.children ?? null}/>
        </div>
    )
}
export default ContainerTailwind