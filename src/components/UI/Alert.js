import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../../store/ui-slice";

import { BsFillCheckCircleFill } from "react-icons/bs";
import { useEffect } from "react";

const Alert = (props) => {
  const showAlert = useSelector((state) => state.ui.showAlert);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(uiActions.toggleShowAlert());
    }, 5000);
    return () => clearTimeout(timer);
  }, [dispatch, showAlert]);

  let alertClass;

  if (props.status === "error") {
    alertClass = "bg-red-300 text-red-600";
  }

  if (props.status === "success") {
    alertClass = "bg-green-400 text-green-600";
  }

  return (
    <section className=" text-center font-semibold w-8/12 fixed left-80 z-10">
      {showAlert && (
        <div
          className={`flex items-center justify-center p-4 ${
            props.status === "pending"
              ? "bg-blue-300 text-blue-600"
              : alertClass
          }`}
        >
          <BsFillCheckCircleFill className="mr-2 text-xl" />
          <h4 className="mr-2">{props.title}</h4>
          <p>{props.message}</p>
        </div>
      )}
    </section>
  );
};

export default Alert;
