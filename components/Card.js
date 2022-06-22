import React from "react";
import {JahiaCtx,CORE_NODE_FIELDS} from "@jahia/nextjs-lib";
import {gql, useQuery} from "@apollo/client";
import * as PropTypes from "prop-types";
import CmsImage from "./jahia/Image/Default";
import LinkTo from "./LinkTo";
import {LINK_TO_FIELDS} from "./GQL/fragments";

//TODO use xss to clean body
function Card({id}) {
    const {workspace, locale} = React.useContext(JahiaCtx);

    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
                ...LinkToFields
                body: property(language:$language, name:"body"){value}
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

    return (
        <div className="media d-block media-custom text-center">
            <LinkTo content={content} locale={locale} fallback={{elt:'div',css:['cardALike']}}>
                <ImageComponent
                    id={content.media?.node?.uuid}
                    path={content.media?.node?.path}
                    className="img-fluid"
                    alt={content.name}/>
            </LinkTo>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{__html: content.body?.value || 'no body'}}/>
        </div>
    )
}

Card.propTypes = {
    id: PropTypes.string.isRequired
};
export default Card;
