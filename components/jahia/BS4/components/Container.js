import React from 'react';
import * as PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import {types} from '../types';

function BS4Container({grid, mixins, children}) {
    if (!mixins.includes(types.createContainer)) {
        return children;
    }

    const containerProps = {};
    if (grid.containerId?.value) {
        containerProps.id = grid.containerId.value;
    }

    if (grid.containerCssClass?.value) {
        containerProps.class = grid.containerCssClass.value;
    }

    if (grid.gridLayout?.value) {
        switch (true) {
            case grid.gridLayout.value === 'full-width':
                containerProps.fluid = true;
                break;

            case grid.gridLayout.value.includes('container-'):
                containerProps.fluid = grid.gridLayout.value.split('-')[1];
                break;

            default: break;
        }
    }

    // Console.log("[BS4Container] mixins : ",mixins);
    // console.log("[BS4Container] children : ",children);
    // console.log("[BS4Container] containerProps : ",containerProps);

    return (
        <Container {...containerProps}>
            {children}
        </Container>
    );
}

BS4Container.propTypes = {
    grid: PropTypes.object.isRequired,
    mixins: PropTypes.array,
    children: PropTypes.node,
};

export default BS4Container;
