import * as React from 'react';

import icons from "./icons/icons";

export const IconOptions = {
    ...icons,
}

export const Icon = ({
                         data,
                         parentColor = '',
                         className = '',
                         tinaField = '',
                     }) => {


    if (IconOptions[data.name] === null || IconOptions[data.name] === undefined) {
        return null
    }

    const IconSVG = IconOptions[data.name];

    return (
        <IconSVG
            data-tinafield={tinaField}
            className={`${className}`}
        />
    )
}
