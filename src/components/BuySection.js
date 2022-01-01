import React, { useEffect, useState } from "react";
// axios
import Axios from "axios";
// faker
import { datatype, commerce } from "faker";
// bootstrap
import { Container, Row, Col } from "reactstrap";
// component
import ProductCard from "./ProductsCard";

// pexel key
// const pexelsKey = process.env.REACT_APP_API_KEY;
// pesel request url
// const url = `https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1`;
// json url
const jsonUrl = process.env.REACT_APP_JSON_LINK;

const BuySection = ({ addToCart }) => {
  const [product, setProduct] = useState([]);
  // console.log(product);

  //   const fetchPhotos = async () => {
  //     const response = await Axios.get(url, {
  //       headers: {
  //         Authorization: pexelsKey,
  //       },
  //     });
  //     // console.log(response);
  //   };

  const fetchPhotos = async () => {
    const { data } = await Axios.get(jsonUrl);
    // console.log(data);
    const { photos } = data;

    const productsObj = photos.map((imgSrc) => ({
      cardImg: imgSrc.src.medium,
      cartTinyImg: imgSrc.src.tiny,
      productName: commerce.productName(),
      productDescription: commerce.productDescription(),
      productPrice: commerce.price(),
      productId: datatype.uuid(),
    }));

    setProduct(productsObj);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <Container fluid>
      <Row>
        {product.map((prod) => (
          <Col md={4} className="mb-2" key={prod.productId}>
            <ProductCard product={prod} addToCart={addToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BuySection;
