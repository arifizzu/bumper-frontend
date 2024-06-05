import React from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "react-bootstrap";

const FormViewPreviewEmbed = ({ id }) => (
  <Card>
    <Card.Header>
      <Card.Title>Form Preview</Card.Title>
      <div style={{ marginBottom: "20px" }}>
        <h5 className="card-subtitle text-muted">
          This is your form preview page. The form has been embedded in another
          page and can also be embedded on other pages or websites.
        </h5>
      </div>
    </Card.Header>
    <Card.Body className="pt-0">
      <div className="ratio ratio-1x1" style={{ marginBottom: "20px" }}>
        <iframe
          title="Responsive embed video 1:1"
          //   src={`http://localhost:3000/forms/view/embed/${id}`}
          src={`${window.location.origin}/forms/view/embed/${id}`} // Dynamic URL
        ></iframe>
      </div>
      <p className="card-subtitle text-muted">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam ipsum
        fugit repellat commodi deserunt explicabo asperiores qui voluptates quis
        nisi at quidem, eius velit accusantium eligendi odit repellendus
        perferendis aspernatur!
      </p>
    </Card.Body>
  </Card>
);

export default FormViewPreviewEmbed;
