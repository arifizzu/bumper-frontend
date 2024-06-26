import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Accordion,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Nav,
  Navbar,
  Row,
  Tooltip,
  OverlayTrigger,
  Table,
} from "react-bootstrap";

import {
  Code,
  DownloadCloud,
  Mail,
  Sliders,
  Smartphone,
  Users,
  CheckSquare,
  Table as TableIcon,
} from "react-feather";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import {
  SIDEBAR_POSITION,
  SIDEBAR_BEHAVIOR,
  LAYOUT,
  THEME,
} from "../../constants";

import useTheme from "../../hooks/useTheme";
import useSidebar from "../../hooks/useSidebar";
import useLayout from "../../hooks/useLayout";

import { ReactComponent as Logo } from "../../assets/img/logo.svg";

import screenshotMixed from "../../assets/img/screenshots/mixed.jpg";
import screenshotThemeDefault from "../../assets/img/screenshots/theme-default.jpg";
import screenshotThemeDark from "../../assets/img/screenshots/theme-dark.jpg";
import screenshotThemeColored from "../../assets/img/screenshots/theme-colored.jpg";
import screenshotThemeLight from "../../assets/img/screenshots/theme-light.jpg";
import screenshotSidebarCompact from "../../assets/img/screenshots/sidebar-compact.jpg";
import screenshotSidebarRight from "../../assets/img/screenshots/sidebar-right.jpg";
import bumperDashboardScreenshot from "../../assets/img/bumper/dashboardScreenshot.png";

import screenshotDashboardDefault from "../../assets/img/screenshots/dashboard-default.jpg";
import screenshotDashboardAnalytics from "../../assets/img/screenshots/dashboard-analytics.jpg";
import screenshotDashboardSaaS from "../../assets/img/screenshots/dashboard-saas.jpg";
import screenshotDashboardSocial from "../../assets/img/screenshots/dashboard-social.jpg";
import screenshotDashboardCrypto from "../../assets/img/screenshots/dashboard-crypto.jpg";
import screenshotPageProjects from "../../assets/img/screenshots/pages-projects-list.jpg";

import brandBootstrap from "../../assets/img/brands/bootstrap.svg";
import brandReact from "../../assets/img/brands/react.svg";
import brandRedux from "../../assets/img/brands/redux.svg";
import brandReactRouter from "../../assets/img/brands/react-router.svg";
import brandFirebase from "../../assets/img/brands/firebase.svg";
import brandCognito from "../../assets/img/brands/cognito.svg";
import brandAuth0 from "../../assets/img/brands/auth0.svg";
import brandJWT from "../../assets/img/brands/jwt.svg";
import brandESLint from "../../assets/img/brands/eslint.svg";
import brandJavaScript from "../../assets/img/brands/javascript.svg";
import brandTypeScript from "../../assets/img/brands/typescript.svg";

const Navigation = () => (
  <Navbar expand="md" className="landing-navbar">
    <Container>
      <Navbar.Brand className="landing-brand" href="/">
        <Logo /> Business Process Management System{" "}
        <Badge as="sup" bg="" className="badge-soft-primary p-1">
          BUMPER
        </Badge>
      </Navbar.Brand>
      <Nav className="ms-auto" navbar>
        {/* <Nav.Item className="d-none d-md-inline-block">
          <Nav.Link
            href="/dashboard/default"
            target="_blank"
            rel="noreferrer"
            active
            className="text-lg px-lg-3"
          >
            Live Preview
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/docs/introduction"
            target="_blank"
            rel="noreferrer"
            active
            className="text-lg px-lg-3"
          >
            Documentation
          </Nav.Link>
        </Nav.Item> */}
        <Nav.Item className="d-none d-md-inline-block">
          <Nav.Link href="#introduction" active className="text-lg px-lg-3">
            Introduction
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-none d-md-inline-block">
          <Nav.Link href="#features" active className="text-lg px-lg-3">
            Features
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-none d-md-inline-block">
          <Nav.Link href="/auth/sign-in" active className="text-lg px-lg-3">
            Login
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  </Navbar>
);

const Intro = () => (
  <section
    className="landing-intro landing-bg pt-5 pt-lg-6 pb-5 pb-lg-7"
    id="introduction"
  >
    <Container className="landing-intro-content">
      <Row className="align-items-center">
        <Col lg="5" className="mx-auto">
          <Badge bg="" className="badge-soft-primary p-1">
            v1.0.0
          </Badge>

          {/* <div className="my-4">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Available for Web</Tooltip>}
            >
              <img
                width="40"
                height="40"
                src={brandJavaScript}
                alt="JavaScript"
                className="d-inline-block me-2"
              />
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Available for TypeScript</Tooltip>}
            >
              <img
                width="40"
                height="40"
                src={brandTypeScript}
                alt="TypeScript"
                className="d-inline-block"
              />
            </OverlayTrigger>
          </div> */}

          <h1 className="my-4">
            Fully-featured Form and Datalist Builder Platform
          </h1>

          <p className="text-lg">
            A professional platform that offers intuitive drag-and-drop
            functionality for creating custom forms and data lists with ease.
          </p>

          {/* <div className="my-4">
            <div className="d-inline-block me-3">
              <h2 className="text-dark">10+</h2>
              <span className="text-muted">Custom Fields</span>
            </div>
            <div className="d-inline-block me-3">
              <h2 className="text-dark">1500+</h2>
              <span className="text-muted">SVG Icons</span>
            </div>
            <div className="d-inline-block">
              <h2 className="text-dark">45+</h2>
              <span className="text-muted">Pages</span>
            </div>
          </div> */}
          <div className="my-4">
            <a href="/auth/sign-in" className="btn btn-primary btn-lg me-2">
              Login
            </a>
          </div>
        </Col>
        <Col lg="7" className="d-none d-lg-flex mx-auto text-center">
          <div className="landing-intro-screenshot pb-3">
            <img
              src={bumperDashboardScreenshot}
              alt="Bumper Dashboard"
              className="img-fluid"
            />
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

const ColorSchemesAndLayouts = () => (
  <section className="py-6 bg-white">
    <Container className="position-relative z-3">
      <Row>
        <Col md="12" className="mx-auto text-center">
          <Row>
            <div className="col-lg-10 col-xl-9 mx-auto">
              <div className="mb-4">
                <h2 className="h1 mb-3">
                  Multiple color schemes &amp; layouts
                </h2>
                <p className="text-muted fs-lg">
                  4 Pre-built color schemes and multiple layout types are
                  available to make this template your very own. All the color
                  schemes can take variation in color and styling, that can
                  easily be modified using Sass variables.
                </p>
              </div>
            </div>
          </Row>

          <Row>
            <Col md="4" className="py-3">
              <Link
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/dashboard/default?theme=default"
              >
                <img
                  src={screenshotThemeDefault}
                  className="img-fluid rounded-lg landing-img"
                  alt="Bootstrap 5 Dashboard Theme"
                />
              </Link>
              <h4>Default</h4>
            </Col>
            <Col md="4" className="py-3">
              <Link
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/dashboard/default?sidebarBehavior=compact"
              >
                <img
                  src={screenshotSidebarCompact}
                  className="img-fluid rounded-lg landing-img"
                  alt="Compact Sidebar Bootstrap 5 Dashboard Theme"
                />
              </Link>
              <h4>
                Compact sidebar{" "}
                <sup>
                  <Badge as="small" bg="primary">
                    New
                  </Badge>
                </sup>
              </h4>
            </Col>
            <Col md="4" className="py-3">
              <Link
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/dashboard/default?theme=dark"
              >
                <img
                  src={screenshotThemeDark}
                  className="img-fluid rounded-lg landing-img"
                  alt="Dark Bootstrap 5 Dashboard Theme"
                />
              </Link>
              <h4>
                Dark{" "}
                <sup>
                  <Badge as="small" bg="primary">
                    New
                  </Badge>
                </sup>
              </h4>
            </Col>
            <Col md="4" className="py-3">
              <Link
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/dashboard/default?theme=colored"
              >
                <img
                  src={screenshotThemeColored}
                  className="img-fluid rounded-lg landing-img"
                  alt="Colored Bootstrap 5 Dashboard Theme"
                />
              </Link>
              <h4>
                Colored{" "}
                <sup>
                  <Badge as="small" bg="primary">
                    New
                  </Badge>
                </sup>
              </h4>
            </Col>
            <Col md="4" className="py-3">
              <Link
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/dashboard/default?theme=light"
              >
                <img
                  src={screenshotThemeLight}
                  className="img-fluid rounded-lg landing-img"
                  alt="Light Bootstrap 5 Dashboard Theme"
                />
              </Link>
              <h4>Light</h4>
            </Col>
            <Col md="4" className="py-3">
              <Link
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/dashboard/default?sidebarPosition=right"
              >
                <img
                  src={screenshotSidebarRight}
                  className="img-fluid rounded-lg landing-img"
                  alt="Right Sidebar Bootstrap 5 Dashboard Theme"
                />
              </Link>
              <h4>
                Right sidebar{" "}
                <sup>
                  <Badge as="small" bg="primary">
                    New
                  </Badge>
                </sup>
              </h4>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </section>
);

const Integrations = () => (
  <section className="pt-6">
    <Container>
      <Row>
        <Col md="10" className="mx-auto text-center">
          <div className="mb-5">
            <h2 className="h1">
              Launch faster with ready-to-deploy integrations
            </h2>
            <p className="text-muted fs-lg">
              AppStack React includes multiple ready-to-deploy integrations,
              including Redux, ESLint, Prettier, Auth0, Firebase Authentication,
              Amazon Cognito &amp; JSON Web Token Authentication.
            </p>

            <div className="my-4">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>React v18</Tooltip>}
              >
                <div className="landing-integration">
                  <img src={brandReact} alt="React v18" />
                </div>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Redux</Tooltip>}
              >
                <div className="landing-integration">
                  <img src={brandRedux} alt="Redux" />
                </div>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>React Router v6</Tooltip>}
              >
                <div className="landing-integration">
                  <img
                    src={brandReactRouter}
                    alt="React Router v6"
                    height="36"
                    style={{ margin: "2px 0" }}
                  />
                </div>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Firebase Authentication</Tooltip>}
              >
                <div className="landing-integration">
                  <img src={brandFirebase} alt="Firebase Authentication" />
                </div>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Amazon Cognito</Tooltip>}
              >
                <div className="landing-integration">
                  <img src={brandCognito} alt="Amazon Cognito" />
                </div>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Auth0</Tooltip>}
              >
                <div className="landing-integration">
                  <img src={brandAuth0} alt="Auth0" />
                </div>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>JSON Web Token</Tooltip>}
              >
                <div className="landing-integration">
                  <img src={brandJWT} alt="JSON Web Token" />
                </div>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>ESLint</Tooltip>}
              >
                <div className="landing-integration">
                  <img src={brandESLint} alt="ESLint" />
                </div>
              </OverlayTrigger>
            </div>

            <Button
              variant="primary"
              size="lg"
              as="a"
              href="/docs/introduction"
              target="_blank"
              rel="noreferrer"
            >
              Open documentation
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

const Testimonials = () => (
  <section className="py-6">
    <Container>
      <div className="mb-5 text-center">
        <h2 className="h1">Developers love AppStack React</h2>
        <p className="text-muted fs-lg">
          Here's what some of our 5,000+ customers have to say about working
          with our products.
        </p>
      </div>
      <Row>
        <Col md="6" lg="4">
          <Card as="blockquote" className="landing-quote border">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div>
                  <img
                    src={brandBootstrap}
                    width="48"
                    height="48"
                    alt="Bootstrap"
                  />
                </div>
                <div className="ps-3">
                  <h5 className="mb-1 mt-2">Nikita</h5>
                  <small className="d-block text-muted h5 fw-normal">
                    Head of Product
                  </small>
                </div>
              </div>
              <p className="lead mb-2">
                “We are totally amazed with a simplicity and the design of the
                template.{" "}
                <span>Probably saved us hundreds of hours of development.</span>{" "}
                We are absolutely amazed with the support Bootlab has provided
                us.”
              </p>

              <div className="landing-stars">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card as="blockquote" className="landing-quote border">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div>
                  <img
                    src={brandBootstrap}
                    width="48"
                    height="48"
                    alt="Bootstrap"
                  />
                </div>
                <div className="ps-3">
                  <h5 className="mb-1 mt-2">Alejandro</h5>
                  <small className="d-block text-muted h5 fw-normal">
                    Back-end Developer
                  </small>
                </div>
              </div>
              <p className="lead mb-2">
                “Everything is so properly set up that{" "}
                <span>
                  any new additions I'd make would feel like a native extension
                  of the theme
                </span>{" "}
                versus a simple hack. I definitely feel like this will save me
                hundredths of hours I'd otherwise spend on designing.”
              </p>

              <div className="landing-stars">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md="6" lg="4" className="d-block d-md-none d-lg-block">
          <Card as="blockquote" className="landing-quote border">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div>
                  <img
                    src={brandBootstrap}
                    width="48"
                    height="48"
                    alt="Bootstrap"
                  />
                </div>
                <div className="ps-3">
                  <h5 className="mb-1 mt-2">Jordi</h5>
                  <small className="d-block text-muted h5 fw-normal">
                    Front-end Developer
                  </small>
                </div>
              </div>
              <p className="lead mb-2">
                “I ran into a problem and contacted support. Within 24 hours, I
                not only received a response but even an updated version that
                solved my problem and works like a charm.{" "}
                <span>Fantastic customer service!</span>”
              </p>

              <div className="landing-stars">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </section>
);

const DashboardsAndPages = () => (
  <section className="py-6 bg-white" id="demos">
    <Container className="position-relative z-3">
      <Row>
        <Col md="12" className="mx-auto text-center">
          <Row>
            <div className="col-lg-10 col-xl-9 mx-auto">
              <div className="mb-4">
                <h2 className="h1 mb-3">Multiple dashboards &amp; pages</h2>
                <p className="text-muted fs-lg">
                  5 Dashboards and 40+ Pages featuring various components,
                  giving you the freedom of choosing and combining. All
                  components can take variation in color and styling, that can
                  easily be modified using Sass.
                </p>
              </div>
            </div>
          </Row>

          <Row>
            <Col md="4" className="py-3">
              <Link
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/dashboard/default"
              >
                <img
                  src={screenshotDashboardDefault}
                  className="img-fluid rounded-lg landing-img"
                  alt="Bootstrap 5 Dashboard Theme"
                />
              </Link>
              <h4>Default Dashboard</h4>
            </Col>
            <Col md="4" className="py-3">
              <Link
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/dashboard/analytics"
              >
                <img
                  src={screenshotDashboardAnalytics}
                  className="img-fluid rounded-lg landing-img"
                  alt="Analytics Bootstrap 5 Dashboard Theme"
                />
              </Link>
              <h4>Analytics Dashboard</h4>
            </Col>
            <Col md="4" className="py-3">
              <Link
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/dashboard/saas"
              >
                <img
                  src={screenshotDashboardSaaS}
                  className="img-fluid rounded-lg landing-img"
                  alt="SaaS Bootstrap 5 Dashboard Theme"
                />
              </Link>
              <h4>SaaS Dashboard</h4>
            </Col>
            <Col md="4" className="py-3">
              <Link
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/dashboard/social"
              >
                <img
                  src={screenshotDashboardSocial}
                  className="img-fluid rounded-lg landing-img"
                  alt="Social Bootstrap 5 Dashboard Theme"
                />
              </Link>
              <h4>Social Dashboard</h4>
            </Col>
            <Col md="4" className="py-3">
              <Link
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/dashboard/crypto"
              >
                <img
                  src={screenshotDashboardCrypto}
                  className="img-fluid rounded-lg landing-img"
                  alt="Crypto Bootstrap 5 Dashboard Theme"
                />
              </Link>
              <h4>
                Crypto Dashboard{" "}
                <sup>
                  <Badge as="small" bg="primary">
                    New
                  </Badge>
                </sup>
              </h4>
            </Col>
            <Col md="4" className="py-3">
              <Link
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/pages/projects"
              >
                <img
                  src={screenshotPageProjects}
                  className="img-fluid rounded-lg landing-img"
                  alt="Projects Bootstrap 5 Dashboard Theme"
                />
              </Link>
              <h4>
                Projects Dashboard{" "}
                <sup>
                  <Badge as="small" bg="primary">
                    New
                  </Badge>
                </sup>
              </h4>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </section>
);

const Features = () => (
  <section className="py-6" id="features">
    <Container>
      <Row>
        <Col md="10" className="mx-auto text-center">
          <div className="mb-5">
            <h2 className="h1">Features you'll love</h2>
            <p className="text-muted text-lg">
              A responsive platform built for everyone who wants to create and
              manage forms and data lists with ease, powered by intuitive
              drag-and-drop functionality.
            </p>
          </div>

          <Row className="text-start">
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <CheckSquare />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">Intuitive Drag-and-Drop Form Builder</h4>
                  <p className="fs-lg">
                    With our user-friendly drag-and-drop interface, creating
                    customized forms is a breeze. No technical knowledge
                    required! Users can effortlessly tailor forms to their
                    specific needs.
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <TableIcon />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">
                    Flexible Datalist Creation and Management
                  </h4>
                  <p className="fs-lg">
                    Easily create and manage data lists with our powerful
                    Datalist Builder. Add, remove, and reorder columns, filters,
                    and action buttons to suit your needs.
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <Mail />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">
                    Seamless Integration with Existing Systems
                  </h4>
                  <p className="fs-lg">
                    Integrate seamlessly with your existing databases. No need
                    for complex data migrations—enjoy continuity and simplicity
                    in data management.
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <Users />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">
                    Comprehensive Role and Permission Management
                  </h4>
                  <p className="fs-lg">
                    Admins can create roles, assign permissions, and manage user
                    access with precision. Enhance security and operational
                    control effortlessly.
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <Code />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">
                    Embedded Forms and Data Lists for Easy Access
                  </h4>
                  <p className="fs-lg">
                    Embed forms and data lists directly into your web pages.
                    Enhance the accessibility and usability of your data
                    collection processes.
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <i data-feather="download-cloud"></i>
                  <DownloadCloud />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">Multi-Format File Export</h4>
                  <p className="fs-lg">
                    Transform your forms into multiple file formats, including
                    PDF and CSV. Download these files effortlessly to share and
                    store your data as needed.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </section>
);

const Faq = () => {
  const [activeKey, setActiveKey] = useState("0");

  return (
    <section className="bg-white py-6">
      <Container>
        <div className="mb-5 text-center">
          <h2 className="h1">Frequently Asked Questions</h2>
          <p className="text-muted fs-lg">
            Here are some of the answers you might be looking for.
          </p>
        </div>

        <Row>
          <Col md={9} lg={8} className="mx-auto">
            <Accordion activeKey={activeKey}>
              <Card className="border mb-3">
                <Card.Header
                  className="cursor-pointer"
                  onClick={() => setActiveKey("0")}
                >
                  <h6 className="mb-0">
                    Does this product support TypeScript?
                  </h6>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body className="py-3">
                    Yes, the package includes two projects, based on JavaScript
                    &amp; TypeScript. Both projects are fully-featured, and
                    contain all components, icons, pages, auth types and more.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className="border mb-3">
                <Card.Header
                  className="cursor-pointer"
                  onClick={() => setActiveKey("1")}
                >
                  <h6 className="mb-0">Is there any support included?</h6>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body className="py-3">
                    You have access to the Software's online support services
                    via email for six (6) months from the purchase date. Please
                    contact us at{" "}
                    <a href="mailto:support@bootlab.io">support@bootlab.io</a>{" "}
                    for any questions.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className="border mb-3">
                <Card.Header
                  className="cursor-pointer"
                  onClick={() => setActiveKey("2")}
                >
                  <h6 className="mb-0">
                    How do I get a receipt for my purchase?
                  </h6>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                  <Card.Body className="py-3">
                    You'll receive an email from Bootstrap themes once your
                    purchase is complete. More info can be found{" "}
                    <a
                      href="https://themes.zendesk.com/hc/en-us/articles/360000011052-How-do-I-get-a-receipt-for-my-purchase-"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      here
                    </a>
                    .
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className="border mb-3">
                <Card.Header
                  className="cursor-pointer"
                  onClick={() => setActiveKey("3")}
                >
                  <h6 className="mb-0">
                    What methods of payments are supported?
                  </h6>
                </Card.Header>
                <Accordion.Collapse eventKey="3">
                  <Card.Body className="py-3">
                    You can purchase the themes on Bootstrap Themes via any
                    major credit/debit card (via Stripe) or with your Paypal
                    account. We don't support cryptocurrencies or invoicing at
                    this time.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className="border mb-3">
                <Card.Header
                  className="cursor-pointer"
                  onClick={() => setActiveKey("4")}
                >
                  <h6 className="mb-0">
                    Does this product work with npm / yarn?
                  </h6>
                </Card.Header>
                <Accordion.Collapse eventKey="4">
                  <Card.Body className="py-3">
                    Yes, AppStack React has been thoroughly tested with npm and
                    yarn (LTS versions).
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const Footer = () => (
  <footer className="footer">
    <Container fluid>
      <Row className="text-muted">
        <Col xs="6" className="text-start">
          <ul className="list-inline">
            <li className="list-inline-item">
              <span className="text-muted" href="#">
                Support
              </span>
            </li>
            <li className="list-inline-item">
              <span className="text-muted" href="#">
                Help Center
              </span>
            </li>
            <li className="list-inline-item">
              <span className="text-muted" href="#">
                Privacy
              </span>
            </li>
            <li className="list-inline-item">
              <span className="text-muted" href="#">
                Terms of Service
              </span>
            </li>
          </ul>
        </Col>
        <Col xs="6" className="text-end">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} -{" "}
            <span href="/" className="text-muted">
              BUMPER
            </span>
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
);

const Landing = () => {
  const { setTheme } = useTheme();
  const { setPosition, setBehavior } = useSidebar();
  const { setLayout } = useLayout();

  useEffect(() => {
    setTheme(THEME.DEFAULT);
    setPosition(SIDEBAR_POSITION.LEFT);
    setBehavior(SIDEBAR_BEHAVIOR.STICKY);
    setLayout(LAYOUT.FLUID);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Navigation />
      <Intro />
      {/* <ColorSchemesAndLayouts /> */}
      {/* <Integrations /> */}
      {/* <Testimonials /> */}
      {/* <DashboardsAndPages /> */}
      <Features />
      {/* <Faq /> */}
      <Footer />
    </React.Fragment>
  );
};

export default Landing;
