import React, {useContext} from 'react';
import {JahiaCtx} from "@jahia/nextjs-lib";
import {OWCHeading} from "./heading";
import {OWCTestimonial} from "./testimonial";
import {useQuery} from "@apollo/client";
import {queryCarousel} from "./gqlQuery";
import * as PropTypes from "prop-types";

const carouselType = {
    'heading': OWCHeading,
    'testimonial': OWCTestimonial
}

export function OwlCarousel({id,...props}) {
    // const {workspace} = useContext(JahiaCtx);
    // const {data, error, loading} = useQuery(queryCarousel, {
    //     variables: {
    //         workspace,
    //         id
    //     }
    // });

    const {data : carousel, error, loading} = useNode(id,["carouselType","options","class"],true)

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    // const carousel = data?.jcr?.nodeById;
    const type = carousel.properties.carouselType;

    if (carouselType[type]) {
        const Component = carouselType[type];
        return <Component carousel={carousel} {...props}/>
    }
    return (
        <p>The carousel type is not supported</p>
    )
}

OwlCarousel.propTypes = {
    id:PropTypes.string.isRequired,
};
