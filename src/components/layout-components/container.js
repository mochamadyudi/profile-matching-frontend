import React from 'react'


/**
 *
 * @param {(Object|undefined)} props
 * @param {(string|undefined)} props.className
 * @param {(Element|ChildNode)} props.children
 * @returns {JSX.Element}
 * @constructor
 */
function Container(props){
    return (
        <div className={`${['mk-mx-auto mk-max-w-screen-xl',props?.className].join(" ")}`}>
            {props.children}
        </div>
    )
}

export default Container