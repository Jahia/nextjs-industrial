import React from "react";
import {JahiaCtx,CORE_NODE_FIELDS} from "@jahia/nextjs-lib";
import {gql, useQuery} from "@apollo/client";
import styles from './item.module.css'
import classNames from 'classnames';
import * as PropTypes from "prop-types";
import {getImageURI} from "../../jahia/utils";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {PlayFill} from "react-bootstrap-icons";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";

//TODO use xss to clean caption

function Item({id}) {
    const {workspace, isEditMode, locale} = React.useContext(JahiaCtx);

    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
                caption: property(language:$language, name:"caption"){value}
                videoLink: property(name:"videoLink"){value}
                videoExtPath: property(language:$language,name:"videoExtPath"){value}
                videoIntPath: property(language:$language,name:"videoIntPath"){
                    node: refNode {
                        ...CoreNodeFields
                    }
                }
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
                    <div dangerouslySetInnerHTML={{__html: content.caption?.value}} className={styles.cardBody}/>
                </div>}
            {!isEditMode &&
                <div
                    className="slider-item"
                    style={{backgroundImage: `url('${imageURI}')`}}
                >
                    <Container>
                        <Row className="slider-text align-items-center justify-content-center">
                            <Col
                                sm={12}
                                lg={7}
                                className="text-center element-animate"
                            >
                                {videoLink &&
                                <div className="btn-play-wrap mx-auto">
                                    <p className="mb-4">

                                        <a
                                            data-fancybox
                                            href={videoLink}
                                            data-ratio="2"
                                            className="btn-play"
                                        >
                                            <PlayFill/>
                                        </a>

                                    </p>
                                </div>}

                                {/* eslint-disable-next-line react/no-danger */}
                                <div dangerouslySetInnerHTML={{__html: content.caption?.value || "no caption"}}/>
                            </Col>
                        </Row>
                    </Container>
                </div>}
        </>

    )
}

Item.propTypes = {
    id : PropTypes.string.isRequired
};

export default Item;
