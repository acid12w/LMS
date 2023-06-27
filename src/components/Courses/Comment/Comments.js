import { CommentForm } from "./CommentForm";
import { Comment } from "./Comment";

import { useGetAllCommentsQuery } from "../../../store/commentApiSlice";

export const Comments = ({ lessonId }) => {

  const {data} = useGetAllCommentsQuery( lessonId ); 

  const addToComment = (commentData) => {
    // dispatch(courseActions.addComment(commentData));
  };

  if (!data) {
    return <p>...</p>
  } 


  return (
    <div className="pl-10 w-11/12">
      <h4 className="mb-4">Join the discussion</h4>

      <CommentForm
        type={"comment"}
        lessonId={lessonId}
        placeholder={"Leave a comment..."}
        addAction={addToComment}
      />
      <Comment comments={data} />
    </div>
  );
};
