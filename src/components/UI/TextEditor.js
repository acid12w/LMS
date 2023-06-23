import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { useState } from "react";

const TextEditor = (props) => {
  const [isTouched, setIsTouched] = useState(false);
  const [textValid, setTextValid] = useState(false);

  const handleValidText = (data) => {
    setTextValid(data.length > 0);
  };

  const handleIsTouched = () => {
    setIsTouched(!isTouched);
  };

  const isValid = !textValid && isTouched;

  return (
    <div className="">
      <CKEditor
        editor={ClassicEditor}
        data="Add course overview here"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          // console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          props.handleChange(data);
          handleValidText(data);
          // console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          const data = editor.getData();
          handleValidText(data);
          handleIsTouched();
        }}
        onFocus={(event, editor) => {}}
      />
      {isValid && (
        <p className=" text-red-400 mt-2 ml-1">field must not be empty</p>
      )}
    </div>
  );
};

export default TextEditor;
