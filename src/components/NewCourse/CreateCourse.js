import { useSelector } from "react-redux";
import { CourseForm } from "./CourseForm";

export const CreatCourse = () => {

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
      <div className="p-6 bg-white rounded drop-shadow-xl">
        {displayForm()}
      </div>
    </>
  );
};
