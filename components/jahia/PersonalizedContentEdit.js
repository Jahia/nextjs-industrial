import React, {useEffect} from 'react';
import ReactDOM from "react-dom";
import {JahiaCtx} from "../../lib/context";
import {gql, useQuery} from "@apollo/client";
import components from "../index";
import * as PropTypes from "prop-types";
import {JahiaComponent} from "./JahiaComponent";
import {Button} from '@jahia/moonstone/dist/components/Button';

export function PersonalizedContentEdit({id}) {
    const {workspace, locale, isEditMode} = React.useContext(JahiaCtx);
    const [index, setIndex] = React.useState(0)
    const getContent = gql`query($workspace: Workspace!, $id: String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                workspace
                uuid
                name
                path
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
                    }
                }
            }
        }
    }`;

    const {data, loading, error} = useQuery(getContent, {
        variables: {
            workspace,
            id
        }
    });

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    const next = (e) => {
        setIndex(index => index < data.jcr.nodeById.children.nodes.length - 1 ? index + 1 : index)
    }
    const prev = (e) => {
        setIndex(index => index > 0 ? index - 1 : index)
    }

    return (
        <div>
            Personalized content - edition
            <Button label="<" onClick={prev}/> {index + 1}/{data.jcr.nodeById.children.nodes.length}
            <Button label=">" onClick={next}/>
            <JahiaComponent node={data.jcr.nodeById.children.nodes[index]}/>
        </div>
    );
}

PersonalizedContentEdit.propTypes = {
    id: PropTypes.string.isRequired,
}

