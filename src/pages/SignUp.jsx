import React, { use, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const SignUp = () => {
  const location = useLocation();
  const { createUsers, googleSignIn, setUser, update } = use(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Recipe Book App | signUp";
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const name = formData.get("name");
    const photo = formData.get("photo");

    const { email, password, ...rest } = Object.fromEntries(formData.entries());
    const userProfile = {
      email,
      ...rest,
    };

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUpperCase && !hasLowerCase && !isLongEnough) {
      setErrorMessage(
        "Password must include uppercase, lowercase letters, and be at least 6 characters long."
      );
      toast.error(
        "Password must include uppercase, lowercase letters, and be at least 6 characters long."
      );
      return;
    } else if (!hasUpperCase && !hasLowerCase) {
      setErrorMessage(
        "Password must include both uppercase and lowercase letters."
      );
      toast.error(
        "Password must include both uppercase and lowercase letters."
      );
      return;
    } else if (!hasUpperCase && !isLongEnough) {
      setErrorMessage(
        "Password must include an uppercase letter and be at least 6 characters long."
      );
      toast.error(
        "Password must include an uppercase letter and be at least 6 characters long."
      );
      return;
    } else if (!hasLowerCase && !isLongEnough) {
      setErrorMessage(
        "Password must include a lowercase letter and be at least 6 characters long."
      );
      toast.error(
        "Password must include a lowercase letter and be at least 6 characters long."
      );
      return;
    } else if (!hasUpperCase) {
      setErrorMessage("Password must include at least one uppercase letter.");
      toast.error("Password must include at least one uppercase letter.");
      return;
    } else if (!hasLowerCase) {
      setErrorMessage("Password must include at least one lowercase letter.");
      toast.error("Password must include at least one lowercase letter.");
      return;
    } else if (!isLongEnough) {
      setErrorMessage("Password must be at least 6 characters long.");
      toast.error("Password must be at least 6 characters long.");
      return;
    } else {
      setErrorMessage("");
    }

    createUsers(email, password)
      .then((res) => {
        update({ displayName: name, photoURL: photo })
          .then(() => {
            toast.success("Successfully created account");
            setUser({ ...res.user, displayName: name, photoURL: photo });
            navigate(`${location.state ? location.state : "/"}`);
            fetch("http://localhost:3000/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(userProfile),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User Added Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn2 = () => {
    googleSignIn()
      .then((res) => {
        const data = res.user.email;
        toast.success(`Successfully signin to ${data}`);
        setUser({ ...res.user });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        // toast.error(error.message);
        console.log(error.message);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className="card bg-base-100 md:w-3/9 w-3/4 shrink-0 shadow-2xl"
        style={{ boxShadow: "0 0 50px rgba(138, 43, 226, 0.7)" }}
      >
        <p className="font-semibold text-2xl  md:text-3xl text-center py-8">
          <span className="text-primary">SignUp</span> your account
        </p>
        <form onSubmit={handleSignUp} className="card-body">
          <fieldset className="fieldset">
            <label className="label text-accent">Name</label>
            <input
              name="name"
              type="text"
              className="input focus:outline-none w-full focus:border-primary md:mb-2"
              placeholder="Name"
              required
            />
            <label className="label text-accent">Email</label>
            <input
              name="email"
              type="email"
              className="input focus:outline-none w-full focus:border-primary md:mb-2"
              placeholder="Email"
              required
            />
            <label className="label text-accent">Photo UR</label>
            <input
              name="photo"
              type="text"
              className="input focus:outline-none w-full focus:border-primary md:mb-2"
              placeholder="Photo URL"
              required
            />
            <label className="label text-accent">Password</label>
            <input
              name="password"
              type="password"
              className="input focus:outline-none w-full focus:border-primary mb-1 md:mb-2"
              placeholder="Password"
              required
            />
            {<p className="text-red-600 font-medium">{errorMessage}</p>}
            <button className="relative py-2 overflow-hidden font-medium text-primary  border border-primary rounded-l-full rounded-r-full shadow-inner group md:text-lg cursor-pointer">
              <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-secondary group-hover:w-full ease"></span>
              <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-secondary group-hover:w-full ease"></span>
              <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-100 bg-secondary group-hover:h-full ease"></span>
              <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-100 bg-secondary  group-hover:h-full ease"></span>
              <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-primary opacity-0 group-hover:opacity-100"></span>
              <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                SignUp
              </span>
            </button>
            <fieldset className="fieldset border-primary rounded-box border p-4">
              <legend className="fieldset-legend text-sm text-accent">
                Other SignIn options
              </legend>
              <p
                onClick={handleGoogleSignIn2}
                className="btn btn-primary btn-outline w-full"
              >
                <FcGoogle size={24} /> Login with Google
              </p>
            </fieldset>
            <p className="font-semibold text-center pt-4">
              Already have an account?<span> </span>
              <Link className="text-primary" to={"/signIn"}>
                SignIn
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
