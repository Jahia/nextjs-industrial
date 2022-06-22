import React, {useEffect} from 'react';
import Head from "next/head";
import Main from "./jahia/Main";
import Nav from "./Nav";
import {JahiaCtx} from "@jahia/nextjs-lib";
import classNames from "classnames";
import styles from "./layout.module.css";
import * as PropTypes from "prop-types";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

// import {HeartFill} from 'react-bootstrap-icons';

function Layout({children, path, templateName, meta}) {
    const {isEditMode} = React.useContext(JahiaCtx);
    // console.log("[Layout] isEditMode : ", isEditMode);

    // useEffect(() => {
    //     if (process.browser && !isEditMode) {
    //         import('waypoints/lib/jquery.waypoints.min').then(() => {
    //             const contentWayPoint = () => {
    //                 // let i = 0;
    //                 $('.element-animate').waypoint(function (direction) {
    //                     // eslint-disable-next-line react/no-this-in-sfc
    //                     if (direction === 'down' && !$(this.element).hasClass('element-animated')) {
    //                         // i++;
    //                         // eslint-disable-next-line react/no-this-in-sfc
    //                         $(this.element).addClass('item-animate');
    //
    //                         setTimeout(function () {
    //                             $('body .element-animate.item-animate').each(function (k) {
    //                                 const el = $(this);
    //                                 setTimeout(function () {
    //                                     const effect = el.data('animate-effect');
    //                                     if (effect === 'fadeIn') {
    //                                         el.addClass('fadeIn element-animated');
    //                                     } else if (effect === 'fadeInLeft') {
    //                                         el.addClass('fadeInLeft element-animated');
    //                                     } else if (effect === 'fadeInRight') {
    //                                         el.addClass('fadeInRight element-animated');
    //                                     } else {
    //                                         el.addClass('fadeInUp element-animated');
    //                                     }
    //                                     el.removeClass('item-animate');
    //                                 }, k * 100);
    //                             });
    //                         }, 100);
    //                     }
    //                 }, {offset: '95%'});
    //             };
    //             contentWayPoint();
    //         });
    //     }
    // }, []);

    //TODO define meta here
    // with <HeartFill className="text-danger"/> by <a href="https://colorlib.com" target="_blank" rel="noreferrer">Colorlib</a>
    return (
        <>
            <Head>
                <title>Hello</title>

                {isEditMode &&
                    <link type="text/css" href="/gwt/resources/css/jahia-anthracite/edit.css" rel="stylesheet"/>}
            </Head>
            <Main
                path={path}
                templateName={templateName}
                className="jahia-edit"
            >
                <header role="banner">
                    <Nav base={`/sites/${process.env.NEXT_PUBLIC_JAHIA_SITE}`} path={path}/>
                </header>
                <div className={classNames("top-shadow", {[styles.topShadowEdit]: isEditMode})}/>
                {children}
                <footer className="site-footer" role="contentinfo">
                    <Container>
                        <Row>
                            <Col className="text-md-center text-left">
                                <p className="copyright">
                                    Copyright &copy; {new Date().getFullYear()} All rights reserved | This template is inspired by
                                    template from <a href="https://colorlib.com" target="_blank" rel="noreferrer">Colorlib</a>
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </Main>


        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    path: PropTypes.string.isRequired,
    templateName: PropTypes.string.isRequired,
    meta: PropTypes.object
};

export default Layout;
