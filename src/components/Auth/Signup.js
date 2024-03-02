export const Signup = (props) => {
  const handleData = (e) => {
    props.onHandleData(e);
  };

  return (
    <>
      {!props.isLogin && (
        <input
          type="text"
          id="usernameinput"
          required
          // value={}
          // onBlur={}
          onChange={handleData}
          placeholder="username"
          className="bg-gray-100 h-full w-full p-4 mb-8 border-gray-400 border-2"
        />
      )}

      <input
        type="userEmail"
        id="userEmail"
        required
        // value={}
        // onBlur={}
        onChange={handleData}
        placeholder="email"
        className="bg-gray-100 h-14 w-full p-4 mb-8 border-gray-400 border-2 focus:border-green-400 "
      />
      <input
        type="text"
        id="password"
        required
        // value={}
        // onBlur={}
        onChange={handleData}
        placeholder="password"
        className="bg-gray-100 h-14 w-full border-gray-400 border-2 p-4 mb-8 focus:border-green-600  "
      />
      {!props.isLogin && (
        <input
          type="text"
          id="password2"
          required
          // value={}
          // onBlur={}
          onChange={handleData}
          placeholder="confirm password"
          className="bg-gray-100 h-14 w-full border-gray-400 border-2 p-4 mb-8 focus:text-black "
        />
      )}
    </>
  );
};
