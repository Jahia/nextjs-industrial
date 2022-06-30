import Open from "./Open";
import FixedStructure from "./FixedStructure";
import {templates} from "@jahia/nextjs-sdk";

export const registerTemplates = () => {
    Object.assign(templates, {
        'open': Open,
        'fixedstructure': FixedStructure,
        'default': Open
    });
}
