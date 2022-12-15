import React from "react";
import { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import joi from "joi";

import { useNavigate } from "react-router-dom";

export default function Login({ setUserData }) {
  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  let [errorMsg, setErrorMsg] = useState("");
  let [errorList, setErrorList] = useState([]);
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function goToHome() {
    let path = "/home";
    navigate(path);
  }
  async function submitDataForm(e) {
    e.preventDefault();
    setLoading(true);
    let validationResult = validateForm();
    if (validationResult.error) {
      setLoading(false);
      setErrorList(validationResult.error.details);
    } else {
      setErrorList([]);
      let { data } = await axios.post(
        "https://route-movies-api.vercel.app/signin",
        user
      );

      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        setErrorMsg("");
        setUserData();
        goToHome();
      } else {
        setErrorMsg(data.message);
      }
      setLoading(false);
    }
  }
  function getFormValue(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  function validateForm() {
    const schema = joi.object({
      email: joi
        .string()
        .email({ tlds: { allow: ["com", "net"] } })
        .required(),
      password: joi
        .string()
        .pattern(
          new RegExp(
            "(?=^.{6,}$)((?=.*d)(?=.*[a-z])|(?=.*d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*d)(?=.*[^A-Za-z0-9]))^.*"
          )
        )
        .required()
        .messages({
          "string.pattern.base": `"password" should be included minimum 5 characters and one number `,
          "string.empty": `"password" cannot be an empty field`,
          "string.min": `"password" should have a minimum length of {#limit}`,
          "any.required": `"password" is a required field`,
        }),
    });

    return schema.validate(user, { abortEarly: false });
  }

  return (
    <div className="my-5 w-75 m-auto">
      <h1 className="my-3">Login</h1>
      {errorMsg ? <div className="alert alert-danger p-2">{errorMsg}</div> : ""}
      {errorList.map((error, index) => (
        <div key={index} className="alert alert-danger p-2">
          {error.message}
        </div>
      ))}
      <form onSubmit={submitDataForm}>
        <div className="input-dg  my-3">
          <label htmlFor="email">Email:</label>
          <input
            onChange={getFormValue}
            type="email"
            className="form-control"
            name="email"
          />
        </div>
        <div className="input-dg  my-3">
          <label htmlFor="password">Password:</label>
          <input
            onChange={getFormValue}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <button type="submit" className={`btn ${styles.btnBg} my-3 `}>
          {loading ? (
            <div>
              {/* <FaSpinner /> */}
              <i class="fa-solid fa-spinner fa-spin"></i>
            </div>
          ) : (
            "Login "
          )}
        </button>
      </form>
    </div>
  );
}
