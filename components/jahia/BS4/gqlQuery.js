import {gql} from '@apollo/client';
import {CORE_NODE_FIELDS} from '@jahia/nextjs-sdk';

export const queryGrid = gql`query (
        $workspace:Workspace!,
        $id: String!,
        $mainResourcePath: String,
        $language:String,
        $isEditMode: Boolean
    ){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid:$id) {
                renderedContent(
                    mainResourcePath: $mainResourcePath,
                    language: $language,
                    isEditMode:$isEditMode
                ){
                    output
                }
#                mixins:mixinTypes{
#                    name
#                }
                ...CoreNodeFields
                ...SectionFields
                ...ContainerFields
                ...RowFields
                children{
                    nodes{
                        ...CoreNodeFields
                        nodetypes: property(name:"j:contributeTypes"){ values }
                        listlimit: property(name:"limit"){ value:longValue }
                    }
                }
            }
        }
    }
    fragment SectionFields on JCRNode {
        sectionElement:property(name:"sectionElement") {value}
        sectionId:property(name:"sectionId") {value}
        sectionCssClass:property(name:"sectionCssClass") {value}
        sectionStyle:property(name:"sectionStyle") {value}
        sectionRole:property(name:"sectionRole") {value}
        sectionAria:property(name:"sectionAria") {value}
    }
    fragment ContainerFields on JCRNode {
        containerId:property(name:"containerId") {value}
        containerCssClass:property(name:"containerCssClass") {value}
        gridLayout:property(name:"gridLayout") {value}
    }
    fragment RowFields on JCRNode {
        typeOfGrid:property(name:"typeOfGrid") {value}
        grid:property(name:"grid") {value}
        gridClasses:property(name:"gridClasses") {value}
        rowId:property(name:"rowId") {value}
        rowCssClass:property(name:"rowCssClass") {value}
        rowVerticalAlignment:property(name:"rowVerticalAlignment") {value}
        rowHorizontalAlignment:property(name:"rowHorizontalAlignment") {value}
        
    }
    ${CORE_NODE_FIELDS}`;
