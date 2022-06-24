import React from "react";
import {JahiaCtx, useNode} from "@jahia/nextjs-lib";
import styles from './item.module.css'
import classNames from 'classnames';
import * as PropTypes from "prop-types";
import {getImageURI} from "../../jahia/utils";
import "@fancyapps/ui/dist/fancybox.css";

//TODO use xss to clean caption

function Item({id}) {
    const {workspace, isEditMode} = React.useContext(JahiaCtx);

    const {data, error, loading} = useNode(id,["heading","testimonial","mediaNode"]);

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    const {heading,testimonial,mediaNode} = data.properties;
    const imageURI = getImageURI({uri: mediaNode.path, workspace});

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
                        alt={mediaNode.name}
                    />
                    {/* eslint-disable-next-line react/no-danger */}
                    <div dangerouslySetInnerHTML={{__html: heading}} className={styles.cardBody}/>
                </div>}
            {!isEditMode &&
                <div className="item">
                    <div className="block-33 h-100">
                        <div className="vcard d-flex mb-3">
                            <div className="image align-self-center">
                                <img src={imageURI} alt={mediaNode.name}/>
                            </div>
                            {/* eslint-disable-next-line react/no-danger */}
                            <div dangerouslySetInnerHTML={{__html: heading}}/>
                        </div>
                        <div className="text">
                            {/* eslint-disable-next-line react/no-danger */}
                            <div dangerouslySetInnerHTML={{__html: testimonial}}/>
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
