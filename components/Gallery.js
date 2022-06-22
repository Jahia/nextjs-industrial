import React from "react";
import {JahiaCtx, CORE_NODE_FIELDS, useNode} from "@jahia/nextjs-lib";
// import {gql, useQuery} from "@apollo/client";
import * as PropTypes from "prop-types";
import {PlusLg} from "react-bootstrap-icons";

import CmsImage from "./jahia/Image/Default";
// import {LINK_TO_FIELDS} from "./GQL/fragments";
import {linkToProperties} from "./GQL/properties";
import LinkTo from "./LinkTo";

//TODO use xss to clean body
function Gallery({id}) {
    const {locale} = React.useContext(JahiaCtx);
    // const {workspace, locale} = React.useContext(JahiaCtx);
    //
    // const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
    //     jcr(workspace: $workspace) {
    //         workspace
    //         nodeById(uuid: $id) {
    //             ...CoreNodeFields
    //             ...LinkToFields
    //             heading: property(language:$language, name:"heading"){value}
    //             iconClass: property(name:"iconClass"){value}
    //             media: property(language:$language,name:"mediaNode",){
    //                 node: refNode {
    //                     ...CoreNodeFields
    //                 }
    //             }
    //         }
    //     }
    // }
    // ${CORE_NODE_FIELDS}
    // ${LINK_TO_FIELDS}`;
    //
    // const {data, error, loading} = useQuery(getContent, {
    //     variables: {
    //         workspace,
    //         id,
    //         language: locale,
    //     }
    // });

    const {data, error, loading} = useNode(id,[...linkToProperties,"heading","iconClass","mediaNode"]);

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    // const content = data?.jcr?.nodeById;
    const content = data.properties;
    const ImageComponent = CmsImage;
    console.log("[Gallery] content : ",content);
    // {
    //     "element-animate":!isEditMode
    // }

    return (
        <LinkTo content={content} locale={locale} className="link-thumbnail" fallback={{elt:'div',className:'link-thumbnail'}}>
            <h3>{content.heading}</h3>
            <PlusLg className="icon"/>
            {content.mediaNode && <ImageComponent
                id={content.mediaNode.uuid}
                path={content.mediaNode.path}
                className="img-fluid"
                alt={content.mediaNode.name}/>
            }
        </LinkTo>
    )
}

Gallery.propTypes = {
    id: PropTypes.string.isRequired
};
export default Gallery;
