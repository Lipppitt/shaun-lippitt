import React from 'react'

export const Container = ({
                              children,
                              className = '',
                              ...props
                          }) => {
    return (
        <div
            className={`${className}`}
            {...props}
        >
            {children}
        </div>
    )
}
