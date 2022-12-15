import React from "react";
import { useState } from "react";
import styles from "./Register.module.css";
import axios from "axios";
import joi from "joi";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function Register() {
  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
  });

  let [errorMsg, setErrorMsg] = useState("");
  let [errorList, setErrorList] = useState([]);
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function goToLogin() {
    let path = "/login";
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
      let { data } = await axios.post(
        "https://route-movies-api.vercel.app/signup",
        user
      );

      if (data.message === "success") {
        setErrorMsg("");
        goToLogin();
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
    // console.log(myUser);
  }

  function validateForm() {
    const schema = joi.object({
      first_name: joi.string().alphanum().required().min(3).max(10),
      last_name: joi.string().alphanum().required().min(3).max(10),
      age: joi.number().required().min(18).max(80),
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
      <h1 className="my-3">Registeration</h1>
      {errorMsg ? <div className="alert alert-danger p-2">{errorMsg}</div> : ""}
      {errorList.map((error, index) => (
        <div key={index} className="alert alert-danger p-2">
          {error.message}
        </div>
      ))}
      <form onSubmit={submitDataForm}>
        <div className="input-dg  my-3">
          <label htmlFor="first_name">First Name:</label>
          <input
            onChange={getFormValue}
            type="text"
            className="form-control"
            name="first_name"
          />
        </div>
        <div className="input-dg  my-3">
          <label htmlFor="last_name">Last Name:</label>
          <input
            onChange={getFormValue}
            type="text"
            className="form-control"
            name="last_name"
          />
        </div>
        <div className="input-dg  my-3">
          <label htmlFor="age">Age:</label>
          <input
            onChange={getFormValue}
            type="number"
            className="form-control"
            name="age"
          />
        </div>
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
              <FaSpinner />
            </div>
          ) : (
            "Register "
          )}
        </button>
      </form>
    </div>
  );
}
