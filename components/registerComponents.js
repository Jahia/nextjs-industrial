import React from 'react';
import {
    componentByMixin,
    componentRenderingModuleTag,
    componentsByType,
    ImageReferenceLink,
    RichText,
} from '@jahia/nextjs-sdk';
import BS4Grid from './jahia/BS4/Grid';
import NavMenuText from './jahia/NavMenuText';

import Widen from './jahia/Widen/Widen';

import Hero from './Hero';
import Gallery from './Gallery';
import {OwlCarousel} from './owlCarousel';
import FeatureContentBloc from './FeatureContentBloc';
import HalfBlock from './HalfBlock';
import MediaContentBloc from './MediaContentBloc';
import Card from './Card';

function ImageReferenceLinkWrapper(props) {
    return <ImageReferenceLink {...props} className="img-fluid"/>;
}

export const registerComponents = () => {
    Object.assign(componentsByType, {
        // Community Module
        'wdennt:widenReference': Widen,
        'bootstrap4nt:grid': BS4Grid,
        'jnt:navMenuText': NavMenuText,

        // Content Model Module
        'tint:text': RichText,
        'hicnt:text': RichText,
        'hicnt:heading': Hero,
        'hicnt:galleryImage': Gallery,
        'hicnt:featureContentBloc': FeatureContentBloc,
        'hicnt:owlcarousel': OwlCarousel,
        'hicnt:halfBlock': HalfBlock,
        'hicnt:mediaContentBloc': MediaContentBloc,
        'hicnt:card': Card,
        'jnt:imageReferenceLink': ImageReferenceLinkWrapper,
    });

    Object.assign(componentByMixin, {
    });

    componentRenderingModuleTag.push(...[
        'hicnt:owlcarousel',
    ]);
};
