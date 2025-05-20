import React, { use, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AuthContext } from "../providers/AuthContext";

const SignIn = () => {
  const { signin, googleSignIn } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef("");

  useEffect(() => {
    document.title = "Recipe Book App | SignIn";
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signin(email, password)
      .then((res) => {
        const data = res.user.email;
        toast.success(`Successfully signed in as ${data}`);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        const data = res.user.email;
        toast.success(`Successfully signin to ${data}`);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current?.value || "";

    navigate("/forgetPassword", { state: { email } });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div
          className="card bg-base-100 md:w-3/9 w-3/4 shrink-0 shadow-2xl"
          style={{ boxShadow: "0 0 50px rgba(138, 43, 226, 0.7)" }}
        >
          <p className="font-semibold text-2xl  md:text-3xl text-center py-8">
            <span className="text-primary">SignIn</span> to your account
          </p>
          <form onSubmit={handleSignIn} className="card-body">
            <fieldset className="fieldset">
              <label className="label text-accent">Email</label>
              <input
                name="email"
                type="email"
                className="input focus:outline-none w-full focus:border-primary md:mb-2"
                placeholder="Email"
                required
                ref={emailRef}
              />
              <label className="label text-accent">Password</label>
              <input
                name="password"
                type="password"
                className="input focus:outline-none w-full focus:border-primary mb-1 md:mb-2"
                placeholder="Password"
                required
              />
              <div>
                <p onClick={handleForgetPassword} className="link link-hover">
                  Forgot password?
                </p>
              </div>
              <button className="relative py-2 overflow-hidden font-medium text-primary  border border-primary rounded-l-full rounded-r-full shadow-inner group md:text-lg cursor-pointer">
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-secondary group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-secondary group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-100 bg-secondary group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-100 bg-secondary  group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-primary opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                  SignIn
                </span>
              </button>
              <fieldset className="fieldset border-primary rounded-box border p-4">
                <legend className="fieldset-legend text-sm text-accent">
                  Other SignIn options
                </legend>
                <p
                  onClick={handleGoogleSignIn}
                  className="btn btn-primary btn-outline w-full"
                >
                  <FcGoogle size={24} /> Login with Google
                </p>
                <p className="btn btn-outline btn-primary w-full">
                  <FaGithub size={24} className="text-black" /> Login with
                  Github
                </p>
              </fieldset>
              <p className="font-semibold text-center pt-4">
                Don't have an account?<span> </span>
                <Link className="text-primary" to={"/signUp"}>
                  SignUp
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
