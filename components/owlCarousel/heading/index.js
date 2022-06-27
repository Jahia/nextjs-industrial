import React, {useContext} from 'react';
import {JahiaCtx} from '@jahia/nextjs-lib';
import CarouselEdit from './Edit';
import CarouselLive from './Live';

export function OWCHeading(props) {
    const {isEditMode} = useContext(JahiaCtx);
    return isEditMode ? <CarouselEdit {...props}/> : <CarouselLive {...props}/>;
}

OWCHeading.propTypes = {};
