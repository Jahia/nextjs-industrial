import React, {useContext} from 'react';
import {CxsCtx, JahiaComponent, JahiaCtx} from '@jahia/nextjs-lib';
import {gql, useQuery} from '@apollo/client';
import * as PropTypes from 'prop-types';

export function PersonalizedContentLive({id, isFirstOnly}) {
    const {locale} = useContext(JahiaCtx);
    const cxs = useContext(CxsCtx);

    const getPersonalizedContent = gql`query($id:String!, $profileId:String!, $sessionId:String!) {
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
                    personalizedVariants {
                        uuid
                        workspace
                        path
                        primaryNodeType {
                            name
                        }
                        mixinTypes {
                            name
                        }
                    }
                }
            }
        }
    }`;

    const {data, loading, error} = useQuery(getPersonalizedContent, {
        variables: {
            id,
            profileId: cxs?.profileId,
            sessionId: cxs?.sessionId,
            language: locale,
        },
        skip: !cxs,
    });

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const nodes = data?.jcr?.nodeById.jExperience.personalizedVariants;

    return Boolean(nodes) && nodes.length > 0 && (
        isFirstOnly ? (
            <JahiaComponent node={nodes[0]}/>
        ) : (
            nodes.map(n => <JahiaComponent key={n.uuid} node={n}/>)
        )
    );
}

PersonalizedContentLive.propTypes = {
    id: PropTypes.string.isRequired,
    isFirstOnly: PropTypes.bool,
};

