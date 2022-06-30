import React, {useContext} from 'react';
import {JahiaCtx, DefaultImage} from '@jahia/nextjs-sdk';
import {useQuery} from '@apollo/client';

import {queryWidenRef} from './gqlQuery';
import * as PropTypes from 'prop-types';

import Video from './components/Video';
import Pdf from './components/Pdf';
import Document from './components/Document';

const components = {
    'wdennt:image': DefaultImage,
    'wdennt:video': Video,
    'wdennt:pdf': Pdf,
    'wdennt:document': Document,
};

function Widen({id}) {
    const {workspace} = useContext(JahiaCtx);

    const {data, error, loading} = useQuery(queryWidenRef, {
        variables: {
            workspace,
            id,
        },
    });

    const widenRef = data?.jcr?.nodeById;

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }
    // Console.log("[Widen] widenRef : ",widenRef);

    const refNode = widenRef.node?.refNode;
    const refNodeTypeName = refNode?.primaryNodeType?.name;
    switch (refNodeTypeName) {
        case 'wdennt:image':
            return (
                <DefaultImage
                    id={refNode.uuid}
                    defaultImageSize={widenRef.defaultImageSize?.value}
                    imageSizes={widenRef.imageSizes?.value}
                    referenceView={widenRef.referenceView?.value}
                />
            );
        default:
            if (refNodeTypeName && components[refNodeTypeName]) {
                const Component = components[refNodeTypeName];
                return <Component id={refNode.uuid} referenceView={widenRef.referenceView?.value}/>;
            }
    }

    console.log('Component not found: ', refNodeTypeName);

    return <span>Component not found : {refNodeTypeName}</span>;
}

Widen.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Widen;
