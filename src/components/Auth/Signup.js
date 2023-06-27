export const Signup = (props) => {
  const handleData = (e) => {
    props.onHandleData(e);
  };

  return (
    <>
      {!props.isLogin && (
        <input
          type="text"
          id="username"
          required
          // value={}
          // onBlur={}
          onChange={handleData}
          placeholder="username"
          className="bg-gray-100 h-full w-full border-none outline-none p-4 mb-1 focus:text-black focus:invalid: bg-blue-100"
        />
      )}

      <input
        type="email"
        id="email"
        required
        // value={}
        // onBlur={}
        onChange={handleData}
        placeholder="email"
        className="bg-gray-100 h-full w-full border-none outline-none p-4 mb-1 focus:text-black focus:invalid: bg-blue-100"
      />
      <input
        type="text"
        id="password"
        required
        // value={}
        // onBlur={}
        onChange={handleData}
        placeholder="password"
        className="bg-gray-100 h-full w-full border-none outline-none p-4 mb-1 focus:text-black focus:invalid: bg-blue-100"
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
          className="bg-gray-100 h-full w-full border-none outline-none p-4 mb-1 focus:text-black focus:invalid: bg-blue-100"
        />
      )}
    </>
  );
};
