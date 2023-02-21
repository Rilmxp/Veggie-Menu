import defaultImage from "../assets/images/default.jpg";

const DefaultRecipeImg = () => {
  return (
    <>
      <img
        className="recipeImg"
        src={defaultImage}
        alt="Fruits and vegetables"
      />
      <div className="imgNotAvailbleMsg">
        <p>Recipe image not available</p>
      </div>
    </>
  );
};

export default DefaultRecipeImg;
