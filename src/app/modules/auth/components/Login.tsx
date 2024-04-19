import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { getUserByToken, login } from "../core/_requests";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useAuth } from "../core/Auth";
import useAuthStore from "../../../store";
import axios from "axios";
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
});
const initialValues = {
  email: "adminthekeyjobs@gmail.com",
  password: "Jaisiyaram@1122",
};

import IMG from "../../../../media/logos/Nice Job Logo.png";
/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/
export function Login() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthToken, setUserDetails } = useAuthStore((state: any) => state);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const Response = await login(values.email, values.password);
        console.log("Response", Response);
        setAuthToken(Response?.data?.data?.accessToken);
        setUserDetails(Response?.data?.data);
        setErrorMessage(Response?.data?.message);
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.data?.message || "An unknown error occurred";
          // toast.error(message);
          setStatus(message);
        }
        // setStatus("The login details are incorrect");
        // setSubmitting(false)
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <div className="">
      <form
        className="p-10 bg-white rounded-lg shadow-lg form w-100"
        onSubmit={formik.handleSubmit}
        noValidate
        id="kt_login_signin_form"
      >
        <div className="my-14 whitespace-nowrap separator separator-content">
          <span className="flex justify-center text-gray-600 align-middle fw-bolder fs-1 d-flex">
            Welcome Admin
          </span>
        </div>
        {/* end::Separator */}
        {formik.status ? (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        ) : (
          <div className="p-8 mb-10 rounded bg-light-info">
            {/* <div className='text-info'>
            Use account <strong>admin@demo.com</strong> and password <strong>demo</strong> to
            continue.
          </div> */}
          </div>
        )}
        {/* begin::Form group */}
        <div className="mb-8 fv-row">
          <label className="text-gray-900 form-label fs-6 fw-bolder">
            Email
          </label>
          <input
            placeholder="Email"
            {...formik.getFieldProps("email")}
            className={clsx(
              "form-control bg-transparent",
              { "is-invalid": formik.touched.email && formik.errors.email },
              {
                "is-valid": formik.touched.email && !formik.errors.email,
              }
            )}
            type="email"
            name="email"
            autoComplete="off"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="fv-plugins-message-container">
              <span role="alert">{formik.errors.email}</span>
            </div>
          )}
        </div>
        {/* end::Form group */}
        {/* begin::Form group */}
        <div className="relative mb-3 fv-row">
          <label className="mb-0 text-gray-900 form-label fw-bolder fs-6">
            Password
          </label>
          <input
            // type={showPassword ? "text" : "password"}
            type="password"
            autoComplete="off"
            {...formik.getFieldProps("password")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid": formik.touched.password && formik.errors.password,
              },
              {
                "is-valid": formik.touched.password && !formik.errors.password,
              }
            )}
          />
          {/* Toggle Password Visibility Button */}
          {/* <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="flex absolute inset-y-0 right-0 items-center px-3 text-gray-600"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                width="20"
                height="20"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                width="20"
                height="20"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button> */}
          {/* End Toggle Password Visibility Button */}
          {formik.touched.password && formik.errors.password && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.password}</span>
              </div>
            </div>
          )}
        </div>

        {/* end::Form group */}
        {/* begin::Wrapper */}
        <div className="flex-wrap gap-3 mb-8 d-flex flex-stack fs-base fw-semibold">
          <div />
          {/* begin::Link */}
          <Link to="/auth/update-password" className="link-primary">
            Change Password
          </Link>
          {/* end::Link */}
        </div>
        {/* end::Wrapper */}
        {/* begin::Action */}
        <div className="mb-10 d-grid">
          <button
            type="submit"
            id="kt_sign_in_submit"
            className="btn btn-primary"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className="indicator-label">Continue</span>}
            {loading && (
              <span className="indicator-progress" style={{ display: "block" }}>
                Please wait...
                <span className="align-middle spinner-border spinner-border-sm ms-2"></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Action */}
        <div className="text-center text-gray-500 fw-semibold fs-6">
          © The Key Jobs{" "}
          <Link to="#" className="link-primary">
            2024
          </Link>
        </div>
      </form>
    </div>
  );
}
