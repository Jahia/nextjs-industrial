import React, {useEffect} from 'react'
import {JahiaCtxProvider} from '../lib/context'
import {client, inMemoryCache} from "../lib/apollo";
import {ApolloProvider} from "@apollo/client";
import {renderToStringWithData} from "@apollo/client/react/ssr";
import App from "next/dist/pages/_app";

import {getPageInfo} from '../lib/pages';

import '../styles/style.scss';
import {getPathAndQuery} from "../lib/utils";
import * as PropTypes from "prop-types";
import * as internalRouter from "next/dist/shared/lib/router/router";
import jahia from "../jahia";
import { useRouter } from "next/router";
import {CxsCtxProvider} from "../lib/cxs";

const previousResolveHref = internalRouter.resolveHref;

function MyApp({Component, pageProps: {apolloState, ...pageProps}}) {

    useEffect(() => {
        console.log("[MyApps] pageProps:", JSON.stringify(pageProps))
    }, [pageProps]);

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
        // import("../public/static/js/jquery.waypoints.min.js");
        // import("../public/static/js/main.js");
    }, []);

    const nextRouter = useRouter()
    useEffect(() => {
        const handleRouteChange = (url) => {
            console.log(`App is changing to ${url}`)
            if (typeof window !== "undefined" && window.wem) {
                window.wem.contextLoaded = false
                window.wem.loadContext();
            }
        }

        nextRouter.events.on('routeChangeComplete', handleRouteChange)

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            nextRouter.events.off('routeChangeComplete', handleRouteChange)
        }
    }, []);

    if (pageProps.isPreview && !internalRouter.resolveHref.patched) {
        internalRouter.resolveHref = (router, href, resolveAs) => {
            console.log('[_app.resolveHref] href : ',href);
            return previousResolveHref(router, href.startsWith('/') ? jahia.paths.preview + '/' + pageProps.locale + href : href, resolveAs);
        }
        internalRouter.resolveHref.patched = true
    }

    if (process.browser && apolloState) {
        console.log('restoring cache..')
        inMemoryCache.restore(apolloState);
    }
    console.log('[MyApp] render')
    return (
        <JahiaCtxProvider value={{
            workspace: pageProps.isPreview ? "EDIT" : "LIVE",
            isEditMode: pageProps.isEditMode ? pageProps.isEditMode : false,
            locale: pageProps.locale
        }}
        >
            <ApolloProvider client={client}>
                <CxsCtxProvider>
                    <Component {...pageProps}/>
                </CxsCtxProvider>
            </ApolloProvider>
        </JahiaCtxProvider>
    )
}

MyApp.propTypes = {
    Component:PropTypes.func.isRequired,
    pageProps:PropTypes.object.isRequired
};

MyApp.getInitialProps = async (appContext) => {
    let data = await App.getInitialProps(appContext);
    // console.log("[MyApp.getInitialProps] data : ",data);
    // console.log("[MyApp.getInitialProps] appContext.ctx.req.url : ",appContext.ctx.req.url);
    // console.log("[MyApp.getInitialProps] appContext : ",appContext);
    console.log("[MyApp.getInitialProps] cookies : ", (appContext.ctx.req).cookies);

    const isPreview = !!(appContext.ctx.req).cookies?.__next_preview_data;
    const workspace = isPreview ? "EDIT" : "LIVE";

    let jahiaContext;
    try {
        if ((appContext.ctx.req).cookies?.__jContent_preview_ctx) {
            jahiaContext = JSON.parse((appContext.ctx.req).cookies.__jContent_preview_ctx);
        }
    } catch (e) {
        console.error("[MyApp.getInitialProps] jahiaContext json parse error : ", e);
    }

    console.log("[MyApp.getInitialProps] isPreview :", isPreview);

    console.log("[MyApp.getInitialProps] appContext.ctx.pathname :", appContext.ctx.pathname)
    if (!process.browser && appContext.ctx.pathname === '/[[...slug]]') {//&& (appContext.ctx.pathname === '/ssr/[...path]' || appContext.ctx.pathname === '/ssg/[...path]')

        // if (!process.browser && appContext.ctx.pathname === '/[[...slug]]') {
        await client.resetStore();
        // }

        console.log("[MyApp.getInitialProps] locale :", appContext.router.locale);
        console.log("[MyApp.getInitialProps] initial path :", appContext.ctx.asPath);
        const [path, query] = getPathAndQuery(appContext.ctx.asPath);

        console.log("[MyApp.getInitialProps] updated path :", path);
        console.log("[MyApp.getInitialProps] updated query :", query);

        //TODO get meta of the page
        //     const meta = {
        //       title:"Industrial"
        //     }

        const {data: gqlData} = await getPageInfo(path, workspace);
        // console.log("[MyApp.getInitialProps] gqlData :", gqlData);

        data = {
            ...data,
            pageProps: {
                ...data.pageProps,
                // meta,
                path: gqlData.jcr.nodeByPath.path,
                templateName: gqlData.jcr.nodeByPath.templateName?.value || 'default',
                isPreview,
                isEditMode: jahiaContext?.edit, //query?.edit === 'true'?true:false,
                locale: jahiaContext?.locale || appContext.router.locale //'en'
                // isEditMode: !!query?.edit, //query?.edit === 'true'?true:false,
                // locale: query?.locale || appContext.router.locale //'en'
            },
        }

        // console.log("[MyApp.getInitialProps] data :", data);

        const {AppTree} = appContext;

        function Wrapper() {
            return <AppTree {...data}/>
        }

        console.log('Pre-render:', path)
        await renderToStringWithData(<Wrapper/>)
        console.log('pre-render:done')

        const apolloState = client.extract();

        data = {
            ...data,
            pageProps: {
                ...data.pageProps,
                apolloState
            }
        }
    }

    return data;
}

export default MyApp;
