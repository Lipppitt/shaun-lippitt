import React from 'react';

function ThemeSwitch() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="256"
            height="256"
            viewBox="0 0 256 256"
            xmlSpace="preserve"
        >
            <g transform="translate(128 128) scale(0.72 0.72)">
                <g style={{ stroke: 'none', strokeWidth: 0, fill: 'none', fillRule: 'nonzero' }} transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)">
                    <circle cx="45" cy="45" r="41" style={{ fill: 'rgb(255, 255, 255)' }} transform="matrix(1 0 0 1 0 0)" />
                    <circle cx="45" cy="45" r="41" style={{ fill: 'rgb(255, 255, 255)' }} transform="matrix(1 0 0 1 0 0)" />
                    <path
                        d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z M 45 8 C 24.598 8 8 24.598 8 45 c 0 20.402 16.598 37 37 37 c 20.402 0 37 -16.598 37 -37 C 82 24.598 65.402 8 45 8 z"
                        style={{ fill: 'rgb(0, 0, 0)', fillRule: 'nonzero' }}
                        transform="matrix(1 0 0 1 0 0)"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 45 86 C 22.356 86 4 67.644 4 45 S 22.356 4 45 4 V 86 z"
                        style={{ fill: 'rgb(0, 0, 0)', fillRule: 'nonzero' }}
                        transform="matrix(1 0 0 1 0 0)"
                        strokeLinecap="round"
                    />
                </g>
            </g>
        </svg>
    );
}
export default ThemeSwitch;
