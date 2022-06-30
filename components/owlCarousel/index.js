import React from 'react';
import {OWCHeading} from './heading';
import {OWCTestimonial} from './testimonial';
import * as PropTypes from 'prop-types';
import {useNode} from '@jahia/nextjs-sdk';

const carouselType = {
    heading: OWCHeading,
    testimonial: OWCTestimonial,
};

export function OwlCarousel({id, ...props}) {
    const {data: carousel, error, loading} = useNode(id, ['carouselType', 'options', 'class'], true);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const type = carousel.properties.carouselType;

    if (carouselType[type]) {
        const Component = carouselType[type];
        return <Component carousel={carousel} {...props}/>;
    }

    return (
        <p>The carousel type is not supported</p>
    );
}

OwlCarousel.propTypes = {
    id: PropTypes.string.isRequired,
};
