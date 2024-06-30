import {useEffect, useState} from 'react'
import Head from 'next/head'
import { Header } from './header'
import { Footer } from './footer'
import layoutData from '../../content/global/index.json'

export const Layout = ({ rawData = {}, data = layoutData, children }) => {
    return (
        <>
            <div
                className={`h-100 d-flex flex-column`}>
                <Header data={data?.header} />
                <div className="flex-grow-1">
                    {children}
                </div>
                <Footer
                    rawData={rawData}
                    data={data?.footer}
                    icon={data?.header.icon}
                />
            </div>
        </>
    )
}
