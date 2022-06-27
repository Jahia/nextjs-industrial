import React, {useContext} from 'react';
import {JahiaCtx} from '@jahia/nextjs-lib';
import * as PropTypes from 'prop-types';
import {PersonalizedContentEdit} from './PersonalizedContentEdit';
import {PersonalizedContentLive} from './PersonalizedContentLive';

export function PersonalizedContent(props) {
    const {isEditMode} = useContext(JahiaCtx);

    return isEditMode ? (
        <PersonalizedContentEdit {...props}/>
    ) : (
        <PersonalizedContentLive firstOnly {...props}/>
    );
}

PersonalizedContent.propTypes = {
    id: PropTypes.string.isRequired,
};

