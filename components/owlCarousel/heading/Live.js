import React from 'react';
import * as PropTypes from 'prop-types';
import Items from './Items';
import {ChevronLeft, ChevronRight} from 'react-bootstrap-icons';
import classNames from 'classnames';

function OwlCarousel({carousel}) {
    const {uuid, name, children, properties: {options: owlOptions, class: owlClassName}} = carousel;

    React.useEffect(() => {
        if (uuid && process.browser) {
            import('owl.carousel').then(() => {
                // Console.debug("[OwlCarousel] launch the carousel in the browser");

                let gqlOptions = {};
                try {
                    gqlOptions = JSON.parse(owlOptions);
                } catch (error) {
                    console.warn('no options configured by user for the carousel: ', name, '; error : ', error);
                }

                const options = {items: 1,
                    loop: true,
                    autoplay: true,
                    margin: 0,
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                    nav: true,
                    autoplayHoverPause: true,
                    dragTouch: false,
                    navText: [window.jQuery(`#owl-prev-${uuid}`), window.jQuery(`#owl-next-${uuid}`)],
                    responsive: {
                        0: {items: 1, nav: false},
                        600: {items: 1, nav: false},
                        1000: {items: 1, nav: true},
                    }, ...gqlOptions};
                console.debug('[OwlCarousel Heading Live] options: ', options);
                window.jQuery(`#${uuid}`).owlCarousel(options);
            });
        }
    }, [carousel]);

    return (
        <>
            <section id={uuid} className={classNames('home-slider owl-carousel', owlClassName)}>
                <Items nodes={children}/>
            </section>
            <ChevronLeft id={`owl-prev-${uuid}`}/>
            <ChevronRight id={`owl-next-${uuid}`}/>
        </>

    );
}

OwlCarousel.propTypes = {
    carousel: PropTypes.object.isRequired,
};

export default OwlCarousel;
