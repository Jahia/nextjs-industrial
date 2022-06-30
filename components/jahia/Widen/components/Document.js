import React, {useContext} from 'react';
import {JahiaCtx, CORE_NODE_FIELDS} from '@jahia/nextjs-sdk';
import {gql, useQuery} from '@apollo/client';
import * as PropTypes from 'prop-types';

// ReferenceView
function Image({id, defaultImageSize, imageSizes}) {
    const {workspace} = useContext(JahiaCtx);

    const queryWidenImage = gql`query (
        $workspace:Workspace!,
        $id: String!
    ){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid:$id) {
                ...CoreNodeFields
                templatedUrl:property(name:"wden:templatedUrl"){
                    value
                }
            }
        }
    }
    ${CORE_NODE_FIELDS}`;

    const {data, error, loading} = useQuery(queryWidenImage, {
        variables: {
            workspace,
            id,
        },
    });

    const imageNode = data?.jcr?.nodeById;

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    console.log('[Image] imageNode : ', imageNode);

    const url = imageNode.templatedUrl?.value.replace('{scale}', 1).replace('{quality}', 72);

    return (
        <img
            src={url.replace('{size}', defaultImageSize)}
            width="100%"
            srcSet={imageSizes.map(width => (`${url.replace('{size}', width)} ${width}w`)).toString()}
            // Sizes="${sizes}"
            // className="${class}"
            alt={imageNode.name}
        />
    );
}

Image.propTypes = {
    id: PropTypes.string.isRequired,
    defaultImageSize: PropTypes.number,
    imageSizes: PropTypes.array,
    // ReferenceView: PropTypes.string,
};

Image.defaultProps = {
    defaultImageSize: 500,
    imageSizes: [256, 512, 768, 1280],
};

export default Image;
