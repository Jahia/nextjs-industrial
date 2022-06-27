import React, {useContext} from 'react';
import {JahiaCtx} from '@jahia/nextjs-lib';
import CarouselEdit from './Edit';
import CarouselLive from './Live';

export function OWCTestimonial(props) {
    const {isEditMode} = useContext(JahiaCtx);
    return isEditMode ? <CarouselEdit {...props}/> : <CarouselLive {...props}/>;
}

OWCTestimonial.propTypes = {};
