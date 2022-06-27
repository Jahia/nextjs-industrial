import React, {useEffect, useRef} from 'react';
import {JahiaComponent, JahiaCtx} from '@jahia/nextjs-lib';
import {gql, useQuery} from '@apollo/client';
import * as PropTypes from 'prop-types';

export function PersonalizedContentEdit({id}) {
    const {workspace, locale, isEditMode} = React.useContext(JahiaCtx);
    const [index, setIndex] = React.useState(0);
    const getContent = gql`query($workspace: Workspace!, $id: String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                workspace
                uuid
                name
                path
                parent {
                    workspace
                    uuid
                    name
                    path
                    property(name: "j:contributeTypes") {
                        values
                    }
                }
                property(name: "wem:controlVariant") {
                    value
                }
                children {
                    nodes {
                        workspace
                        uuid
                        path
                        name
                        primaryNodeType {
                            name
                        }
                        mixinTypes {
                            name
                        }
                    }
                }
            }
        }
    }`;

    const {data, loading, error} = useQuery(getContent, {
        variables: {
            workspace,
            id,
        },
    });

    const next = e => {
        setIndex(index => index < data.jcr.nodeById.children.nodes.length - 1 ? index + 1 : index);
    };

    const prev = e => {
        setIndex(index => index > 0 ? index - 1 : index);
    };

    const control = useRef();
    useEffect(() => {
        control.current.addEventListener('next', next);
        control.current.addEventListener('prev', prev);
        return () => {
            control.current.removeEventListener('next', next);
            control.current.removeEventListener('prev', prev);
        };
    });

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    return (
        <>
            <div
                ref={control}
                className="personalizationControl"
                data-value={`${index + 1} / ${data.jcr.nodeById.children.nodes.length}`}
                data-nodetypes={data.jcr.nodeById.parent.property ? data.jcr.nodeById.parent.property.values.join(' ') : ''}
            />
            Personalized Content
            <JahiaComponent node={data.jcr.nodeById.children.nodes[index]}/>
        </>
    );
}

PersonalizedContentEdit.propTypes = {
    id: PropTypes.string.isRequired,
};

