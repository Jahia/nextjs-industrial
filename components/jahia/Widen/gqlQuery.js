import {gql} from '@apollo/client';
import {CORE_NODE_FIELDS} from '@jahia/nextjs-sdk';

export const queryWidenRef = gql`query (
        $workspace:Workspace!,
        $id: String!
    ){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid:$id) {
                ...CoreNodeFields
                defaultImageSize:property(name:"wden:defaultImageSize"){ value:longValue }
                imageSizes:property(name:"wden:imageSizes"){ value:longValues }
                pdfMinHeight:property(name:"wden:pdfMinHeight"){ value:longValue }
                referenceView:property(name:"j:referenceView"){ value }
                node:property(name:"j:node",){
                    refNode {
                        ...CoreNodeFields
                    }
                }
            }
        }
    }
    ${CORE_NODE_FIELDS}`;
