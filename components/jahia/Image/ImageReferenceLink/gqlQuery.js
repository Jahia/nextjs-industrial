import {gql} from "@apollo/client";
import {CORE_NODE_FIELDS} from "@jahia/nextjs-lib";

export const queryImageRef = gql`query (
        $workspace:Workspace!,
        $id: String!,
        $language:String!
    ){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid:$id) {
                ...CoreNodeFields
                mixinTypes { name }#jmix:externalLink || jmix:internalLink
                alt:property(language:$language,name:"j:alternateText"){ value }
                target:property(name:"j:target"){ value }
                #referenceView:property(name:"j:referenceView"){ value }
                linkType:property(name:"j:linkType"){ value } # none || internal(jmix:internalLink) || external(jmix:externalLink)
                linkTitle:property(language:$language,name:"j:linkTitle"){ value } # if(jmix:externalLink)
                linkUrl:property(language:$language,name:"j:url"){ value } # if(jmix:externalLink)
                linkNode:property(language:$language,name:"j:linknode"){ #if(jmix:internalLink)
                    refNode { ...CoreNodeFields }
                }
                imageNode:property(language:$language,name:"j:node"){
                    refNode { ...CoreNodeFields }
                }
            }
        }
    }
    ${CORE_NODE_FIELDS}`;
