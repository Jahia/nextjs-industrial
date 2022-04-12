import React, {useContext} from 'react';
import {JahiaCtx} from "../../lib/context";
import CarouselEdit from "./edit";
import dynamic from "next/dynamic";

const CarouselFront = dynamic(
    () => import("./live"),
    // No need for SSR, when the module includes a library that only works in the
    // browser.
    {ssr: false}
);

export function OwlCarousel(props) {
    const {isEditMode} = useContext(JahiaCtx);

    return isEditMode ? <CarouselEdit {...props}/> : <CarouselFront {...props}/>
}

OwlCarousel.propTypes = {};
