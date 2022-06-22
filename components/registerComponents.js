import React from "react";
import {componentByMixin, componentsByType, componentRenderingModuleTag, RichText} from "@jahia/nextjs-lib";

import {PersonalizedContent} from "./jahia/PersonalizedContent";
import {PersonalizedList} from "./jahia/PersonalizedList";
import {ContentList} from "./jahia/ContentList";
import BS4Grid from "./jahia/BS4/Grid";
import ImageReferenceLink from "./jahia/Image/ImageReferenceLink/ImageReferenceLink";
import NavMenuText from "./jahia/NavMenuText";
// import RichText from "./jahia/RichText";

import Widen from "./jahia/Widen/Widen";

import Hero from "./Hero";
import Gallery from "./Gallery";
import {OwlCarousel} from "./owlCarousel";
import FeatureContentBloc from "./FeatureContentBloc";
import HalfBlock from "./HalfBlock";
import MediaContentBloc from "./MediaContentBloc";
import Card from "./Card";

export const registerComponents = () => {
    Object.assign(componentsByType, {
        //Core
        'jnt:contentList': ContentList,
        'bootstrap4nt:grid':BS4Grid,
        'jnt:imageReferenceLink':ImageReferenceLink,
        'jnt:navMenuText':NavMenuText,
        // 'jnt:bigText': RichText,
        'wemnt:personalizedContent': PersonalizedContent,

        //Community Module
        'wdennt:widenReference':Widen,

        //Content Model Module
        'tint:text': RichText,
        'hicnt:text': RichText,
        'hicnt:heading': Hero,
        'hicnt:galleryImage': Gallery,
        'hicnt:featureContentBloc': FeatureContentBloc,
        'hicnt:owlcarousel': OwlCarousel,
        'hicnt:halfBlock': HalfBlock,
        'hicnt:mediaContentBloc': MediaContentBloc,
        'hicnt:card': Card
    });

    Object.assign(componentByMixin, {
        'wemmix:personalizedList': PersonalizedList
    });

    componentRenderingModuleTag.push(...[
        'hicnt:owlcarousel'
    ])
}
