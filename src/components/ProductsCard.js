import React from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardText,
} from "reactstrap";

const ProductCard = ({ product, addToCart }) => {
  return (
    <Card outline color="secondary">
      <CardHeader className="bg-secondary text-center text-white">
        {product.productName}
      </CardHeader>
      <CardImg top src={product.cardImg} className="img-fluid px-1 pt-1" />
      <CardBody className="text-center">
        <CardText className="text-secondary text-truncate">
          {product.productDescription}
        </CardText>
        <CardText>
          <Badge color="secondary">Price:</Badge>{" "}
          <strong>{product.productPrice}</strong>Rs
        </CardText>
        <Button
          onClick={() => addToCart(product)}
          outline
          block
          color="secondary"
        >
          Add to Cart
        </Button>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
