import * as React from 'react';
import {Icon, IconOptions} from "../util/icon";
import {wrapFieldsWithMeta} from "tinacms";

const parseIconName = (name) => {
    const splitName = name.split(/(?=[A-Z])/)
    if (splitName.length > 1) {
        return splitName.slice(1).join(' ')
    } else {
        return name
    }
}

export const IconPickerInput = wrapFieldsWithMeta(({ input }) => {

    const filteredBlocks = React.useMemo(() => {
        return Object.keys(IconOptions).filter((name) => {
            return name.toLowerCase()
        })
    }, []);

    const inputLabel = Object.keys(IconOptions).includes(input.value)
        ? parseIconName(input.value)
        : 'Select Icon'

    const InputIcon = IconOptions[input.value] ? IconOptions[input.value] : null

    return (
        <div className="relative z-[1000]">
            <input type="text" id={input.name} className="hidden" {...input} />
            {/*<Button*/}
            {/*    className={`text-sm h-11 px-4 ${InputIcon ? 'h-11' : 'h-10'}`}*/}
            {/*    size="custom"*/}
            {/*    rounded="full"*/}
            {/*    variant={open ? 'secondary' : 'white'}*/}
            {/*>*/}
            {/*    {InputIcon && (*/}
            {/*        <InputIcon className="w-7 mr-1 h-auto fill-current text-blue-500" />*/}
            {/*    )}*/}
            {/*    {inputLabel}*/}
            {/*</Button>*/}
            {filteredBlocks.length === 0 && (
                <span className="relative text-center text-xs px-2 py-3 text-gray-300 bg-gray-50 italic">
                          No matches found
                        </span>
            )}
            {filteredBlocks.length > 0 && (
                <div className="w-full grid grid-cols-6 auto-rows-auto p-2 overflow-y-auto">
                    <button
                        className="relative rounded-lg text-center text-xs py-2 px-3 flex-1 outline-none transition-all ease-out duration-150 hover:text-blue-500 focus:text-blue-500 focus:bg-gray-50 hover:bg-gray-50"
                        key={'clear-input'}
                        onClick={() => {
                            input.onChange('')
                            close()
                        }}
                    >
                    </button>
                    {filteredBlocks.map((name) => {
                        return (
                            <button
                                className="relative flex items-center justify-center rounded-lg text-center text-xs py-2 px-3 flex-1 outline-none transition-all ease-out duration-150 hover:text-blue-500 focus:text-blue-500 focus:bg-gray-50 hover:bg-gray-50"
                                key={name}
                                onClick={() => {
                                    input.onChange(name)
                                }}
                            >
                                <Icon
                                    data={{
                                        name: name,
                                        size: 'custom',
                                        color: 'blue',
                                    }}
                                    className="w-7 h-auto"
                                />
                                {name}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
});

