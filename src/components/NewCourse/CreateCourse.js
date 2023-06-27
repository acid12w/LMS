import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useInput from "../../hooks/use-input";

import { CourseForm } from "./CourseForm";
import Alert from "../UI/Alert";

import { uiActions } from "../../store/ui-slice";


export const CreatCourse = () => {

  const alert = useSelector((state) => state.ui.Alert);

  const [showAlert, setShowAlert] = useState(false);

  const [step, setStepState] = useState(1);


  const displayForm = () => {
    switch (step) {
      case 1:
        return (
          <CourseForm
            onNextStep={nextStep}
            formData={formData}
            courseError={inputHasError}
            onBlurHandler={BlurHandlers}
            onHandleChange={ChangeHandlers}
            onHandleChangeData={handleData}
            handlefileData={handlefileData("thumbNail")}
          />
        );
      case 2:
        return (
          <div className="text-center ">
            <h3>Success!</h3>
            <h4>your course has been created</h4>
          </div>
        );
      default:
        <h3>error</h3>;
    }
  };

  return (
    <>
      {showAlert && (
        <Alert
          status={alert.status}
          title={alert.title}
          message={alert.message}
        />
      )}
      <div className="p-6 bg-white rounded drop-shadow-xl">
        {displayForm()}
      </div>
    </>
  );
};
