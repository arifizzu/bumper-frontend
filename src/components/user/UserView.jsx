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
import defaultUser from "../../assets/img/avatars/default-user.png";

const UserView = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  // console.log("user", user);
  // console.log("id in userview", id);

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
            // src={avatar4}
            src={defaultUser}
            alt="Stacie Hall"
            className="img-fluid rounded-circle mb-2"
            width="100"
            height="100"
          />
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
      </Card>
    </React.Fragment>
  );
};

export default UserView;
