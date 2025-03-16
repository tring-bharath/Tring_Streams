import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toaster, toast } from "sonner";
import * as yup from "yup";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function Signup() {
  const url = import.meta.env.VITE_API_URL;
    const [toggleEye,setToggleEye]=useState(false);
    const [passwordType,setPasswordType]=useState("password");
  const schema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    terms: yup.bool().oneOf([true], "You must accept the terms and conditions"),
  });

  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try{
      const user=await axios.post(`${url}/user/registerUser`,data);
      console.log(user);
      nav('/Registration')
    }
    catch (error) 
    {
      console.log(error);
      
      toast.error("Email already Exists")
    }
  };

  const setEye=()=>
    {
      setToggleEye(!toggleEye);
      setPasswordType(passwordType=="password"?"text":"password");
    }

  
  return (
    <>
      <Toaster />
      <form
        className="form-container d-flex flex-column container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-center">Sign-Up</h3>
        <label className="mt-2">First Name*</label>
        <input
          {...register("first_name")}
          className="form-control"
          placeholder="First Name"
        />
        <p className="text-danger">{errors.first_name?.message}</p>
        <label className="mt-2">Last Name:</label>
        <input
          {...register("last_name")}
          className="form-control"
          placeholder="Last Name"
        />
        <p className="text-danger">{errors.last_name?.message}</p>
        <label className="mt-2">Email*</label>
        <input
          {...register("email")}
          className="form-control"
          placeholder="Email"
        />
        <p className="text-danger">{errors.email?.message}</p>
        <div className="password d-flex align-items-center">
          <input
            className="form-control border-success"
            type={passwordType}
            {...register("password")}
          />
          <span className="eyeButton" onClick={() => setEye()}>
            {toggleEye ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <p className="text-danger">{errors.password?.message}</p>
        <div className="mt-2 d-flex align-items-center">
          <input
            id="terms"
            type="checkbox"
            {...register("terms")}
            className="me-2"
          />
          <label htmlFor="terms" className="d-flex align-self-center">
            I agree to the &nbsp;
            <a href="https://tringapps.com/">terms and conditions</a>
          </label>
        </div>
        <p className="text-danger">{errors.terms?.message}</p>

        <button
          type="submit"
          className="px-4 py-2 bg-primary mt-2 text-white rounded-1 align-self-center"
        >
          Register
        </button>
      </form>
    </>
  );
}
