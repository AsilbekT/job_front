import Link from "next/link";
import React, { useState } from "react";
import fetchFromApi from '../../../../pages/api/api';
import cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

const FormContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const router = useRouter();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetchFromApi("api/accounts/login/", "POST", {
        email,
        password,
      });

      const { status, code, message, data } = response;

      if (status === "success" && code === 200) {
        const { token } = data;

        setUser({
          token,
        });
        cookie.set("token", token);
        // router.push("/candidates-dashboard/dashboard");
        window.location.href = "/candidates-dashboard/dashboard";
      } else {
        console.log("Error:", message);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <div className="form-inner">
      <h3>Login to Superio</h3>

      {/* <!--Login Form--> */}
      <form onSubmit={handleFormSubmit}>

        <div className="form-group">
          <label>email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* name */}

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* password */}

        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input type="checkbox" name="remember-me" id="remember" />
              <label htmlFor="remember" className="remember">
                <span className="custom-checkbox"></span> Remember me
              </label>
            </div>
            <a href="#" className="pwd">
              Forgot password?
            </a>
          </div>
        </div>
        {/* forgot password */}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            name="log-in"
          >
            Log In
          </button>
        </div>
        {/* login */}
      </form>
      {/* End form */}

      <div className="bottom-box">
        <div className="text">
          Don&apos;t have an account?{" "}
          <Link
            href="#"
            className="call-modal signup"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
          >
            Signup
          </Link>
        </div>



      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default FormContent;
