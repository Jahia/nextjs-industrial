import React from 'react';
import * as PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {types} from '../types';
import {JahiaComponent} from '@jahia/nextjs-lib';

function BS4Row({grid, mixins, children}) {
    const renderComponent = node => (
        <JahiaComponent
            key={node.uuid}
            node={node}
            tagProps={{
                type: 'area',
                nodetypes: node.nodetypes?.values || ['jmix:droppableContent'],
                listlimit: node.listlimit?.value,
                // Note : get this dynamically
                referencetypes: ['jnt:fileReference[jnt:file]', 'jnt:fileI18nReference[jnt:file]', 'jnt:contentReference[jmix:droppableContent]', 'jnt:contentFolderReference[jnt:contentFolder]', 'jnt:portletReference[jnt:portlet]', 'jnt:imageReferenceLink[jmix:image]', 'jnt:imageReference[jmix:image]', 'jnt:nodeLinkImageReference[jmix:image]', 'jnt:nodeLinkI18nImageReference[jmix:image]', 'jnt:externalLinkImageReference[jmix:image]', 'jnt:externalLinkI18nImageReference[jmix:image]', 'jnt:imageI18nReference[jmix:image]'],
                allowreferences: true,
            }}
        />
    );

    if (!mixins.includes(types.createRow)) {
        if (children) {
            return children;
        }

        return grid.children?.nodes?.map(node => renderComponent(node));
    }

    const rowProps = {};
    if (grid.rowId?.value) {
        rowProps.id = grid.rowId.value;
    }

    if (grid.rowCssClass?.value) {
        rowProps.className = `${grid.rowCssClass?.value} ${grid.rowVerticalAlignment?.value} ${grid.rowHorizontalAlignment?.value}`;
    }

    // Console.log("[BS4Row] mixins : ",mixins);
    // console.log("[BS4Row] children : ",children);
    // console.log("[BS4Row] rowProps : ",rowProps);

    function renderRow({cols, keyProps}) {
        return (
            <Row {...rowProps}>
                {cols.map((col, index) => {
                    const node = grid.children?.nodes[index];
                    return (
                        <Col key={node.uuid} {...{[keyProps]: col}}>
                            {renderComponent(node)}
                        </Col>
                    );
                })}
            </Row>
        );
    }

    function getGrid() {
        if (mixins.includes(types.predefinedGrid)) {
            return renderRow({
                cols: grid.grid?.value?.split('_'),
                keyProps: 'md',
            });
        }

        if (mixins.includes(types.customGrid)) {
            return renderRow({
                cols: grid.gridClasses?.value?.split(','),
                keyProps: 'className',
            });
        }
    }

    return getGrid();
}

BS4Row.propTypes = {
    grid: PropTypes.object.isRequired,
    mixins: PropTypes.array,
    children: PropTypes.node,
};

export default BS4Row;
