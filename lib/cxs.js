import React, {useEffect, useRef, useState} from "react";
import * as PropTypes from "prop-types";

const CxsCtx = React.createContext({});

function CxsCtxProvider({children}) {
    const [cxs, setCxs] = useState(null);

    const callBack = useRef(() => {
        setCxs(window.cxs);
    });
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.cxs) {
                setCxs(window.cxs);
            } else if (window.digitalData) {
                window.digitalData.loadCallbacks = window.digitalData.loadCallbacks || [];
                window.digitalData.loadCallbacks.push(callBack);
            }
        } else {
            // TODO Read CXS from cookies
        }

        return () => {
            if (typeof window !== "undefined" && window.digitalData) {
                const index = window.digitalData.loadCallbacks.indexOf(callBack);
                if (index !== -1) {
                    window.digitalData.loadCallbacks.splice(index, 1);
                }
            }
        }
    })

    return (
        <CxsCtx.Provider value={cxs}>
            {children}
        </CxsCtx.Provider>
    )
}
CxsCtxProvider.propTypes = {
    children: PropTypes.node
}
const {Consumer: CxsCtxConsumer} = CxsCtx;
export {CxsCtx, CxsCtxProvider, CxsCtxConsumer};
