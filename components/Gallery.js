import React from "react";
import {JahiaCtx} from "../lib/context";
import {gql, useQuery} from "@apollo/client";
import * as PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import WidenImage from "./jahia/Widen/components/Image";
import CmsImage from "./jahia/Image/Default";
import { CORE_NODE_FIELDS } from './jahia/GQL/fragments';


//TODO use xss to clean body
function Gallery({id}) {
    const {workspace, locale, isEditMode} = React.useContext(JahiaCtx);

    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
                heading: property(language:$language, name:"heading"){value}
                iconClass: property(name:"iconClass"){value}
                media: property(language:$language,name:"wden:mediaNode",){
                    node: refNode {
                        ...CoreNodeFields
                        templatedUrl:property(name:"wden:templatedUrl"){value}
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
    const ImageComponent =
        content.media?.node?.templatedUrl?.value ?
            WidenImage : CmsImage;

    // {
    //     "element-animate":!isEditMode
    // }
    return (
        <a href="project-single.html" className="link-thumbnail">
            <h3>{content.heading.value}</h3>
            {/*<FontAwesomeIcon icon={["fal", "coffee"]}/>*/}
            <FontAwesomeIcon icon={faPlus}/>
            {/*<FontAwesomeIcon icon={content.iconClass?.value}/>*/}
            <ImageComponent
                id={content.media?.node?.uuid}
                path={content.media?.node?.path}
                className="img-fluid"
                alt={content.name}/>
        </a>
    )
}

Gallery.propTypes = {
    id: PropTypes.string.isRequired
};
export default Gallery;
