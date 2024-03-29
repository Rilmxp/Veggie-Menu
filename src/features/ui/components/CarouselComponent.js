import Carousel from "react-bootstrap/Carousel";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// low and high definition imgs for responsive loading
import carousel1Small from "../../../assets/images/carousel1-1000w.jpg";
import carousel1Big from "../../../assets/images/carousel1-2000w.jpg";
import carousel2Small from "../../../assets/images/carousel2-1000w.jpg";
import carousel2Big from "../../../assets/images/carousel2-2000w.jpg";
import carousel3Small from "../../../assets/images/carousel3-1000w.jpg";
import carousel3Big from "../../../assets/images/carousel3-2000w.jpg";

import styles from "./CarouselComponent.module.scss";

function CarouselComponent() {
  const user = useSelector((store) => store.user);

  return (
    <section>
      <Carousel fade nextLabel={null} prevLabel={null} className="mb-4">
        <Carousel.Item interval={5000} className={styles.carouselLayout}>
          <a href="#recipe-search">
            <img
              className="d-block w-100"
              srcSet={`${carousel1Small} 1000w, ${carousel1Big} 2000w`}
              src={carousel1Small}
              alt="Fruits and vegetables"
            />
            <Carousel.Caption className={styles.caption}>
              <h3>Follow a healthy diet</h3>
              <p>Search for the most delicious vegetarian recipes</p>
            </Carousel.Caption>
          </a>
        </Carousel.Item>
        <Carousel.Item interval={5000} className={styles.carouselLayout}>
          <Link to={user.user ? `/account` : "/login"}>
            <img
              className="carousel-img d-block w-100"
              srcSet={`${carousel2Small} 1000w, ${carousel2Big} 2000w`}
              src={carousel2Small}
              alt="Brekfast displayed on a table"
            />

            <Carousel.Caption className={styles.caption}>
              <h3>Join us</h3>
              <p>
                Create your own cookbook by selecting your favourites recipes
              </p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item interval={5000} className={styles.carouselLayout}>
          <a href="https://www.nutrition.gov/" target="_blank" rel="noreferrer">
            <img
              className="carousel-img d-block w-100"
              srcSet={`${carousel3Small} 1000w, ${carousel3Big} 2000w`}
              src={carousel3Small}
              alt="Strawberries offered by hand"
            />

            <Carousel.Caption className={styles.caption}>
              <h3>Health guidelines</h3>
              <p>
                Find out what you get from what you eat. Visit the USDA website
              </p>
            </Carousel.Caption>
          </a>
        </Carousel.Item>
      </Carousel>
    </section>
  );
}

export default CarouselComponent;
