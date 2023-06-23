import avatar from "../../../assets/avatar.png";

export const Reply = (props) => {
  let bgStyle = {
    backgroundImage: `url(${avatar})`,
  };

  return (
    <div className=" flex py-6">
      {/* <div
        className="h-16 w-16 bg-center bg-cover rounded-full mr-4 "
        style={bgStyle}
      ></div> */}
      <div className="h-16 w-16 bg-center bg-red-400 rounded-full mr-4 p-4">
          <h1 className="text-white text-base font-bold text-center ">
          {`${props.username[0].toUpperCase()}  ${props.username[1].toUpperCase()}`}
          </h1>
      </div>
      <div className="flex-1">
        <h3 className="mb-4 font-bold">{props.username}</h3>
        <p className="text-sm mb-4">{props.text}</p>
        <h5
          onClick={() => {
            props.handleToggleReply(props.num);
          }}
          className="text-sm text-blue-600 cursor-pointer"
        >
          Reply
        </h5>
      </div>
    </div>
  );
};
