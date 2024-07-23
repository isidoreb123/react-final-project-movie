import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [rememberLogin, setRememberLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hideen sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/655a9668-b002-4262-8afb-cf71e45d1956/450513ca-09ad-4b23-9971-909ac2dcc401/GE-en-20240715-POP_SIGNUP_TWO_WEEKS-perspective_WEB_f25b617e-9f42-43f7-9db1-1ddb239856d0_medium.jpg"
          alt="///"
        />

        <div className="bg-black/70 fixed top-0 left-0 w-full h-screen" />

        <div className="fixed w-full px-4 py-24 z-20">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Login</h1>

              <form
                onSubmit={handleFormSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  className="p-3 my- 2 bg-gray-700 rounded"
                  type="email"
                  placeholder="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </form>

              <button
                onClick={handleFormSubmit}
                className="bg-red-600 py-3 my-6 rounded font-bold px-8"
              >
                Login
              </button>

              <div className="flex justify-between items-center text-gray-600">
                <p>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={rememberLogin}
                    onChange={() => setRememberLogin(!rememberLogin)}
                  />
                  Rememeber me
                </p>
                <p>Need Help?</p>
              </div>
              <p className="my-4">
                <span>New to MovieMarathon</span>
                <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
