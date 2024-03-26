export const LoginForm = () => {
    <div>
              <label className="h-12 mb-10 flex flex-col">
                <input
                  type="email"
                  id="userEmail"
                  required  
                  // value={}
                  // onBlur={}
                  onChange={emailChangeHandler}
                  placeholder="email"
                  className="h-14 w-full rounded-md border-gray-200 border-2 p-4 accent-emerald-950 focus:bg-green-50 focus:outline-green-600"
                />
              </label>

              <label className="h-12 mb-10 flex flex-col">
                <input
                  type="password"
                  id="password"
                  required
                  // value={}
                  onBlur={passwordBlurHandler}
                  onChange={passwordChangeHandler}
                  placeholder="password"
                  className="h-14 w-full rounded-md border-gray-200 border-2 p-4 focus:bg-green-50 focus:outline-green-600"
                />
                {passwordHasError && (
                      <p className="text-sm text-red-400 mt-1">
                        Please enter a valid password
                      </p>
                )}
              </label>
            </div>
}