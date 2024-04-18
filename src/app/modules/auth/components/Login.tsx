import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { getUserByToken, login } from "../core/_requests";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useAuth } from "../core/Auth";
import useAuthStore from "../../../store";
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
/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/
export function Login() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>("");
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
        // saveAuth(undefined)
        setStatus("The login details are incorrect");
        // setSubmitting(false)
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <form
      className="form w-100"
      onSubmit={formik.handleSubmit}
      noValidate
      id="kt_login_signin_form"
    >
      <div className="my-14 whitespace-nowrap separator separator-content">
        <span className="text-gray-600 fw-bolder fs-1">Job Portal</span>
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
        <label className="text-gray-900 form-label fs-6 fw-bolder">Email</label>
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
      <div className="mb-3 fv-row">
        <label className="mb-0 text-gray-900 form-label fw-bolder fs-6">
          Password
        </label>
        <input
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
        <Link to='/auth/forgot-password' className='link-primary'>
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
        © Job Portal{" "}
        <Link to="/auth/registration" className="link-primary">
          2024
        </Link>
      </div>
    </form>
  );
}
