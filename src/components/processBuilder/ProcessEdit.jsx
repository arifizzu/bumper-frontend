import React, { useEffect, useState, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from "react-select";

// import ReactFlow, {
//   ReactFlowProvider,
//   addEdge,
//   useNodesState,
//   useEdgesState,
//   Controls,
// } from "reactflow";
// import "reactflow/dist/style.css";

// import "./style.css";
// import "./index.css";
// import DnDFlow from "./DnDFlow";

import {
  Button,
  Card,
  Container,
  Col,
  Row,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faX,
  faGrip,
  faMagnifyingGlass,
  faEdit,
  faWindowMinimize,
  faSave,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";

import {
  showProcess,
  updateProcess,
} from "../../repositories/api/services/processServices";
import {
  showProcessStart,
  showProcessSuccess,
  showProcessFailure,
} from "../../redux/slices/processSlice";

const schemaProcessDetail = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  short_name: Yup.string().required("Short Name is required"),
});

const ProcessEdit = ({ id }) => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const process = useSelector((state) => state.process.process);
  // const [showModalProcessDetail, setShowModalProcessDetail] = useState(false);

  // const toggleModalProcessDetail = () => {
  //   setShowModalProcessDetail(
  //     (prevShowModalProcessDetail) => !prevShowModalProcessDetail
  //   );
  // };

  // useEffect(() => {
  //   const fetchProcess = async () => {
  //     try {
  //       dispatch(showProcessStart());
  //       const process = await showProcess(id);
  //       console.log("process", process);
  //       dispatch(showProcessSuccess(process));
  //     } catch (error) {
  //       dispatch(showProcessFailure(error));
  //     }
  //   };
  //   fetchProcess();
  // }, []);

  return (
    <React.Fragment>
      <Container fluid className="p-0">
        <Row>
          <Col md={3}>
            <Card>
              {" "}
              <Card.Header>
                <Card.Title>Tools</Card.Title>
                <h6 className="card-subtitle text-muted">
                  You can drag and drop item into the Process Layout
                </h6>
              </Card.Header>
              <Card.Body>
                <ToolList />
              </Card.Body>
            </Card>
          </Col>
          {/* <Col md={9}>
            <Card>
              <Card.Header>
                <Row>
                  <Col>
                    {" "}
                    <Card.Title>Process Detail</Card.Title>
                  </Col>
                  <Col>
                    <Button
                      variant="warning"
                      className="float-end mt-n1 me-2"
                      onClick={toggleModalProcessDetail}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit Process Detail
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Col md="6" xl="">
                    <h5>Name: {process ? process.name : "Loading..."}</h5>
                    <h5>
                      Short Name: {process ? process.short_name : "Loading..."}
                    </h5>
                  </Col>
                  <Col md="6" xl="">
                    <h5>
                      Created By:{" "}
                      {process ? process.created_by.name : "Loading..."}
                    </h5>
                    <h5>
                      Created At: {process ? process.created_at : "Loading..."}
                    </h5>
                  </Col>
                </Row>
                <hr></hr>
              </Card.Header>
              <Card.Body className="text-left">
                <h4>Process Layout</h4>
                <ProcessLayout />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal
        show={showModalProcessDetail}
        onHide={toggleModalProcessDetail}
        centered
      >
        <Modal.Header closeButton>Edit Process</Modal.Header>
        <Modal.Body className="text-center m-3">
          <Formik
            validationSchema={schemaProcessDetail}
            // onSubmit={console.log}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                setSubmitting(true);
                const result = await updateProcess(id, values);
                if (result.success === true) {
                  console.log("Process updated successfully");
                  window.location.reload();
                  toggleModalProcessDetail();
                } else if (result.name && result.name.length > 0) {
                  setErrors({ name: result.name[0] }); // Set the error for the name field
                } else {
                  console.error("Error update process:", result);
                }
              } catch (error) {
                console.error("Unexpected error:", error);
                setErrors({ name: error.name[0] });
              } finally {
                setSubmitting(false); // Reset form submitting state
              }
            }}
            initialValues={{
              name: (process && process.name) || "",
              short_name: (process && process.short_name) || "",
              group_id: (process && process.group_id) || "",
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3} className="text-sm-right">
                    Name*
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isValid={touched.name && !errors.name}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3} className="text-sm-right">
                    Short Name*
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      name="short_name"
                      value={values.short_name}
                      onChange={handleChange}
                      isValid={touched.short_name && !errors.short_name}
                      isInvalid={touched.short_name && !!errors.short_name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.short_name}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Button
                  type="submit"
                  variant="success"
                  className="float-end mt-n1 me-2"
                >
                  Save Process Detail
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <DnDFlow /> */}
        </Row>
      </Container>
    </React.Fragment>
  );
};

// const ToolList = ({}) => {
//   const dispatch = useDispatch();
//   const onDragStart = (event, nodeType) => {
//     event.dataTransfer.setData("application/reactflow", nodeType);
//     event.dataTransfer.effectAllowed = "move";
//     console.log("Drag start:", nodeType);
//   };

//   return (
//     <React.Fragment>
//       <aside>
//         <div className="description">
//           You can drag these nodes to the pane on the right.
//         </div>
//         <div
//           className="dndnode input"
//           onDragStart={(event) => onDragStart(event, "input")}
//           draggable
//         >
//           Input Node
//         </div>
//         <div
//           className="dndnode"
//           onDragStart={(event) => onDragStart(event, "default")}
//           draggable
//         >
//           Default Node
//         </div>
//         <div
//           className="dndnode output"
//           onDragStart={(event) => onDragStart(event, "output")}
//           draggable
//         >
//           Output Node
//         </div>
//       </aside>
//     </React.Fragment>
//   );
// };

// const ProcessLayout = ({}) => {
//   const initialNodes = [
//     {
//       id: "1",
//       type: "input",
//       data: { label: "input node" },
//       position: { x: 250, y: 5 },
//     },
//   ];
//   let id = 0;
//   const getId = () => `dndnode_${id++}`;

//   const reactFlowWrapper = useRef(null);
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [reactFlowInstance, setReactFlowInstance] = useState(null);

//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     []
//   );

//   const onDragOver = useCallback((event) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = "move";
//   }, []);

//   //   const onDrop = useCallback(
//   //     (event) => {
//   //       event.preventDefault();

//   //       const type = event.dataTransfer.getData("application/reactflow");
//   //       // check if the dropped element is valid
//   //       if (typeof type === "undefined" || !type) {
//   //         return;
//   //       }

//   //       // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
//   //       // and you don't need to subtract the reactFlowBounds.left/top anymore
//   //       // details: https://reactflow.dev/whats-new/2023-11-10
//   //       const position = reactFlowInstance.screenToFlowPosition({
//   //         x: event.clientX,
//   //         y: event.clientY,
//   //       });

//   //       const newNode = {
//   //         id: getId(),
//   //         type,
//   //         position,
//   //         data: { label: `${type} node` },
//   //       };

//   //       setNodes((nds) => nds.concat(newNode));
//   //     },
//   //     [reactFlowInstance]
//   //     );

//   const onDrop = useCallback(
//     (event) => {
//       event.preventDefault();
//       const type = event.dataTransfer.getData("application/reactflow");
//       console.log("Dropped node type:", type);
//       // rest of the onDrop logic...
//       if (typeof type === "undefined" || !type) {
//         return;
//       }

//       // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
//       // and you don't need to subtract the reactFlowBounds.left/top anymore
//       // details: https://reactflow.dev/whats-new/2023-11-10
//       const position = reactFlowInstance.screenToFlowPosition({
//         x: event.clientX,
//         y: event.clientY,
//       });

//       //   const position = reactFlowInstance.project({
//       //     x:
//       //       event.clientX - reactFlowWrapper.current.getBoundingClientRect().left,
//       //     y: event.clientY - reactFlowWrapper.current.getBoundingClientRect().top,
//       //   });
//       const newNode = {
//         id: getId(),
//         type,
//         position,
//         data: { label: `${type} node` },
//       };

//       setNodes((nds) => nds.concat(newNode));
//     },
//     [reactFlowInstance]
//   );

//   return (
//     <React.Fragment>
//       <div className="dndflow">
//         <ReactFlowProvider>
//           <div
//             className="reactflow-wrapper"
//             ref={reactFlowWrapper}
//             style={{
//               border: "1px solid black",
//               minHeight: "400px",
//               background: "white",
//               marginTop: "10px",
//             }}
//           >
//             <h1>he</h1>
//             <ReactFlow
//               nodes={nodes}
//               edges={edges}
//               onNodesChange={onNodesChange}
//               onEdgesChange={onEdgesChange}
//               onConnect={onConnect}
//               onInit={setReactFlowInstance}
//               onDrop={onDrop}
//               onDragOver={onDragOver}
//               fitView
//             >
//               <Controls />
//             </ReactFlow>
//             <h1>he</h1>
//           </div>
//           <ToolList />
//         </ReactFlowProvider>
//       </div>
//       <DnDFlow />
//     </React.Fragment>
//   );
// };

export default ProcessEdit;
