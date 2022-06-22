import React from "react";
import {useNode} from "@jahia/nextjs-lib";
// import {JahiaCtx,CORE_NODE_FIELDS} from "@jahia/nextjs-lib";
// import {gql, useQuery} from "@apollo/client";
import * as PropTypes from "prop-types";
import * as Icons from "react-bootstrap-icons";

function FeatureContentBloc({id}) {
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
    //     }
    // });


    const {data, error, loading} = useNode(id,["title","teaser","iconName"]);

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    // const content = data?.jcr?.nodeById;
    const content = data.properties;

    const getIcon = () => {
        if(content.iconName){
            const { [content.iconName]: Icon } = Icons;
            if(Icon)
                return <Icon className="display-4 text-primary"/>
        }
    }

    return (
        <div className="feature-1 d-md-flex">
            <div className="align-self-center">
                {getIcon()}
                <h3>{content.title}</h3>
                <p>{content.teaser}</p>
            </div>
        </div>
    )
}

FeatureContentBloc.propTypes = {
    id: PropTypes.string.isRequired
};
export default FeatureContentBloc;
