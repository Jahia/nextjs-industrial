import React from 'react';
import {JahiaCtx, getImageURI} from '@jahia/nextjs-sdk';
import classNames from 'classnames';
import styles from './halfBlock.module.css';
import * as PropTypes from 'prop-types';

function Image({path}) {
    const {workspace} = React.useContext(JahiaCtx);
    const imageUri = getImageURI({uri: path, workspace});

    return (
        <div
            className={classNames('image-display', styles.image)}
            data-animate-effect="fadeIn"
            style={{backgroundImage: `url('${imageUri}')`}}
        />
    );
}

Image.propTypes = {
    path: PropTypes.string,
};

export default Image;
