import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Button,
  Breadcrumb,
  Row,
  Col,
  Modal,
  Dropdown,
  Badge,
  Card,
} from "react-bootstrap";
import { Calendar, Filter, RefreshCw } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

import Dashboard from "../../components/dashboard/Dashboard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Helmet title="Dashboard" />
      <Container fluid className="p-0">
        <Row className="mb-2 mb-xl-3">
          <Col xs="auto" className="d-none d-sm-block">
            <h3>Dashboard</h3>
          </Col>
        </Row>
        <Dashboard />
      </Container>
    </React.Fragment>
  );
};

export default DashboardPage;
