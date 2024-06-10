import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTable, usePagination } from "react-table";
import {
  Card,
  Pagination,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Accordion,
  Badge,
  Dropdown,
  Table as BootstrapTable,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useTranslation } from "react-i18next";
import {
  DollarSign,
  ShoppingBag,
  Table,
  CheckSquare,
  Settings,
} from "react-feather";
import illustration from "../../assets/img/illustrations/customer-support.png";

import { getDatalists } from "../../repositories/api/services/datalistServices";

import { getForms } from "../../repositories/api/services/formServices";

import { getRoles } from "../../repositories/api/services/roleServices";

import { getUsers } from "../../repositories/api/services/userServices";

import {
  getUserLog,
  getFormLog,
} from "../../repositories/api/services/logServices";
import { MoreHorizontal } from "react-feather";
import { Bar } from "react-chartjs-2";
import usePalette from "../../hooks/usePalette";

const Dashboard = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [totalDatalists, setTotalDatalists] = useState(0);
  const [totalForms, setTotalForms] = useState(0);
  const [totalRoles, setTotalRoles] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [userLogs, setUserLogs] = useState([]);
  const [formLogs, setFormLogs] = useState([]);

  useEffect(() => {
    const fetchDatalists = async () => {
      const datalists = await getDatalists();
      setTotalDatalists(datalists.length);
    };
    const fetchForms = async () => {
      const forms = await getForms();
      setTotalForms(forms.length);
    };
    const fetchRoles = async () => {
      const roles = await getRoles();
      setTotalRoles(roles.length);
    };
    const fetchUsers = async () => {
      const users = await getUsers();
      setTotalUsers(users.length);
    };
    const fetchUserLogs = async () => {
      const userLog = await getUserLog();
      console.log("userLog", userLog);
      setUserLogs(userLog);
    };

    const fetchFormLogs = async () => {
      const formLog = await getFormLog();
      console.log("formLog", formLog);
      setFormLogs(formLog);
    };

    fetchDatalists();
    fetchForms();
    fetchRoles();
    fetchUsers();
    fetchUserLogs();
    fetchFormLogs();
  }, []);

  return (
    <React.Fragment>
      <Statistics
        currentUser={currentUser}
        totalDatalists={totalDatalists}
        totalForms={totalForms}
        totalRoles={totalRoles}
        totalUsers={totalUsers}
      />

      <Row>
        <Col lg="8" className="d-flex">
          <FormUsageBarChart formLogs={formLogs} />
        </Col>
        <Col lg="4" className="d-flex">
          <UserLogs userLogs={userLogs} />
        </Col>
      </Row>
      <Row>
        <Col lg="6" className="d-flex">
          <TopFormUsage formLogs={formLogs} />
        </Col>
        <Col lg="6" className="d-flex">
          <TopUserByDataEntry formLogs={formLogs} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

const Statistics = ({
  currentUser,
  totalDatalists,
  totalForms,
  totalRoles,
  totalUsers,
}) => {
  return (
    <React.Fragment>
      <Row>
        <Col md="6" xl className="d-flex">
          <Card className="illustration flex-fill">
            <Card.Body className="p-0 d-flex flex-fill">
              <Row className="g-0 w-100">
                <Col xs="6">
                  <div className="illustration-text p-3 m-1">
                    <h4 className="illustration-text">
                      Welcome back, {currentUser.name}!
                    </h4>
                    <p className="mb-0">Bumper Dashboard</p>
                  </div>
                </Col>
                <Col xs={6} className="align-self-end text-end">
                  <img
                    src={illustration}
                    alt="Customer Support"
                    className="img-fluid illustration-img"
                    onClick={() => navigate("/dashboard")}
                    style={{ cursor: "pointer" }}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md="6" xl className="d-flex">
          <Card className="flex-fill">
            <Card.Body className=" py-4">
              <div className="d-flex align-items-start">
                <div className="flex-grow-1">
                  <h3 className="mb-2">Datalist Builder</h3>
                  <p className="mb-2">
                    Total Datalists:{" "}
                    <Badge bg="" className="badge-soft-primary me-2">
                      {" "}
                      {totalDatalists}{" "}
                    </Badge>
                  </p>
                </div>
                <div className="d-inline-block ms-3">
                  <div className="stat">
                    <Table
                      className="align-middle text-success"
                      onClick={() => navigate("/datalist-builder")}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md="6" xl className="d-flex">
          <Card className="flex-fill">
            <Card.Body className=" py-4">
              <div className="d-flex align-items-start">
                <div className="flex-grow-1">
                  <h3 className="mb-2">Form Builder</h3>
                  <p className="mb-2">
                    Total Forms:{" "}
                    <Badge bg="" className="badge-soft-primary me-2">
                      {" "}
                      {totalForms}{" "}
                    </Badge>
                  </p>
                </div>
                <div className="d-inline-block ms-3">
                  <div className="stat">
                    <CheckSquare
                      className="align-middle text-success"
                      onClick={() => navigate("/form-builder-v2")}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md="6" xl className="d-flex">
          <Card className="flex-fill">
            <Card.Body className=" py-4">
              <div className="d-flex align-items-start">
                <div className="flex-grow-1">
                  <h3 className="mb-2">Management</h3>
                  <p className="mb-2">
                    Total Roles:{" "}
                    <Badge bg="" className="badge-soft-primary me-2">
                      {" "}
                      {totalRoles}{" "}
                    </Badge>
                  </p>
                  <p className="mb-2">
                    Total Users:{" "}
                    <Badge bg="" className="badge-soft-primary me-2">
                      {" "}
                      {totalUsers}{" "}
                    </Badge>
                  </p>
                </div>
                <div className="d-inline-block ms-3">
                  <div className="stat">
                    <Settings
                      className="align-middle text-success"
                      onClick={() => navigate("/role-permission")}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const UserLogs = ({ userLogs }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Format as needed
  };

  return (
    <React.Fragment>
      <Card className="flex-fill w-100">
        <Card.Header>
          <Card.Title className="mb-0">User Log</Card.Title>
        </Card.Header>
        <Card.Body
          className="d-flex"
          style={{ height: "300px", overflowY: "auto" }}
        >
          <ul className="timeline">
            {userLogs.map((userLog, index) => (
              <li className="timeline-item" key={index}>
                <strong>
                  {userLog.action.toUpperCase()} {userLog.type.toUpperCase()}
                </strong>
                <span className="float-end text-muted text-sm">
                  {formatDate(userLog.created_at)}
                </span>
                <p>
                  <strong>{userLog.user.name} </strong>
                  has {userLog.action} {userLog.type} named{" "}
                  <strong>
                    {userLog.related.name || userLog.related.title}
                  </strong>
                </p>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

const FormUsageBarChart = ({ formLogs }) => {
  const palette = usePalette();

  // Initialize an array with 12 zeros to hold the count for each month
  const monthlyCounts = Array(12).fill(0);

  // Iterate through formLogs and count the entries for each month
  formLogs.forEach((log) => {
    const date = new Date(log.created_at);
    const month = date.getMonth(); // getMonth() returns 0 for January, 1 for February, etc.
    monthlyCounts[month]++;
  });

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Total Form Usage",
        backgroundColor: palette.primary,
        borderColor: palette.primary,
        hoverBackgroundColor: palette.primary,
        hoverBorderColor: palette.primary,
        data: monthlyCounts,
        // data: [120, 86, 78, 65, 43, 53, 120, 86, 78, 65, 43, 53],
        barPercentage: 0.325,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    cornerRadius: 15,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 20,
        },
        stacked: true,
      },
      x: {
        grid: {
          color: "transparent",
        },
        stacked: true,
      },
    },
  };
  return (
    <React.Fragment>
      <Card className="flex-fill w-100">
        <Card.Header>
          <Card.Title className="mb-0">Form Usage</Card.Title>
        </Card.Header>
        <Card.Body className="d-flex">
          <div className="align-self-center w-100">
            <div className="chart chart-lg">
              <Bar data={data} options={options} />
            </div>
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

const TopFormUsage = ({ formLogs }) => {
  // Step 1: Count occurrences of each form_id
  const formCount = formLogs.reduce((acc, log) => {
    acc[log.form_id] = (acc[log.form_id] || 0) + 1;
    return acc;
  }, {});

  // Step 2: Sort the forms by count in descending order
  const sortedForms = Object.entries(formCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Step 3: Get the form details for the top 5 forms
  const topForms = sortedForms.map(([formId, count]) => {
    const formLog = formLogs.find((log) => log.form_id === parseInt(formId));
    return { form: formLog.form, count };
  });

  return (
    <React.Fragment>
      <Card className="flex-fill w-100">
        <Card.Header>
          <Card.Title className="mb-0">Top 5 Most Used Forms</Card.Title>
        </Card.Header>
        <Card.Body className="d-flex flex-column">
          <BootstrapTable striped className="my-0">
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Name</th>
                <th>Total Usage</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {topForms.map((form, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{form.form ? form.form.name : "N/A"}</td>
                  <td>{form.count}</td>
                  <td>
                    {form.form
                      ? new Date(form.form.created_at).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </BootstrapTable>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

const TopUserByDataEntry = ({ formLogs }) => {
  // Step 1: Count occurrences of each user_id
  const userCount = formLogs.reduce((acc, log) => {
    acc[log.user_id] = (acc[log.user_id] || 0) + 1;
    return acc;
  }, {});

  // Step 2: Sort the users by count in descending order
  const sortedUsers = Object.entries(userCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Step 3: Get the user details for the top 5 users
  const topUsers = sortedUsers.map(([userId, count]) => {
    const userLog = formLogs.find((log) => log.user_id === parseInt(userId));
    return { user: userLog.user, count };
  });

  return (
    <React.Fragment>
      <Card className="flex-fill w-100">
        <Card.Header>
          <Card.Title className="mb-0">
            Top 5 Users by Data Entry Count
          </Card.Title>
        </Card.Header>
        <Card.Body className="d-flex flex-column">
          <BootstrapTable striped className="my-0">
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Name</th>
                <th>Total Entries</th>
              </tr>
            </thead>
            <tbody>
              {topUsers.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.user.name}</td>
                  <td>{user.count}</td>
                </tr>
              ))}
            </tbody>
          </BootstrapTable>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default Dashboard;
