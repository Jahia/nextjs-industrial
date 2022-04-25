import React, {useContext} from "react";
import {JahiaCtx} from "@jahia/nextjs-lib";
import {useQuery} from "@apollo/client";
import {queryCarousel} from "./gqlQuery";
import {carousel as carouselType} from './types';
import * as PropTypes from "prop-types";

function OwlCarousel({id}) {
    const {workspace} = useContext(JahiaCtx);
    const {data, error, loading} = useQuery(queryCarousel, {
        variables: {
            workspace,
            id
        }
    });
    const carousel = data?.jcr?.nodeById;

    React.useEffect(() => {
        if (carousel?.uuid && process.browser) {
            import('owl.carousel').then( () => {
                console.log("[OwlCarousel] launch the carousel in the browser");
                console.log("[OwlCarousel] carousel.uuid: ",carousel.uuid);

                let gqlOptions = {};
                try {
                    gqlOptions = JSON.parse(carousel.options?.value)
                } catch (error) {
                    console.warn("no options configured by user for the carousel: ", carousel.name)
                }

                const options = Object.assign({
                    items: 1,
                    loop: true,
                    autoplay: true,
                    margin: 0,
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                    nav: true,
                    autoplayHoverPause: true,
                    dragTouch: false,
                    // navText: ["<span class='ion-chevron-left'></span>", "<span class='ion-chevron-right'></span>"],
                    navText:[$(`#owl-prev-${carousel.uuid}`),$(`#owl-next-${carousel.uuid}`)],
                    responsive: {
                        0: {
                            items: 1,
                            nav: false
                        },
                        600: {
                            items: 1,
                            nav: false
                        },
                        1000: {
                            items: 1,
                            nav: true
                        }
                    }
                }, gqlOptions);
                console.log("[OwlCarousel] options: ",options);
                window.jQuery(`#${carousel.uuid}`).owlCarousel(options)
            })
        }
    }, [carousel]);

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    // console.log("[OwlCarousel] carousel.class :",carousel.class);
    if (carouselType[carousel?.carouselType?.value]) {
        const Component = carouselType[carousel.carouselType.value];
        return (
            <section id={carousel.uuid} className={carousel.class?.value}>
                <Component items={carousel.children.nodes} carouselId={carousel.uuid}/>
            </section>
        )
    }
    return (
        <p>The carousel type is not supported</p>
    )
}

OwlCarousel.propTypes = {
    id : PropTypes.string.isRequired,
};

export default OwlCarousel;
