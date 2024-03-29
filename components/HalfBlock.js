import React from 'react';
import classNames from 'classnames';
import {getImageURI, JahiaCtx, JahiaModuleTag, useNode, EmbeddedPathInHtmlResolver} from '@jahia/nextjs-sdk';
import {animateProperties, getAnimateProps, Animate} from '@jahia/nextjs-community-components';
import styles from './halfBlock.module.css';
import cms from '../jahia';
import * as PropTypes from 'prop-types';

// Note children can be null and empty the return must be managed otherwise there is an error
function ChildComponent({isNodeEmpty, path, nodetypes, classname, children}) {
    const {isEditMode} = React.useContext(JahiaCtx);
    if (isEditMode) {
        if (isNodeEmpty) {
            return (
                <div className={styles[classname]}>
                    <JahiaModuleTag path={path} type="placeholder" nodetypes={nodetypes}/>
                </div>
            );
        }

        return (
            <JahiaModuleTag path={path} nodetypes={nodetypes}>
                {children}
            </JahiaModuleTag>
        );
    }

    return children || null;
}

ChildComponent.propTypes = {
    isNodeEmpty: PropTypes.bool.isRequired,
    path: PropTypes.string,
    nodetypes: PropTypes.arrayOf(PropTypes.string),
    classname: PropTypes.string,
    children: PropTypes.node,
};

// *** Query sample without usage of useNode() ***
// const {workspace,locale,isEditMode} = React.useContext(JahiaCtx);
//
// const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
//     jcr(workspace: $workspace) {
//         workspace
//         nodeById(uuid: $id) {
//             ...CoreNodeFields
//             imagePosition:property(name:"imagePosition"){ value }
//             children{
//                 nodes{
//                     ...CoreNodeFields
//                     media: property(language:$language,name:"mediaNode"){
//                         refNode {...CoreNodeFields}
//                     }
//                 }
//             }
//         }
//     }
// }
// ${CORE_NODE_FIELDS}`;
//
// const {data, error, loading} = useQuery(getContent, {
//     variables: {
//         workspace,
//         id,
//         language:locale
//     }
// });
// const content = data?.jcr?.nodeById;

function HalfBlock({id}) {
    const {isEditMode, workspace} = React.useContext(JahiaCtx);

    const {data, error, loading} = useNode(id, [...animateProperties, 'imagePosition', 'mediaNode', 'text'], true);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const getChildNodeOfType = ({node, nodeType}) => {
        if (!Array.isArray(node.children) || node.children.length === 0) {
            return;
        }

        const childArray = node.children.filter(node =>
            node.primaryNodeType.name === nodeType,
        );
        return childArray[0];
    };

    const {properties: {imagePosition}} = data;

    const imageNode = getChildNodeOfType({
        node: data,
        nodeType: cms.contentTypes.HALFBLOCK_IMAGE,
    });

    const bodyNode = getChildNodeOfType({
        node: data,
        nodeType: cms.contentTypes.INDUS_TEXT,
    });

    return (
        <section>
            <div className="half d-lg-flex d-block">
                <div className={classNames('image', {
                    'order-2': imagePosition === 'right',
                    [styles.editImageWrapper]: isEditMode,
                })}
                >
                    <ChildComponent
                        isNodeEmpty={!imageNode}
                        path={imageNode?.path || 'image'}
                        nodetypes={[imageNode?.primaryNodeType.name || cms.contentTypes.HALFBLOCK_IMAGE]}
                        classname="editImageContainer"
                    >
                        {imageNode
                            && <Animate
                                properties={getAnimateProps(imageNode.properties)}
                                className={classNames('image-display', styles.image)}
                                style={{backgroundImage: `url('${getImageURI({
                                        uri: imageNode.properties.mediaNode.path,
                                        workspace})}')`}}/>}

                    </ChildComponent>
                </div>

                <div className="text text-center">
                    <ChildComponent
                        isNodeEmpty={!bodyNode}
                        path={bodyNode?.path || 'body'}
                        nodetypes={[bodyNode?.primaryNodeType.name || cms.contentTypes.INDUS_TEXT]}
                    >
                        {bodyNode
                        && <Animate properties={getAnimateProps(bodyNode.properties)}><EmbeddedPathInHtmlResolver htmlAsString={bodyNode.properties.text || 'no text'}/></Animate>}
                    </ChildComponent>
                </div>
            </div>
        </section>
    );
}

HalfBlock.propTypes = {
    id: PropTypes.string,
};

export default HalfBlock;
