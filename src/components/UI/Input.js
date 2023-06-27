import { useState } from "react";

import useInput from "../../hooks/use-input";

export const Input = (props) => {
  // const [isTouched, setIsTouched] = useState(false);
  // const [inputValid, setInputValid] = useState(false);

  // const handleValidText = (e) => {
  //   setInputValid(e.target.value.trim() !== "");
  // };

  // const handleIsTouched = () => {
  //   setIsTouched(!isTouched);
  // };

  // const isValid = !inputValid && isTouched;

  const formClassName =
    "bg-gray-100 h-full w-full border-none outline-none p-4";
  // const formValid = "bg-green-100 text-green-600";

  return (
    <>
      <input
        onBlur={props.onBlur}
        onChange={props.onChange}
        className={`${formClassName} ${props.hasError ? "bg-red-100" : ""}`}
        {...props.input}
      />
    </>
  );
};
