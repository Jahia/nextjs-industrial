import React from "react";
import classNames from 'classnames';
import styles from './edit.module.css'
import Items from "./Items";
import * as PropTypes from "prop-types";
import {JahiaModuleTag} from "@jahia/nextjs-lib";
import cms from "../../../jahia";

function OwlCarousel({carousel}) {
    const {class: carouselClass} = carousel.properties;
    //Note: JahiaModuleTag is required here to pass the childNodeTypes and enable the "create" btn to add children carousel item
    return (
        <JahiaModuleTag path={carousel.path} nodetypes={[cms.contentTypes.INDUS_CAROUSEL_HEADING_ITEM]}>
            <section
                id={carousel.uuid}
                className={classNames(
                    carouselClass,
                    styles.jOwlCarouselEdit
                )}
            >
                <Items nodes={carousel.children}/>
            </section>
            {/*Jahia btn placeholder to add a new item*/}
            <JahiaModuleTag path="*" type="placeholder"/>
        </JahiaModuleTag>
    )
}

OwlCarousel.propTypes = {
    carousel : PropTypes.object.isRequired,
};

export default OwlCarousel;
