import { Link } from "react-router-dom";
import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={classes.hero}>
      <div className="text-left">
        <h3 className=" text-5xl text-emerald-900 font-bold mb-3">
          Re-think how <br></br>you learn
        </h3>
        <h2 className="text-emerald-900 mb-1">
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


