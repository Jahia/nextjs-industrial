import React, {useContext, useRef} from 'react';
import {JahiaCtx} from "../../lib/context";
import {gql, useQuery} from "@apollo/client";
import * as PropTypes from "prop-types";
import {CxsCtx} from "../../lib/cxs";

export function PersonalizedContentLive({id}) {
    const {locale} = useContext(JahiaCtx);
    const cxs = useContext(CxsCtx);
    const elementRef = useRef()

    const getPersonalizedContent = gql`query($id:String!, $profileId:String!, $sessionId:String!, $language:String!) {
        jcr(workspace: LIVE) {
            workspace
            nodeById(uuid: $id) {
                uuid
                workspace
                path
                jExperience(
                    profileId: $profileId
                    sessionId: $sessionId
                ) {
                    personalizedVariant {
                        uuid
                        workspace
                        path
                        renderedContent(
                            contextConfiguration: "gwt"
                            language: $language
                            templateType:"html"
                            requestAttributes: [{name: "templateSet", value: "true"}]
                        )  {
                            js: staticAssets(type: "javascript") {
                                key
                            }
                            inline: staticAssets(type: "inline") {
                                key
                            }
                            css: staticAssets(type: "css") {
                                key
                            }
                            output
                        }
                    }
                }
            }
        }
    }`

    const {data, loading, error} = useQuery(getPersonalizedContent, {
        variables: {
            id,
            profileId: cxs?.profileId,
            sessionId: cxs?.sessionId,
            language: locale
        },
        skip: !cxs,
        onCompleted: data => {
            if (data) {
                const result = data.jcr.nodeById.jExperience.personalizedVariant.renderedContent
                const output = result.output;
                const assets = {
                    css: result.css,
                    js: result.js,
                    inline: result.inline
                };

                if (output) {
                    window.jtracker._renderVariant({output, assets}, elementRef.current)
                }
            }
        }
    });

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    return (
        <div ref={elementRef}/>
    );
}

PersonalizedContentLive.propTypes = {
    id: PropTypes.string.isRequired,
}

