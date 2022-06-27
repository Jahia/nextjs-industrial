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

                const options = {center: false,
                    items: 1,
                    loop: false,
                    stagePadding: 20,
                    margin: 50,
                    nav: true,
                    smartSpeed: 1000,
                    navText: [window.jQuery(`#owl-prev-${uuid}`), window.jQuery(`#owl-next-${uuid}`)],
                    responsive: {
                        600: {stagePadding: 20, items: 1},
                        800: {stagePadding: 20, items: 1},
                        1000: {/* stagePadding: 200, */items: 1},
                    }, ...gqlOptions};
                console.debug('[OwlCarousel Testimonial Live] options: ', options);
                window.jQuery(`#${uuid}`).owlCarousel(options);
            });
        }
    }, [carousel]);

    return (
        <>
            <div
                id={uuid}
                className={classNames('nonloop-block-11 owl-carousel', owlClassName)}
            >
                <Items nodes={children}/>
            </div>
            <span id={`owl-prev-${uuid}`}>
                <ChevronLeft/>
            </span>
            <span id={`owl-next-${uuid}`}>
                <ChevronRight/>
            </span>

        </>

    );
}

OwlCarousel.propTypes = {
    carousel: PropTypes.object.isRequired,
};

export default OwlCarousel;
