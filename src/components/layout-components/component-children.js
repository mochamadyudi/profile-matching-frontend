import React from 'react'
export const ComponentChildren = ({children}) => {
    return !children ? '':(
        React.Children.map(children, (child, i) => {
                return child !== null && typeof(child) !== 'string' ? (
                    React.cloneElement(child, {
                        ...child.props,
                        key: child,
                    })
                ): child !== null ? child: ''
            }

        )
    )
}