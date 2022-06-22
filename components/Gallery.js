import React from "react";
import {JahiaCtx,CORE_NODE_FIELDS} from "@jahia/nextjs-lib";
import {gql, useQuery} from "@apollo/client";
import * as PropTypes from "prop-types";
import {PlusLg} from "react-bootstrap-icons";

import CmsImage from "./jahia/Image/Default";
import {LINK_TO_FIELDS} from "./GQL/fragments";
import LinkTo from "./LinkTo";

//TODO use xss to clean body
function Gallery({id}) {
    const {workspace, locale} = React.useContext(JahiaCtx);

    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
                ...LinkToFields
                heading: property(language:$language, name:"heading"){value}
                iconClass: property(name:"iconClass"){value}
                media: property(language:$language,name:"mediaNode",){
                    node: refNode {
                        ...CoreNodeFields
                    }
                }
            }
        }
    }
    ${CORE_NODE_FIELDS}
    ${LINK_TO_FIELDS}`;

    const {data, error, loading} = useQuery(getContent, {
        variables: {
            workspace,
            id,
            language: locale,
        }
    });

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    const content = data?.jcr?.nodeById;
    const ImageComponent = CmsImage;

    // {
    //     "element-animate":!isEditMode
    // }

    return (
        <LinkTo content={content} locale={locale} className="link-thumbnail" fallback={{elt:'div',className:'link-thumbnail'}}>
            <h3>{content.heading?.value}</h3>
            <PlusLg className="icon"/>
            <ImageComponent
                id={content.media?.node?.uuid}
                path={content.media?.node?.path}
                className="img-fluid"
                alt={content.name}/>
        </LinkTo>
    )
}

Gallery.propTypes = {
    id: PropTypes.string.isRequired
};
export default Gallery;
