import React from 'react';
import {JahiaCtx} from '@jahia/nextjs-lib';
import * as PropTypes from 'prop-types';

function Main({path, templateName, className, children}) {
    const {isEditMode, locale} = React.useContext(JahiaCtx);

    if (!isEditMode) {
        return children;
    }

    return (
        <div
            jahiatype="mainmodule"
            path={path}
            locale={locale}
            template=""
            templatename={templateName}
            nodetypes="nt:base jmix:navMenuItem"
            className={className}
        >
            {children}
        </div>
    );
}

Main.propTypes = {
    path: PropTypes.string.isRequired,
    templateName: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Main;
