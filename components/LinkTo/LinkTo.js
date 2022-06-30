import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './linkTo.module.css';
import NextLink from 'next/link';
import {JahiaLink} from '@jahia/nextjs-sdk';
import classnames from 'classnames';

function Fallback({fallback, children}) {
    // Const eltChildren = [children].flat()
    return React.createElement(
        fallback.elt,
        {
            className: classnames(
                fallback?.className,
                fallback?.css?.reduce((classes, item) => {
                    classes[styles[item]] = true;
                    return classes;
                }, {}),
            ),
        },
        children,
    );
}

Fallback.propTypes = {
    fallback: PropTypes.object,
    children: PropTypes.node.isRequired,
};

export function LinkTo({content, locale, fallback, className, children}) {
    // {[styles[fallback?.class]]:true}
    const {linkType, externalLink, internalLink, linkTarget} = content;
    if (!linkType || !(externalLink || internalLink)) {
        if (fallback.elt) {
            return (
                <Fallback fallback={fallback}>
                    {children}
                </Fallback>
            );
        }

        return children;
    }

    let Component = NextLink;
    let url = externalLink;

    if (internalLink) {
        Component = JahiaLink;
        url = internalLink.path;
    }

    return (
        <Component href={url} locale={locale}>
            <a target={linkTarget} className={className}>
                {children}
            </a>
        </Component>
    );
}

LinkTo.propTypes = {
    content: PropTypes.object.isRequired,
    locale: PropTypes.string,
    fallback: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};
