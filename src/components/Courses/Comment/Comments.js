import { CommentForm } from "./CommentForm";
import { Comment } from "./Comment";

import { useGetAllCommentsQuery } from "../../../store/commentApiSlice";

import { MutatingDots } from 'react-loader-spinner';

export const Comments = ({ lessonId }) => {

  const {data} = useGetAllCommentsQuery( lessonId );   

  let content;

  if (!data) {
    content = <MutatingDots
              visible={true}
              height="100"
              width="100"
              color="#4fa94d"
              secondaryColor="#4fa94d"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              />
  }else{
    content = <div className="pl-10 w-11/12">
                <h4 className="mb-4">Join the discussion</h4>  
                <CommentForm
                  type={"comment"}
                  lessonId={lessonId}
                  placeholder={"Leave a comment..."}
                />
                <Comment comments={data} />
              </div>
  }

  return content;
};
