import React, { useState } from "react";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
// toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
// components
import BuySection from "./components/BuySection";
import ProductCart from "./components/ProductCart";

const App = () => {
  // state hook for storing products
  const [cartItem, setCartItem] = useState([]);

  // method for adding product to cart
  const addToCart = (product) => {
    const isAlreadyAdded = cartItem.findIndex((products) => {
      return products.productId === product.productId;
    });

    if (isAlreadyAdded !== -1) {
      return toast("Product already in cart...", { type: "warning" });
    }

    setCartItem([...cartItem, product]);
    return toast("Product added to cart...", { type: "success" });
  };

  // method for purchase
  const purchaseNow = () => {
    setCartItem([]);
    return toast("Purchase completed...", { type: "success" });
  };

  // method for removing product
  const removeProduct = (product) => {
    setCartItem(cartItem.filter((products) => products.id !== product.id));
    return toast("Product removed from cart...", { type: "error" });
  };

  return (
    <Container fluid>
      <ToastContainer position="bottom-center" />
      <Row className="mt-3">
        <Col md="8">
          <BuySection addToCart={addToCart} />
        </Col>
        <Col md="4">
          <ProductCart
            cartItem={cartItem}
            removeProduct={removeProduct}
            purchaseNow={purchaseNow}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
