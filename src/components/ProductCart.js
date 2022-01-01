import React, { useState } from "react";
// bootstrap
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
// strip checkout
import StripeCheckout from "react-stripe-checkout";

const ProductCart = ({ cartItem, purchaseNow, removeProduct }) => {
  const [product] = useState({
    name: "productName",
    price: 500,
  });

  let totalAmount = 0;

  cartItem.forEach(
    (prod) =>
      (totalAmount = parseFloat(totalAmount) + parseFloat(prod.productPrice))
  );

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`https://stripe-projbackend.herokuapp.com/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE ", response);
        const { status } = response;
        console.log("STATUS ", status);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container fluid>
      <ListGroup className="text-center">
        {cartItem.map((prod) => (
          <ListGroupItem key={prod.productId}>
            <Row>
              <Col>
                <img
                  src={prod.cartTinyImg}
                  className="mt-3"
                  height={80}
                  alt="cardImg"
                />
              </Col>
              <Col>
                <ListGroup className="text-center">
                  <ListGroupItem>
                    <div className="text-secondary">{prod.productName}</div>
                  </ListGroupItem>
                  <ListGroupItem>
                    <div className="text-secondary">
                      Price: <strong>{prod.productPrice}</strong>Rs
                    </div>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Button
                      onClick={() => removeProduct(prod)}
                      color="danger"
                      outline
                      block
                    >
                      Remove
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
      {cartItem.length >= 1 ? (
        <Card outline color="secondary" className="mt-2">
          <CardHeader className="bg-secondary text-center text-white">
            Total Purchase
          </CardHeader>
          <CardBody>
            <div className="text-secondary text-center">
              Total amount for <strong>{cartItem.length}</strong> products is
              <strong>{totalAmount}</strong>
            </div>
            <Button onClick={purchaseNow} outline block color="secondary">
              CheckOut
            </Button>
            <StripeCheckout
              stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
              token={makePayment}
              name="TEST STRIPE"
              amount={product.price * 100}
              shippingAddress
              billingAddress
            >
              <Button outline block color="warning" className="mt-2">
                <strong>TEST STRIPE</strong>
              </Button>
            </StripeCheckout>
          </CardBody>
        </Card>
      ) : (
        <div className="text-warning text-center">
          <h3 className="m-0">
            <strong>-- Cart Empty --</strong>
          </h3>
        </div>
      )}
    </Container>
  );
};

export default ProductCart;
