import React from "react";
import * as PropTypes from "prop-types";
import {types} from "../types";


function BS4Section({grid,mixins,children}) {


    const sectionProps = {}
    if(grid.sectionId?.value)
        sectionProps.id=grid.sectionId.value;
    if(grid.sectionCssClass?.value)
        sectionProps.class=grid.sectionCssClass.value;
    if(grid.sectionRole?.value)
        sectionProps.role=grid.sectionRole.value;
    if(grid.sectionStyle?.value)
        sectionProps.style=JSON.parse(grid.sectionStyle.value);
    if(grid.sectionAria?.value)
        sectionProps["aria-label"]=grid.sectionAria.value;

    console.log("[BS4Section] mixins : ",mixins);
    console.log("[BS4Section] children : ",children);
    console.log("[BS4Section] sectionProps : ",sectionProps);

    if(grid.sectionElement?.value)
        return React.createElement( grid.sectionElement.value,sectionProps,children)

    return children
}

BS4Section.propTypes = {
    grid : PropTypes.object.isRequired,
    mixins : PropTypes.array,
    children: PropTypes.object,
};

export default BS4Section;
