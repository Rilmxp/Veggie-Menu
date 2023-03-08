import dataTest from "../../dataTest";
import SectionHeading from "../../components/SectionHeading";
import parse from "html-react-parser";
import RecipeImage from "../../components/RecipeImage";
import styles from "./SingleRecipe.module.scss";
import { useState } from "react";

const SingleRecipe = () => {
  console.log(dataTest);
  const {
    title,
    image,
    summary,
    vegan: { veganstat: vegan },
    dairyFree: { dairyFreestat: dairyFree },
    glutenFree: { glutenFreestat: glutenFree },
    veryHealthy: veryHealthy,
    cheap: cheap,
    sustainable: sustainable,
  } = dataTest;
  const [showMore, setShowMore] = useState(false);

  let recipeStats = [
    veganstat,
    dairyFreestat,
    glutenFreestat,
    veryHealthy,
    cheap,
    sustainable,
  ];
  console.log("recipeStats", recipeStats);
  const recipeStatsToDisplay = recipeStats.filter((item) => item);
  console.log("filter", recipeStatsToDisplay);

  return (
    <article className={styles.summaryLayout}>
      <SectionHeading title={title} />
      <div className={styles.imgLayout}>
        <RecipeImage image={image} title={title} />
      </div>
      <div>
        {showMore ? parse(summary) : parse(summary.substring(0, 400)) + "..."}{" "}
        <button
          className={styles.showMoreBtn}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      </div>
      <h2>Stats</h2>
    </article>
  );
};

export default SingleRecipe;
