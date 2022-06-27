import React from 'react';
import * as PropTypes from 'prop-types';
import {types} from '../types';

function BS4Section({grid, mixins, children}) {
    if (!mixins.includes(types.createSection) || !grid.sectionElement?.value) {
        return children;
    }

    const sectionProps = {};
    if (grid.sectionId?.value) {
        sectionProps.id = grid.sectionId.value;
    }

    if (grid.sectionCssClass?.value) {
        sectionProps.className = grid.sectionCssClass.value;
    }

    if (grid.sectionRole?.value) {
        sectionProps.role = grid.sectionRole.value;
    }

    if (grid.sectionStyle?.value) {
        sectionProps.style = JSON.parse(grid.sectionStyle.value);
    }

    if (grid.sectionAria?.value) {
        sectionProps['aria-label'] = grid.sectionAria.value;
    }

    // Console.log("[BS4Section] mixins : ",mixins);
    // console.log("[BS4Section] children : ",children);
    // console.log("[BS4Section] sectionProps : ",sectionProps);

    return React.createElement(grid.sectionElement.value, sectionProps, children);
}

BS4Section.propTypes = {
    grid: PropTypes.object.isRequired,
    mixins: PropTypes.array,
    children: PropTypes.node,
};

export default BS4Section;
