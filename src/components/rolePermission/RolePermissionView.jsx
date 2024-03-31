import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Form,
} from "react-bootstrap";

import {
  showRoleStart,
  showRoleSuccess,
  showRoleFailure,
} from "../../redux/slices/roleSlice";

import { showRole } from "../../repositories/api/services/roleServices";

const RolePermissionView = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role.role);
  const [checkedPermissions, setCheckedPermissions] = useState({});
  //   console.log("id in component", id);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        dispatch(showRoleStart());
        const roleData = await showRole(id);
        dispatch(showRoleSuccess(roleData));
        // console.log("roleData", roleData);
      } catch (error) {
        dispatch(showRoleFailure(error));
      }
    };

    fetchRole();
  }, []);

  useEffect(() => {
    if (role && role.permissions) {
      const newCheckedPermissions = {};
      role.permissions.forEach((permission) => {
        newCheckedPermissions[permission.name] = true;
      });

      setCheckedPermissions(newCheckedPermissions);
    }
  }, [role]);

  return (
    <React.Fragment>
      <Row>
        <Col md="12" xl="5">
          <Card>
            <Card.Header>
              <Card.Title>Role</Card.Title>
              <h6 className="card-subtitle text-muted">Role Details</h6>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xl="4">
                  <h5 className="card-subtitle ">Name:</h5>
                </Col>
                {role ? (
                  <>
                    <Col>
                      <h5 className="card-subtitle text-muted">{role.name}</h5>
                    </Col>
                  </>
                ) : (
                  "Loading..."
                )}
              </Row>

              <Row className="mt-2">
                <Col xl="4">
                  <h5 className="card-subtitle ">Guard Name:</h5>
                </Col>
                {role ? (
                  <>
                    <Col>
                      <h5 className="card-subtitle text-muted">
                        {role.guard_name}
                      </h5>
                    </Col>
                  </>
                ) : (
                  "Loading..."
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md="12" xl="7">
          <Card>
            <Card.Header>
              <Card.Title>Permissions</Card.Title>
              <h6 className="card-subtitle text-muted">
                Permissions given to the role
              </h6>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <h6 className="card-subtitle ">Form Builder</h6>
                </Col>
              </Row>
              <Form.Group className="mb-2">
                <Row className="mt-2">
                  <Col>
                    <Form.Check
                      inline
                      label="view form"
                      type="checkbox"
                      name="view form"
                      checked={checkedPermissions["view form"] || false}
                      disabled
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="create form"
                      type="checkbox"
                      name="create form"
                      checked={checkedPermissions["create form"] || false}
                      disabled
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="edit form"
                      type="checkbox"
                      name="edit form"
                      checked={checkedPermissions["edit form"] || false}
                      disabled
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="delete form"
                      type="checkbox"
                      name="delete form"
                      checked={checkedPermissions["delete form"] || false}
                      disabled
                    />
                  </Col>
                </Row>
              </Form.Group>

              <hr></hr>

              <Row>
                <Col>
                  <h6 className="card-subtitle ">Process Builder</h6>
                </Col>
              </Row>
              <Form.Group className="mb-2">
                <Row className="mt-2">
                  <Col>
                    <Form.Check
                      inline
                      label="view process"
                      type="checkbox"
                      name="view process"
                      checked={checkedPermissions["view process"] || false}
                      disabled
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="create process"
                      type="checkbox"
                      name="create process"
                      checked={checkedPermissions["create process"] || false}
                      disabled
                    />
                  </Col>
                  <Col>
                    {" "}
                    <Form.Check
                      inline
                      label="edit process"
                      type="checkbox"
                      name="edit process"
                      checked={checkedPermissions["edit process"] || false}
                      disabled
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="delete process"
                      type="checkbox"
                      name="delete process"
                      checked={checkedPermissions["delete process"] || false}
                      disabled
                    />
                  </Col>
                </Row>
              </Form.Group>

              <hr></hr>

              <Row>
                <Col>
                  <h6 className="card-subtitle">Management Settings</h6>
                </Col>
              </Row>
              <Form.Group className="mb-2">
                <Row className="mt-2">
                  <Col>
                    <Form.Check
                      inline
                      label="view role"
                      type="checkbox"
                      name="view role"
                      checked={checkedPermissions["view role"] || false}
                      disabled
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="create role"
                      type="checkbox"
                      name="create role"
                      checked={checkedPermissions["create role"] || false}
                      disabled
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="edit role"
                      type="checkbox"
                      name="edit role"
                      checked={checkedPermissions["edit role"] || false}
                      disabled
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="delete role"
                      type="checkbox"
                      name="delete role"
                      checked={checkedPermissions["delete role"] || false}
                      disabled
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Form.Check
                      inline
                      label="view permission"
                      type="checkbox"
                      name="view permission"
                      checked={checkedPermissions["view permission"] || false}
                      disabled
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="create permission"
                      type="checkbox"
                      name="create permission"
                      checked={checkedPermissions["create permission"] || false}
                      disabled
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="edit permission"
                      type="checkbox"
                      name="edit permission"
                      checked={checkedPermissions["edit permission"] || false}
                      disabled
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="delete permission"
                      type="checkbox"
                      name="delete permission"
                      checked={checkedPermissions["delete permission"] || false}
                      disabled
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Form.Check
                      inline
                      label="view user"
                      type="checkbox"
                      name="view user"
                      checked={checkedPermissions["view user"] || false}
                      disabled
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="create user"
                      type="checkbox"
                      name="create user"
                      checked={checkedPermissions["create user"] || false}
                      disabled
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="edit user"
                      type="checkbox"
                      name="edit user"
                      checked={checkedPermissions["edit user"] || false}
                      disabled
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="delete user"
                      type="checkbox"
                      name="delete user"
                      checked={checkedPermissions["delete user"] || false}
                      disabled
                    />
                  </Col>
                </Row>
              </Form.Group>

              <hr></hr>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default RolePermissionView;
