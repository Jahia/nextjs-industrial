import React from 'react';
import {Head, Html, Main, NextScript} from 'next/document';

export default function Document() {
//     Const isEditMode = true// React.useContext(JahiaCtx);
//     const props = isEditMode ? {"jahia-parse-html":true}:{}
// console.log("[Document] isEditMode: ",isEditMode);
//     const props = {"jahia-parse-html":true}

    // console.log("[Document] props: ",props);
    return (
        <Html>
            <Head/>
            <body jahia-parse-html="true">
                <Main/>
                <NextScript/>
            </body>
        </Html>
    );
}
