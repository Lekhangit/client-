import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function Update({ shoe, onSave }) {
  const [updatedShoe, setUpdatedShoe] = useState({ ...shoe });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedShoe({ ...updatedShoe, [name]: value });
  };

  const handleSave = () => {
    onSave(updatedShoe);
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={updatedShoe.name}
          onChange={handleChange}
          placeholder="Enter product name"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Type</Form.Label>
        <Form.Control
          type="text"
          name="type"
          value={updatedShoe.type}
          onChange={handleChange}
          placeholder="Enter product type"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Sizes (comma-separated)</Form.Label>
        <Form.Control
          type="text"
          name="sizes"
          value={updatedShoe.sizes.join(", ")}
          onChange={(e) =>
            setUpdatedShoe({
              ...updatedShoe,
              sizes: e.target.value.split(",").map((size) => size.trim()),
            })
          }
          placeholder="Enter sizes (e.g., 38, 39, 40)"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Color</Form.Label>
        <Form.Control
          type="text"
          name="color"
          value={updatedShoe.color}
          onChange={handleChange}
          placeholder="Enter product color"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={updatedShoe.price}
          onChange={handleChange}
          placeholder="Enter product price"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Stock</Form.Label>
        <Form.Control
          type="number"
          name="stock"
          value={updatedShoe.stock}
          onChange={handleChange}
          placeholder="Enter product stock"
        />
      </Form.Group>
      <Button variant="success" onClick={handleSave}>
        Save
      </Button>
    </Form>
  );
}

export default Update;