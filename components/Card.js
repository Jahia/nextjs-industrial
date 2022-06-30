import React from 'react';
import {JahiaCtx, useNode, DefaultImage} from '@jahia/nextjs-sdk';
import * as PropTypes from 'prop-types';
import {LinkTo, linkToProperties} from './LinkTo';

// Note:  use xss to clean body
function Card({id}) {
    const {locale} = React.useContext(JahiaCtx);

    const {data, error, loading} = useNode(id, [...linkToProperties, 'body', 'mediaNode']);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {name, properties: {body, mediaNode}} = data;
    const ImageComponent = DefaultImage;

    return (
        <div className="media d-block media-custom text-center">
            <LinkTo content={data.properties} locale={locale} fallback={{elt: 'div', css: ['cardALike']}}>
                {mediaNode && <ImageComponent
                    id={mediaNode.uuid}
                    path={mediaNode.path}
                    className="img-fluid"
                    alt={name}/>}
            </LinkTo>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{__html: body || 'no body'}}/>
        </div>
    );
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
};
export default Card;
