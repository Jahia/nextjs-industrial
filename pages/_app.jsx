import React from 'react';
import {JahiaNextApp} from '@jahia/nextjs-sdk';

import '../styles/style.scss';
import {registerTemplates} from '../templates/registerTemplates';
import {registerComponents} from '../components/registerComponents';

registerTemplates();
registerComponents();

JahiaNextApp.useRender = () => {
    React.useEffect(() => {
        import('bootstrap/dist/js/bootstrap');
    }, []);
};

export default JahiaNextApp;
