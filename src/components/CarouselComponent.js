import Carousel from "react-bootstrap/Carousel";
import styles from "./CarouselComponent.module.scss";
import { Link } from "react-router-dom";
import pic1 from "../assets/images/pic1.jpg";
import pic2 from "../assets/images/pic2.jpg";
import pic3 from "../assets/images/pic3.jpg";

function CarouselComponent() {
  return (
    <Carousel fade nextLabel={null} prevLabel={null} className="mb-4">
      <Carousel.Item interval={5000000}>
        <img className="d-block w-100" src={pic1} alt="First slide" />
        <Carousel.Caption className={styles.textShadow}>
          <h3>Follow a healthy diet</h3>
          <p>
            Choose from a wide variety of the most delicious vegetarian recipes
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <Link to="/login">
          <img
            className="carousel-img d-block w-100"
            src={pic2}
            alt="Second slide"
          />

          <Carousel.Caption className={styles.textShadow}>
            <h3>Join us </h3>
            <p>Make your own recipe book by selecting your favourites dishes</p>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <a href="https://www.nutrition.gov/" target="_blank" rel="noreferrer">
          <img
            className="carousel-img d-block w-100"
            src={pic3}
            alt="Third slide"
          />

          <Carousel.Caption className={styles.textShadow}>
            <h3>Healthy information</h3>
            <p>
              Find out what you get from what you eat. by visiting the USDA
              website
            </p>
          </Carousel.Caption>
        </a>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
