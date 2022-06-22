import React from "react";
import * as PropTypes from "prop-types";
import styles from "./linkTo.module.css";
import NextLink from "next/link";
import CmsLink from "./jahia/CmsLink";
import classnames from "classnames";

function LinkTo({content,locale,fallback,className,children}) {
    // {[styles[fallback?.class]]:true}
    if(!content.linkType || !(content.externalLink || content.internalLink)){
        if(fallback.elt){
            function Fallback() {
                // const eltChildren = [children].flat()
                return React.createElement(
                    fallback.elt,
                    {
                        className:classnames(
                            fallback?.className,
                            fallback?.css?.reduce((classes,item)=>{
                                classes[styles[item]]=true
                                return classes;
                            },{})
                        )
                    },
                    children
                );
            }
            return (
                <Fallback>
                    {children}
                </Fallback>
            )
        }
        return children
    }


    let Component = NextLink;
    let url = content.externalLink;

    if(content.internalLink){
        Component = CmsLink;
        url = content.internalLink.path
    }
    return(
        <Component href={url} locale={locale}>
            <a target={content.linkTarget} className={className}>
                {children}
            </a>
        </Component>
    )
}
LinkTo.propTypes = {
    content: PropTypes.object.isRequired,
    locale: PropTypes.string,
    fallback: PropTypes.object,
    className:PropTypes.string,
    children: PropTypes.node.isRequired
};

export default LinkTo;
