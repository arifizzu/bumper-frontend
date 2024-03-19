import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  Briefcase,
  Home,
  MapPin,
  MessageSquare,
  Mail,
  User,
} from "react-feather";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import {
  showUserStart,
  showUserSuccess,
  showUserFailure,
} from "../../redux/slices/userSlice";

import { showUser } from "../../repositories/api/services/userServices";

import avatar4 from "../../assets/img/avatars/avatar-4.jpg";

const UserView = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log("user", user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch(showUserStart());
        const userData = await showUser(id);
        dispatch(showUserSuccess(userData));
      } catch (error) {
        dispatch(showUserFailure(error));
      }
    };

    fetchUsers();
  }, []);

  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <Card.Title className="mb-0">Profile Details</Card.Title>
        </Card.Header>
        <Card.Body className="text-center">
          <img
            src={avatar4}
            alt="Stacie Hall"
            className="img-fluid rounded-circle mb-2"
            width="128"
            height="128"
          />
          {/* <Card.Title className="mb-0">Stacy</Card.Title> */}
          <Card.Title className="mb-0">
            {user ? user.name : "Loading..."}
          </Card.Title>
        </Card.Body>
        <hr className="my-0" />

        <Card.Body>
          <Card.Title>About</Card.Title>
          <ul className="list-unstyled mb-0">
            <li className="mb-1">
              <Mail width={14} height={14} className="me-1" />
              {user ? user.email : "Loading..."}
            </li>

            <li className="mb-1">
              <User width={14} height={14} className="me-1" />
              {user ? (
                <span>
                  {user.roles.map((role, index) => (
                    <React.Fragment key={role.id}>
                      {index > 0 && ", "} {/* Add comma if not first role */}
                      {role.name}
                    </React.Fragment>
                  ))}
                </span>
              ) : (
                "Loading..."
              )}
            </li>
          </ul>
        </Card.Body>

        {/* <hr className="my-0" />

        <Card.Body>
          <Card.Title>Skills</Card.Title>
          <Badge bg="primary" className="me-2 my-1">
            HTML
          </Badge>
          <Badge bg="primary" className="me-2 my-1">
            JavaScript
          </Badge>
          <Badge bg="primary" className="me-2 my-1">
            Sass
          </Badge>
          <Badge bg="primary" className="me-2 my-1">
            Angular
          </Badge>
          <Badge bg="primary" className="me-2 my-1">
            Vue
          </Badge>
          <Badge bg="primary" className="me-2 my-1">
            React
          </Badge>
          <Badge bg="primary" className="me-2 my-1">
            Redux
          </Badge>
          <Badge bg="primary" className="me-2 my-1">
            UI
          </Badge>
          <Badge bg="primary" className="me-2 my-1">
            UX
          </Badge>
        </Card.Body>

        <hr className="my-0" />
        <Card.Body>
          <Card.Title>About</Card.Title>
          <ul className="list-unstyled mb-0">
            <li className="mb-1">
              <Home width={14} height={14} className="me-1" /> Lives in{" "}
              <Link to="/dashboard/default">San Francisco, SA</Link>
            </li>

            <li className="mb-1">
              <User width={14} height={14} className="me-1" /> Works at{" "}
              <Link to="/dashboard/default">GitHub</Link>
            </li>
            <li className="mb-1">
              <MapPin width={14} height={14} className="me-1" /> From{" "}
              <Link to="/dashboard/default">Boston</Link>
            </li>
          </ul>
        </Card.Body>
        <hr className="my-0" />
        <Card.Body>
          <Card.Title>Elsewhere</Card.Title>

          <ul className="list-unstyled mb-0">
            <li className="mb-1">
              <FontAwesomeIcon icon={faGlobe} fixedWidth className="me-1" />
              <Link to="/dashboard/default">staciehall.co</Link>
            </li>
            <li className="mb-1">
              <FontAwesomeIcon icon={faTwitter} fixedWidth className="me-1" />
              <Link to="/dashboard/default">Twitter</Link>
            </li>
            <li className="mb-1">
              <FontAwesomeIcon icon={faFacebook} fixedWidth className="me-1" />
              <Link to="/dashboard/default">Facebook</Link>
            </li>
            <li className="mb-1">
              <FontAwesomeIcon icon={faInstagram} fixedWidth className="me-1" />
              <Link to="/dashboard/default">Instagram</Link>
            </li>
            <li className="mb-1">
              <FontAwesomeIcon icon={faLinkedin} fixedWidth className="me-1" />
              <Link to="/dashboard/default">LinkedIn</Link>
            </li>
          </ul>
        </Card.Body> */}
      </Card>
    </React.Fragment>
  );
};

export default UserView;
