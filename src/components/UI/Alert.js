import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../../store/ui-slice";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
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
    alertClass = "bg-green-100 text-green-600";
    message = props.message
  }

  return (
    <section className="flex justify-center z-10">
      {showAlert && (
        <div
          className={`flex fixed rounded-md m-auto items-center w-auto p-4 text-left z-10 border-2 border-green-500 rounded-2xl ${
            props.status === "pending"
              ? "bg-blue-300 text-blue-600"
              : alertClass
          }`}
        >
          <IoIosCheckmarkCircleOutline className="mr-2 text-2xl" />
          <h4 className="mr-2">{props.title}</h4>
          <p>{message}</p>
        </div>
      )}
    </section>
  );
};

export default Alert;
