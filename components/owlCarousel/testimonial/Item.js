import React from "react";
import {JahiaCtx,CORE_NODE_FIELDS} from "@jahia/nextjs-lib";
import {gql, useQuery} from "@apollo/client";
import styles from './item.module.css'
import classNames from 'classnames';
import * as PropTypes from "prop-types";
import {getImageURI} from "../../jahia/utils";
import "@fancyapps/ui/dist/fancybox.css";

//TODO use xss to clean caption

function Item({id}) {
    const {workspace, isEditMode, locale} = React.useContext(JahiaCtx);

    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
                heading: property(language:$language, name:"heading"){value}
                testimonial: property(language:$language, name:"testimonial"){value}
                media: property(language:$language,name:"mediaNode",){
                    node: refNode {
                        ...CoreNodeFields
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
    const imageURI = getImageURI({uri: content.media?.node?.path, workspace});
    const videoLink = content.videoIntPath ?
        getImageURI({uri: content.videoIntPath.node.path, workspace}) :
        content.videoExtPath?.value;

    // element-animate
    // console.log("[owl Heading Item] content :",content);
    return (
        <>
            {isEditMode &&
                <div className={classNames(
                    "card",
                    styles.jOwlCarouselEditCardEdit
                )}
                >
                    <img
                        src={imageURI}
                        className="card-img-top"
                        alt={content.media?.node?.name}
                    />
                    {/* eslint-disable-next-line react/no-danger */}
                    <div dangerouslySetInnerHTML={{__html: content.heading?.value}} className={styles.cardBody}/>
                </div>}
            {!isEditMode &&
                <div className="item">
                    <div className="block-33 h-100">
                        <div className="vcard d-flex mb-3">
                            <div className="image align-self-center">
                                <img src={imageURI} alt={content.media?.node?.name}/>
                            </div>
                            {/* eslint-disable-next-line react/no-danger */}
                            <div dangerouslySetInnerHTML={{__html: content.heading?.value}}/>
                        </div>
                        <div className="text">
                            {/* eslint-disable-next-line react/no-danger */}
                            <div dangerouslySetInnerHTML={{__html: content.testimonial?.value}}/>
                        </div>
                    </div>
                </div>}
        </>

    )
}

Item.propTypes = {
    id : PropTypes.string.isRequired
};

export default Item;
