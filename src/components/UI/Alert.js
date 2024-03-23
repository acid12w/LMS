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
  let message

  if (props.status === "error") {
    alertClass = "bg-red-200 text-red-600";
    message = props.message
  }

  if (props.status === "success") {
    alertClass = "bg-green-200 text-green-600";
    message = props.message
  }

  return (
    <section className="flex justify-center z-10">
      {showAlert && (
        <div
          className={`flex fixed rounded-md m-auto items-center w-auto rounded-md p-4 text-left font-semibold  z-10 ${
            props.status === "pending"
              ? "bg-blue-300 text-blue-600"
              : alertClass
          }`}
        >
          <BsFillCheckCircleFill className="mr-2 text-xl" />
          <h4 className="mr-2">{props.title}</h4>
          <p>{message}</p>
        </div>
      )}
    </section>
  );
};

export default Alert;
