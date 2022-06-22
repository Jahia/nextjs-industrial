import React from 'react';
import classNames from "classnames";
import {JahiaCtx, JahiaModuleTag, RichText,CORE_NODE_FIELDS} from "@jahia/nextjs-lib";

import styles from './halfBlock.module.css'
import Image from "./images/HalfBlock";
import cms from "../jahia";
import * as PropTypes from "prop-types";
import {gql, useQuery} from "@apollo/client";


function ChildComponent({isNodeEmpty,path,nodetypes,classname,children}) {
    const {isEditMode} = React.useContext(JahiaCtx);
    if (isEditMode) {
        if (isNodeEmpty) {
            return (
                <div className={styles[classname]}>
                    <JahiaModuleTag path={path} type="placeholder" nodetypes={nodetypes}/>
                </div>
            )
        }
        return (
            <JahiaModuleTag path={path} nodetypes={nodetypes}>
                {children}
            </JahiaModuleTag>
        )
    }
    return children
}

ChildComponent.propTypes = {
    isNodeEmpty: PropTypes.bool.isRequired,
    path: PropTypes.string,
    nodetypes: PropTypes.arrayOf(PropTypes.string),
    classname: PropTypes.string,
    children: PropTypes.node,
};



function HalfBlock({id}) {
    const {workspace,locale,isEditMode} = React.useContext(JahiaCtx);

    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
                imagePosition:property(name:"imagePosition"){ value }
                children{
                    nodes{
                        ...CoreNodeFields
                        media: property(language:$language,name:"mediaNode"){
                            refNode {...CoreNodeFields}
                        }
                    }
                }
            }
        }
    }
    ${CORE_NODE_FIELDS}`;

    const {data, error, loading} = useQuery(getContent, {
        variables: {
            workspace,
            id,
            language:locale
        }
    });

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    const getChildNodeOfType = ({node, nodeType}) => {
        if (!Array.isArray(node.children?.nodes)) {
            return;
        }

        const childArray = node.children.nodes.filter(node =>
            node.primaryNodeType.name === nodeType
        );
        return childArray[0];
    }

    const content = data?.jcr?.nodeById;

    const imageNode = getChildNodeOfType({
        node: content,
        nodeType: cms.contentTypes.HALFBLOCK_IMAGE
    });

    const bodyNode = getChildNodeOfType({
        node: content,
        nodeType: cms.contentTypes.INDUS_TEXT
    });

    return (
        <section>
            <div className="half d-lg-flex d-block">
                <div className={classNames("image", {
                    "order-2": content.imagePosition?.value === "right",
                    [styles.editImageWrapper]: isEditMode
                })}
                >
                    <ChildComponent
                        isNodeEmpty={!imageNode}
                        path={imageNode?.path || "image"}
                        nodetypes={[imageNode?.primaryNodeType.name || cms.contentTypes.HALFBLOCK_IMAGE]}
                        classname="editImageContainer"
                    >
                        <Image path={imageNode?.media?.refNode?.path}/>
                    </ChildComponent>
                </div>

                <div className="text text-center element-animate">
                    <ChildComponent
                        isNodeEmpty={!bodyNode}
                        path={bodyNode?.path || "body"}
                        nodetypes={[bodyNode?.primaryNodeType.name || cms.contentTypes.INDUS_TEXT]}
                    >
                        <RichText id={bodyNode?.uuid}/>
                    </ChildComponent>
                </div>
            </div>
        </section>
    )
}

HalfBlock.propTypes = {
    id: PropTypes.string
};

export default HalfBlock;
