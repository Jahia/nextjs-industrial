import React from 'react'
import {Head, Html, Main, NextScript} from 'next/document'


export default function Document() {
//     const isEditMode = true// React.useContext(JahiaCtx);
//     const props = isEditMode ? {"jahia-parse-html":true}:{}
// console.log("[Document] isEditMode: ",isEditMode);
//     const props = {"jahia-parse-html":true}

    // console.log("[Document] props: ",props);
    return (
        <Html>
            <Head>
                {/* todo get script dynamically */}
                {/* eslint-disable-next-line react/no-danger */}
                <script type="application/javascript" dangerouslySetInnerHTML={{__html:`window.jtrackerCustomConfig = { /* Additional custom jtracker configuration goes here*/ }`}}/>
                {/* eslint-disable-next-line react/no-danger */}
                <script type="application/javascript" dangerouslySetInnerHTML={{__html:`window.jtrackerConfig = {"core":{"jahiaServerUrl":"http://jahia:8080","jahiaServerContextPath":"","jExperienceModuleVersion":"2_4_0-SNAPSHOT","jCustomerPublicUrl":"http://jcustomer:8181","jCustomerRequestsTimeout":1500,"jCustomerCookieName":"context-profile-id"},"context":{"scope":"headless-industrial","lang":"en","siteID":"headless-industrial"}};`}}/>
                <script type="text/javascript" src="http://jahia:8080/modules/jexperience/javascript/jexperience/dist/2_4_0-SNAPSHOT/tracking-script.min.js"/>
            </Head>
            <body jahia-parse-html="true">
                <Main/>
                <NextScript/>
            </body>
        </Html>
    )
}
