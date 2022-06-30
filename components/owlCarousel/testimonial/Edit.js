import React from 'react';
import classNames from 'classnames';
import styles from './edit.module.css';
import Items from './Items';
import * as PropTypes from 'prop-types';
import {JahiaModuleTag} from '@jahia/nextjs-sdk';
import cms from '../../../jahia';

function OwlCarousel({carousel}) {
    const {uuid, path, children, properties: {class: owlClassName}} = carousel;
    // Note: JahiaModuleTag is required here to pass the childNodeTypes and enable the "create" btn to add children carousel item
    return (
        <JahiaModuleTag path={path} nodetypes={[cms.contentTypes.INDUS_CAROUSEL_TESTIMONIAL_ITEM]}>
            <div
                id={uuid}
                className={classNames(
                    'nonloop-block-11 owl-carousel',
                    owlClassName,
                    styles.jOwlCarouselEdit,
                )}
            >
                <Items nodes={children}/>
            </div>
            {/* Jahia btn placeholder to add a new item */}
            <JahiaModuleTag path="*" type="placeholder"/>
        </JahiaModuleTag>
    );
}

OwlCarousel.propTypes = {
    carousel: PropTypes.object.isRequired,
};

export default OwlCarousel;
