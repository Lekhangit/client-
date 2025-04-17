import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";

function AddProduct() {
  const [addName, setAddName] = useState("");
  const [addSize, setAddSize] = useState("");
  const [addPrice, setAddPrice] = useState("");
  const [addType, setAddType] = useState(""); // Lưu giá trị type (Puma, Nike, Adidas)
  const [addColor, setAddColor] = useState("");
  const [addStock, setAddStock] = useState("");
  const [addImage, setAddImage] = useState("");
  const [generatedId, setGeneratedId] = useState(""); // State để lưu ID tự động
  const [showAlert, setShowAlert] = useState(false); // State để hiển thị thông báo

  // Map type to brandCode
  const getBrandCode = (type) => {
    switch (type) {
      case "Puma":
        return "PM";
      case "Nike":
        return "NK";
      case "Adidas":
        return "AD";
      default:
        return "XX"; // Mặc định nếu không chọn
    }
  };

  const handleSaveClick = async () => {
    const brandCode = getBrandCode(addType); // Lấy brandCode dựa trên type

    const formData = new FormData();
    formData.append("name", addName);
    formData.append("type", addType);
    formData.append("sizes", addSize); // Gửi chuỗi, server sẽ tách thành mảng
    formData.append("color", addColor);
    formData.append("price", addPrice);
    formData.append("stock", addStock);
    formData.append("brandCode", brandCode); // Gửi brandCode đến server
    if (addImage) {
      formData.append("image", addImage); // Gửi file ảnh
    }

    try {
      const response = await fetch("http://localhost:3001/shoes", {
        method: "POST",
        body: formData, // Không cần `Content-Type`, trình duyệt tự thêm
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedId(data.shoe.id); // Lưu ID tự động vào state
        setShowAlert(true); // Hiển thị thông báo
        setAddName("");
        setAddPrice("");
        setAddSize("");
        setAddType("");
        setAddColor("");
        setAddStock("");
        setAddImage("");
      } else {
        alert("Failed to add shoe");
      }
    } catch (error) {
      console.error("Error adding shoe:", error);
      alert("An error occurred while adding the shoe");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAddImage(file); // Lưu file ảnh
    }
  };

  return (
    <Container>
      <NavLink to="/" className="btn btn-primary mb-3">
        <HomeIcon />
      </NavLink>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={addName}
            onChange={(e) => setAddName(e.target.value)}
            placeholder="Name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            value={addPrice}
            onChange={(e) => setAddPrice(e.target.value)}
            placeholder="Price"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            value={addColor}
            onChange={(e) => setAddColor(e.target.value)}
            placeholder="Color"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Sizes (comma separated)</Form.Label>
          <Form.Control
            type="text"
            value={addSize}
            onChange={(e) => setAddSize(e.target.value)}
            placeholder="Sizes (comma separated)"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="text"
            value={addStock}
            onChange={(e) => setAddStock(e.target.value)}
            placeholder="Stock"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Select
            value={addType}
            onChange={(e) => setAddType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Puma">Puma</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>
        {addImage && (
          <img
            src={URL.createObjectURL(addImage)}
            alt="Preview"
            className="img-thumbnail mb-3"
          />
        )}
        <Button variant="success" onClick={handleSaveClick}>
          Save
        </Button>
      </Form>

      {/* Hiển thị ID tự động */}
      {showAlert && (
        <Alert
          variant="info"
          className="mt-4"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <strong>Generated ID:</strong> {generatedId}
        </Alert>
      )}
    </Container>
  );
}

export default AddProduct;