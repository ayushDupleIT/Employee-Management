import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { requestPassword } from "../core/_requests";
import API from "../../../ApiRoutes";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const initialValues = {
  email: "",
  current: "",
  new: "",
  confirm: "",
};

const passwordSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  current: Yup.string().required("Current Password is required"),
  new: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain at least one alphabet character, one digit, and one symbol"
    ),
  confirm: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("new")], "Passwords must match"),
});

interface FormValues {
  email: string;
  current: string;
  new: string;
  confirm: string;
}

export function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema: passwordSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setHasErrors(undefined);

      const payload = {
        email: values.email,
        oldPassword: values.current,
        newPassword: values.new,
      };

      try {
        await axios.post(`${API.LOGIN}/change-password`, payload);
        toast.success("Password Updated successfully");
        navigate("/auth");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data.message || "An unknown error occurred";
          toast.error(message);
        } else {
          toast.error("An error occurred");
        }
        setHasErrors(true);
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value); // Use formik's setFieldValue to set values
  };

  return (
   <div className="">
     <form
      className="p-10 bg-white rounded-lg shadow-lg form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      noValidate
      id="kt_login_password_reset_form"
      onSubmit={formik.handleSubmit}
    >
      <div className="mb-10 text-center">
      <span className="flex justify-center text-gray-600 align-middle fw-bolder fs-1 d-flex">Change Password</span>
      </div>

      {/* begin::Form group */}

      <div className="mb-8 fv-row">
        <label className="text-gray-900 form-label fw-bolder fs-6">Email</label>
        <input
          type="email"
          placeholder=""
          autoComplete="off"
          name="email"
          onChange={handleChange}
          value={formik.values.email} // Set value from formik values
          className={clsx("bg-transparent form-control", {
            "is-invalid": formik.touched.email && formik.errors.email,
          })}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mb-8 fv-row">
        <label className="text-gray-900 form-label fw-bolder fs-6">
          Current Password
        </label>
        <input
          type="password"
          placeholder=""
          autoComplete="off"
          name="current"
          onChange={handleChange}
          value={formik.values.current} // Set value from formik values
          className={clsx("bg-transparent form-control", {
            "is-invalid": formik.touched.current && formik.errors.current,
          })}
        />
        {formik.touched.current && formik.errors.current && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.current}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mb-8 fv-row">
        <label className="text-gray-900 form-label fw-bolder fs-6">
          New Password
        </label>
        <input
          type="password"
          placeholder=""
          autoComplete="off"
          name="new"
          onChange={handleChange}
          value={formik.values.new} // Set value from formik values
          className={clsx("bg-transparent form-control", {
            "is-invalid": formik.touched.new && formik.errors.new,
          })}
        />
        {formik.touched.new && formik.errors.new && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.new}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mb-8 fv-row">
        <label className="text-gray-900 form-label fw-bolder fs-6">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder=""
          autoComplete="off"
          name="confirm"
          onChange={handleChange}
          value={formik.values.confirm} // Set value from formik values
          className={clsx("bg-transparent form-control", {
            "is-invalid": formik.touched.confirm && formik.errors.confirm,
          })}
        />
        {formik.touched.confirm && formik.errors.confirm && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.confirm}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="flex-wrap d-flex justify-content-center pb-lg-0">
        <button
          type="submit"
          id="kt_password_reset_submit"
          className="btn btn-primary me-4"
          // disabled={formik.isSubmitting || !formik.isValid}
        >
          <span className="indicator-label">Submit</span>
          {loading && (
            <span className="indicator-progress">
              Please wait...
              <span className="align-middle spinner-border spinner-border-sm ms-2"></span>
            </span>
          )}
        </button>
        <Link to="/auth/login">
          <button
            type="button"
            id="kt_login_password_reset_form_cancel_button"
            className="btn btn-light"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Cancel
          </button>
        </Link>{" "}
      </div>
      {/* end::Form group */}
    </form>
   </div>
  );
}
