import React from 'react';
import {Area} from "@jahia/nextjs-sdk";
import * as PropTypes from "prop-types";
import cms from "../jahia"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import FeatureImage from "../components/images/Features";
import Layout from "../components/Layout";

function FixedStructure({path, templateName}) {
    return (
        <Layout templateName={templateName} path={path}>
            <Area
                name="hero"
                mainResourcePath={path}
                tagProps={{
                    nodetypes:[cms.contentTypes.HERO],
                    listlimit:1
                }}
            />
            {/*Feature*/}
            <section className="section">
                <Container>
                    <Row className="mb-5">
                        <Col className="text-center">
                            <Area
                                name="feature-title"
                                mainResourcePath={path}
                                tagProps={{
                                    nodetypes:[cms.contentTypes.INDUS_TEXT],
                                    listlimit:1
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="align-items-stretch">
                        <Col lg={4} className="order-lg-2">
                            <Area
                                name="feature-image"
                                mainResourcePath={path}
                                tagProps={{
                                    nodetypes:[cms.contentTypes.IMAGE_REF],
                                    listlimit:1
                                }}
                                componentProps={{referenceComponent:FeatureImage}}
                            />
                        </Col>
                        <Col md={6} lg={4} className="feature-1-wrap d-md-flex flex-md-column order-lg-1">
                            <Area
                                name="feature-text-1"
                                mainResourcePath={path}
                                tagProps={{
                                    nodetypes:[cms.contentTypes.FEATURE_CONTENT_BLOC],
                                    listlimit:2
                                }}
                            />
                        </Col>
                        <Col md={6} lg={4} className="feature-1-wrap d-md-flex flex-md-column order-lg-3">
                            <Area
                                name="feature-text-2"
                                mainResourcePath={path}
                                tagProps={{
                                    nodetypes:[cms.contentTypes.FEATURE_CONTENT_BLOC],
                                    listlimit:2
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/*Article*/}
            <section className="section bg-light">{/*element-animate*/}
                <Container>
                    <Row className="align-items-center mb-5">
                        <Col lg={7} className="order-md-2">
                            <Area
                                name="article-image"
                                mainResourcePath={path}
                                tagProps={{
                                    nodetypes:[cms.contentTypes.IMAGE_REF],
                                    listlimit:1
                                }}
                                componentProps={{className:"img-fluid"}}
                            />
                        </Col>
                        <Col md={5} className="pr-md-5 mb-5">
                            <Area
                                name="article-text"
                                mainResourcePath={path}
                                tagProps={{
                                    nodetypes:[cms.contentTypes.INDUS_TEXT],
                                    listlimit:1
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/*Gallery*/}
            <section className="section border-t pb-0">
                <Container>
                    <Row className="mb-5 justify-content-center">
                        <Col md={8} className="text-center">
                            <Area
                                name="gallery-title"
                                mainResourcePath={path}
                                tagProps={{
                                    nodetypes:[cms.contentTypes.INDUS_TEXT],
                                    listlimit:1
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Row className="mb-5 no-gutters">
                        {Array.from({length: 6}, (v, i) => i).map( (v, i) => (
                            <Col key={v} md={4} className="text-center">
                                <Area
                                    name={`gallery-item-${i+1}`}
                                    mainResourcePath={path}
                                    tagProps={{
                                        nodetypes:[cms.contentTypes.GALLERY],
                                        listlimit:1
                                    }}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </Layout>
    )
}
FixedStructure.propTypes = {
    path: PropTypes.string.isRequired,
    templateName: PropTypes.string.isRequired

};

export default FixedStructure;


