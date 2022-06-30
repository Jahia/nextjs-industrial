import React from 'react';
import {useNode} from '@jahia/nextjs-sdk';
import * as PropTypes from 'prop-types';
import * as Icons from 'react-bootstrap-icons';

function FeatureContentBloc({id}) {
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
                return <Icon className="display-4 text-primary"/>;
            }
        }
    };

    return (
        <div className="feature-1 d-md-flex">
            <div className="align-self-center">
                {getIcon()}
                <h3>{title}</h3>
                <p>{teaser}</p>
            </div>
        </div>
    );
}

FeatureContentBloc.propTypes = {
    id: PropTypes.string.isRequired,
};
export default FeatureContentBloc;
