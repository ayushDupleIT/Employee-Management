import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { requestPassword } from "../core/_requests";
import API from "../../../ApiRoutes";
import axios from "axios";

const initialValues = {
  current: "",
  new: "",
  confirm: "",
};

const passwordSchema = Yup.object().shape({
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
  current: string;
  new: string;
  confirm: string;
}

export function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);

  const formik = useFormik({
    initialValues,
    validationSchema: passwordSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setHasErrors(undefined);

      // Prepare payload
      const payload = {
        oldPassword: values.current,
        newPassword: values.new,
      };

      // Call API to change password
      try {
        const api = await axios.post(API.LOGIN, payload);
        console.log("api", api);
        // Call your requestPassword function passing payload
        // await requestPassword(payload);
        // Handle success
      } catch (error) {
        // Handle error
        setHasErrors(true);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value); // Use formik's setFieldValue to set values
  };

  return (
    <form
      className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      noValidate
      id="kt_login_password_reset_form"
      onSubmit={formik.handleSubmit}
    >
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-gray-900 fw-bolder">Change Password</h1>
      </div>

      {/* begin::Form group */}
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
  );
}
