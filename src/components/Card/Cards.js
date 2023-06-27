import CardItem from "./CardItem";
import classes from "./Card.module.css";

const Cards = ({ currentCourses }) => {
  return (
    <div className={classes.CardHolder}>
      {currentCourses.map(({ _id: id, ...otherProps }, index) => {
        return <CardItem key={index} courseId={id} {...otherProps} />;
      })}
    </div>
  );
};

export default Cards;
