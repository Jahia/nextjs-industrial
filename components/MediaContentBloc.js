import React from "react";
import {JahiaCtx,CORE_NODE_FIELDS} from "@jahia/nextjs-lib";
import {gql, useQuery} from "@apollo/client";
import * as PropTypes from "prop-types";
import * as Icons from "react-bootstrap-icons";

function MediaContentBloc({id}) {
    const {workspace, locale} = React.useContext(JahiaCtx);
    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
                title: property(language:$language, name:"title"){value}
                teaser: property(language:$language,name:"teaser"){value}
                iconName: property(name:"iconName",){value}
            }
        }
    }
    ${CORE_NODE_FIELDS}`;

    const {data, error, loading} = useQuery(getContent, {
        variables: {
            workspace,
            id,
            language: locale,
        }
    });

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    const content = data?.jcr?.nodeById;


    const getIcon = () => {
        if(content.iconName?.value){
            const { [content.iconName.value]: Icon } = Icons;
            if(Icon)
                return <Icon className="text-primary"/>
        }
    }

    return (
        <div className="media block-6 d-block text-center">
            <div className="icon mb-3">
                {getIcon()}
            </div>
            <div className="media-body">
                <h3 className="heading">{content.title?.value}</h3>
                <p>{content.teaser?.value}</p>
            </div>
        </div>
    )
}

MediaContentBloc.propTypes = {
    id: PropTypes.string.isRequired
};
export default MediaContentBloc;
