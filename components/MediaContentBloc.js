import React from 'react';
import {useNode} from '@jahia/nextjs-sdk';
import * as PropTypes from 'prop-types';
import * as Icons from 'react-bootstrap-icons';

// Import {gql, useQuery} from '@apollo/client';

// *** Query sample without usage of useNode() ***
// const {workspace, locale} = React.useContext(JahiaCtx);
// const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
//     jcr(workspace: $workspace) {
//         workspace
//         nodeById(uuid: $id) {
//             ...CoreNodeFields
//             title: property(language:$language, name:"title"){value}
//             teaser: property(language:$language,name:"teaser"){value}
//             iconName: property(name:"iconName",){value}
//         }
//     }
// }
// ${CORE_NODE_FIELDS}`;
//
// const {data, error, loading} = useQuery(getContent, {
//     variables: {
//         workspace,
//         id,
//         language: locale,
//     },
// });

function MediaContentBloc({id}) {
    const {data, error, loading} = useNode(id, ['title', 'teaser', 'iconName']);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {title, teaser, iconName} = data.properties;

    const getIcon = () => {
        if (iconName) {
            const {[iconName]: Icon} = Icons;
            if (Icon) {
                return <Icon className="text-primary"/>;
            }
        }
    };

    return (
        <div className="media block-6 d-block text-center">
            <div className="icon mb-3">
                {getIcon()}
            </div>
            <div className="media-body">
                <h3 className="heading">{title}</h3>
                <p>{teaser}</p>
            </div>
        </div>
    );
}

MediaContentBloc.propTypes = {
    id: PropTypes.string.isRequired,
};
export default MediaContentBloc;
