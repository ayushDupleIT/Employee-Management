import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../ApiRoutes";
import { Editor } from "../component/Editor";
import toast from "react-hot-toast";
import { useTitle } from "../routing/TitleProvider";

const profileDetailsSchema = Yup.object().shape({
  email: Yup.string().required("email is required"),
  whatsapp: Yup.string().required("whatsapp is required"),
  phone: Yup.string().required("phone is required"),
  heading: Yup.string().required("Heading is required"),
  subheading: Yup.string().required("Subheading is required"),
});

const indianStates = [
  { name: "Andaman and Nicobar Islands" },
  { name: "Andhra Pradesh" },
  { name: "Arunachal Pradesh" },
  { name: "Assam" },
  { name: "Bihar" },
  { name: "Chandigarh" },
  { name: "Chhattisgarh" },
  { name: "Dadra and Nagar Haveli" },
  { name: "Daman and Diu" },
  { name: "Delhi" },
  { name: "Goa" },
  { name: "Gujarat" },
  { name: "Haryana" },
  { name: "Himachal Pradesh" },
  { name: "Jammu and Kashmir" },
  { name: "Jharkhand" },
  { name: "Karnataka" },
  { name: "Kerala" },
  { name: "Ladakh" },
  { name: "Lakshadweep" },
  { name: "Madhya Pradesh" },
  { name: "Maharashtra" },
  { name: "Manipur" },
  { name: "Meghalaya" },
  { name: "Mizoram" },
  { name: "Nagaland" },
  { name: "Odisha" },
  { name: "Puducherry" },
  { name: "Punjab" },
  { name: "Rajasthan" },
  { name: "Sikkim" },
  { name: "Tamil Nadu" },
  { name: "Telangana" },
  { name: "Tripura" },
  { name: "Uttar Pradesh" },
  { name: "Uttarakhand" },
  { name: "West Bengal" },
];

const Contact: React.FC = () => {
  const [data, setData] = useState<any>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    "661fc704c860db14ad4769ca"
  );
  const [loading, setLoading] = useState(false);
  const [jobLocations, setLocation] = useState<{ name: string }[]>([]);

  const { setTitle } = useTitle();
  const navigate = useNavigate();
  console.log("data ", data);

  const formik: any = useFormik({
    initialValues: data,
    validationSchema: profileDetailsSchema,
    onSubmit: async (values: any) => {
      try {
        setLoading(true);
        // Send PATCH request to update the data
        const response = await axios.patch(
          `${API.CONTACT}/${selectedItemId}`,
          values
        );
        console.log("Update response:", response.data);
        setLoading(false);
        toast.success("Contact Details Updated Successfully");
        // window.location.reload()
        navigate("/");
      } catch (error) {
        console.error("Error updating job:", error);
        setLoading(false);
      }
    },
  });

  interface ContactData {
    // Define the properties of the job data
    _id: any;
    email: string;
    whatsapp: string;
    phone: string;
    heading: string;
    subheading: string;
  }

  useEffect(() => {
    setTitle("Contact Page");
  }, []);

  const id = "661fc704c860db14ad4769ca";
  const fetchContact = async () => {
    try {
      const fetchData: any = await axios.get<ContactData>(
        `${API.CONTACT}/${id}`
      );
      console.log("fetchData", fetchData.data.data);
      const data: any = fetchData.data.data;
      setData(data);
      formik.setFieldValue("email", data.email);
      formik.setFieldValue("phone", data.phone);
      formik.setFieldValue("whatsapp", data.whatsapp);
      formik.setFieldValue("heading", data.heading);
      formik.setFieldValue("subheading", data.subheading);

      setSelectedItemId(id);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };
  console.log("formik errors", formik.errors);
  useEffect(() => {
    fetchContact();
  }, []);

  console.log(formik.errors);

  const handleChangeHeading = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue("heading", value);
  };
  const handleChangeSubHeading = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue("subheading", value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue("email", value);
  };

  const handleChangeClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue("whatsapp", value);
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue("phone", value);
  };
  // Handle changes in phone field

  console.log("formik.values", formik.values);

  return (
    <div className="mb-5 card mb-xl-10">
      <div className="border-0 cursor-pointer card-body">
        <div className="flex justify-between">
          <div className="my-1 d-flex align-items-center position-relative">
            <h2 className="fw-bold">Edit Contact Details</h2>
          </div>
        </div>
      </div>

      <div id="kt_account_profile_details" className="show">
        <form onSubmit={formik.handleSubmit} noValidate className="form">
          <div className="p-9 card-body border-top">
            <div className="mb-6 row">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Heading
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      className="mb-3 form-control form-control-lg form-control-solid mb-lg-0"
                      placeholder="recruit@thekeyjobs.com"
                      onChange={handleChangeHeading}
                      value={formik.values.heading || data?.heading}
                      name="heading"
                      // onChange={formik.handleChange}
                    />
                    {formik.touched.heading && formik.errors.heading && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.heading}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 row">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Sub-heading
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      className="mb-3 form-control form-control-lg form-control-solid mb-lg-0"
                      placeholder="recruit@thekeyjobs.com"
                      onChange={handleChangeSubHeading}
                      value={formik.values.subheading || data?.subheading}
                      name="subheading"
                      // onChange={formik.handleChange}
                    />
                    {formik.touched.subheading && formik.errors.subheading && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.subheading}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 row">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Email
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      className="mb-3 form-control form-control-lg form-control-solid mb-lg-0"
                      placeholder="recruit@thekeyjobs.com"
                      onChange={handleChange}
                      value={formik.values.email || data?.email}
                      name="email"
                      // onChange={formik.handleChange}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.email}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 row">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                WhatsApp
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      className="mb-3 form-control form-control-lg form-control-solid mb-lg-0"
                      placeholder="9166262453"
                      onChange={handleChangeClient}
                      value={formik.values.whatsapp || data?.whatsapp}
                      name="whatsapp"
                      // onChange={formik.handleChange}
                    />
                    {formik.touched.whatsapp && formik.errors.whatsapp && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.whatsapp}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 row">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Phone
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      className="mb-3 form-control form-control-lg form-control-solid mb-lg-0"
                      placeholder="8708193451"
                      onChange={handleChangePhone}
                      value={formik.values.phone || data?.phone}
                      name="phone"
                      // onChange={formik.handleChange}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.phone}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {!loading && "Save Changes"}
              {loading && (
                <span
                  className="indicator-progress"
                  style={{ display: "block" }}
                >
                  Please wait...{" "}
                  <span className="align-middle spinner-border spinner-border-sm ms-2"></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
