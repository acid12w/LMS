import { Link } from "react-router-dom";
import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={classes.hero}>
      <div className="absolute opacity-60 top-0  right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-green-500"></div>
      <div className={classes.center}>
        <h3 className=" text-3xl text-white font-bold ">
          Re-think how you learn
        </h3>
        <h2 className="white mb-1">
          SG-LMS is the best online resource for Learning how to<br></br> use
          Creative Skills{" "}
        </h2>
        <Link to="/user/?query=signup">
          <button className={classes.buttonWhite}> sign up</button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
