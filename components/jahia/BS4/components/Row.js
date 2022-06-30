import React from 'react';
import * as PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {types} from '../types';
import {JahiaComponent} from '@jahia/nextjs-sdk';

//Note : revoir la creation de la grid
//col-lg-4 order-lg-2,col-md-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-1,col-md-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-3

function gridFromClassName ({gridClasses}) {
    console.log("gridFromClassName : ",gridClasses);
    if(!gridClasses?.value)
        return


}

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
        rowProps.className = `${grid.rowCssClass?.value} ${grid.rowVerticalAlignment?.value || ""} ${grid.rowHorizontalAlignment?.value || ""}`;
    }

    // Console.log("[BS4Row] mixins : ",mixins);
    // console.log("[BS4Row] children : ",children);
    // console.log("[BS4Row] rowProps : ",rowProps);

    function renderRow({cols}) {
        return (
            <Row {...rowProps}>
                {cols.map((col, index) => {
                    console.log("grid.children?.nodes: ",grid.children?.nodes)
                    const node = grid.children?.nodes[index];
                    console.log("node: ",node)

                    const{breakpoint,className} = col;
                    return (
                        <Col key={node.uuid} {...breakpoint} className={className}>
                            {renderComponent(node)}
                        </Col>
                    );
                })}
            </Row>
        );
    }

    function getGrid() {
        if (mixins.includes(types.predefinedGrid)) {
            console.log("cols 1: ",grid.grid?.value?.split('_'))
            const cols = grid.grid?.value?.split('_')
                .map(col => ({breakpoint:{md:col}}))
            console.log("cols 2: ",cols)
            return renderRow({
                cols
            });
        }

//col-lg-4 order-lg-2,col-md-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-1,col-md-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-3
        if (mixins.includes(types.customGrid)) {
            console.log("customGrid : ",grid.gridClasses);
            const cols = grid.gridClasses?.value?.split(',')
                .map(col => {
                    // col = "col-lg-4 order-lg-2"
                    const regex = /col-(?<key>[a-z]{2})-(?<value>[0-9]{1,2})/gm;
                    let className = col;
                    const breakpoint = {};
                    col.replace(regex,(match,key,value) => {
                        breakpoint[key]=value;
                        className = className.replace(match,'');
                    });
                    return {breakpoint,className}
                    // console.log("breakpoint :",breakpoint);
                    // console.log("className :",className);
                })
            return renderRow({
                cols
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
