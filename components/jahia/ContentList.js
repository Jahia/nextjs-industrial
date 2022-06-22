import React, {useContext} from 'react';
import {JahiaComponent, JahiaCtx, JahiaModuleTag,CORE_NODE_FIELDS} from "@jahia/nextjs-lib";
import * as PropTypes from "prop-types";
import {gql, useQuery} from "@apollo/client";

export function ContentList({id,childComponentProps}) {
    const {workspace, isEditMode} = useContext(JahiaCtx);

    const getContent = gql`query($id:String!, $workspace:Workspace!) {
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
                children {
                    nodes {
                        ...CoreNodeFields
                        mixinTypes {
                            name
                        }
                    }
                }
            }
        }
    }
    ${CORE_NODE_FIELDS}`

    const {data, error, loading} = useQuery(getContent, {
        variables: {
            workspace,
            id
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
        <>
            {data.jcr.nodeById.children.nodes.map(node =>
                <JahiaComponent key={node.uuid} componentProps={childComponentProps} node={node}/>
            )}

            {isEditMode && <JahiaModuleTag path="*" type="placeholder"/>}
        </>
    )
}

ContentList.propTypes = {
    id: PropTypes.string.isRequired,
    childComponentProps:PropTypes.object
}

