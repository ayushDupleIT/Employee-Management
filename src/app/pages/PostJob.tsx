import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useTitle } from "../routing/TitleProvider";
import axios from "axios";
import API from "../ApiRoutes";
import { Editor } from "../component/Editor";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import NewCategoryModal from "../component/NewCategoryModal";

interface Location {
  city: string;
  state: string;
  country: string;
}

const profileDetailsSchema = Yup.object().shape({
  title: Yup.string().required("Job Title is required"),
  description: Yup.string().required("Job Description is required"),
  location: Yup.string().required("Location is required"),
  subject: Yup.string().required("Subject is required"),
  client: Yup.string().required("Client is required"),
  category: Yup.string().required("Category is required"),
});

// Dummy location

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

const PostJob: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [subjects, setSubjects] = useState<{ subject: string }[]>([]);
  const [categories, setCategories] = useState<
    { _id: number; category: string }[]
  >([]);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchCategories = async () => {
    try {
      const responseCandidates = await axios.get(`${API.cat}`);
      setCategories(responseCandidates.data.data);
    } catch (error) {}
  };

  const fetchSubjects = async () => {
    try {
      const subjects = await axios.get(API.subject);
      setSubjects(subjects.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchLocation = async () => {
    try {
      const locations = await axios.get(API.location);
      setLocations(locations.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchCategories();
    fetchSubjects();
    fetchLocation();
  }, []);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      location: "",
      subject: "",
      client: "",
      category: "",
    },
    validationSchema: profileDetailsSchema,
    onSubmit: async (values, { setFieldValue }) => {
      setLoading(true);
      try {
        setLoading(true);
        const response = await axios.post(`${API.JOB_URL}`, values);

        setLoading(false);
        toast.success("New Job Posted Successfully", {
          style: {
            fontSize: "16px",
          },
        });

        navigate("/jobs-posted");
      } catch (error) {
        console.error("Error posting job:", error);
        setLoading(false);
      }
    },
  });

  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Post new Job");
  }, []);

  const handleEditorChange = (data: any) => {
    formik.setFieldValue("description", data); // Update the "description" field in form state
  };

  console.log("formik", formik.errors);
  return (
    <div className="mb-5 card mb-xl-10">
      <div
        className="border-0 cursor-pointer card-header"
        role="button"
        data-bs-target="#kt_account_profile_details"
        aria-expanded="true"
        aria-controls="kt_account_profile_details"
      >
        <div className="m-0 card-title">
          <h3 className="m-0 fw-bolder">Post a Job</h3>
        </div>
      </div>

      <div id="kt_account_profile_details" className="">
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="p-9 card-body border-top">
            <div className="mb-6 row">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Job Title
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      className="mb-3 form-control form-control-lg form-control-solid mb-lg-0"
                      placeholder="Software Developer"
                      {...formik.getFieldProps("title")}
                    />
                  </div>
                  {formik.touched.title && formik.errors.title && (
                    <div className="text-red-500">{formik.errors.title}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6 row">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Field
              </label>
              <div className="w-full col-lg-8 fv-row d-flex flex-column">
                <div className="mb-3 d-flex align-items-center">
                  <select
                    className="form-select form-select-solid form-select-lg flex-grow-2"
                    {...formik.getFieldProps("category")}
                  >
                    <option value="">Select a Category...</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.category}>
                        {category.category}
                      </option>
                    ))}
                  </select>

                  {/* <button
                    type="button"
                    className="btn btn-icon btn-primary ms-3"
                    onClick={handleOpenModal}
                  >
                    <i className="bi bi-plus fs-1"></i>
                  </button> */}
                </div>
                {formik.touched.category && formik.errors.category && (
                  <div className="text-red-500">{formik.errors.category}</div>
                )}
              </div>
            </div>
            <div className="mb-6 row">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Client Name
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      className="mb-3 form-control form-control-lg form-control-solid mb-lg-0"
                      placeholder="JP Industries"
                      {...formik.getFieldProps("client")}
                    />
                    {formik.errors.client && (
                      <div className="text-red-500">{formik.errors.client}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 row">
              <label className="col-lg-4 col-form-label fw-bold fs-6">
                <span className="required">Location</span>
              </label>

              <div className="col-lg-8 fv-row">
                <select
                  className="form-select form-select-solid form-select-lg fw-bold"
                  {...formik.getFieldProps("location")}
                >
                  <option value="">Select a Location...</option>
                  {locations.map((location, index) => (
                    <option
                      key={index}
                      value={`${location.city}, ${
                        location.state ? location.state + ", " : ""
                      }${location.country}`}
                    >
                      {location.city}
                      {location.state ? `, ${location.state}` : ""},{" "}
                      {location.country}
                    </option>
                  ))}
                </select>
                {formik.errors.location && (
                  <div className="text-red-500">{formik.errors.location}</div>
                )}
              </div>
            </div>

            <div className="mb-6 row">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Subject
              </label>
              <div className="col-lg-8 fv-row">
                <select
                  className="form-select form-select-solid form-select-lg"
                  {...formik.getFieldProps("subject")}
                >
                  <option value="">Select a subject...</option>
                  {subjects.map((item, index) => (
                    <option key={index} value={item.subject}>
                      {item.subject}
                    </option>
                  ))}
                </select>
                {formik.errors.subject && (
                  <div className="text-red-500">{formik.errors.subject}</div>
                )}
                <div className="form-text">
                  Please select a preferred language, including date, time, and
                  number formatting.
                </div>
              </div>
            </div>
            <div className="mb-6 row">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Description
              </label>

              <div className="col-lg-8 fv-row">
                <div style={{ position: "relative" }}>
                  <Editor
                    value={formik.values.description}
                    onChange={handleEditorChange}
                  />
                  {formik.errors.description && (
                    <div
                      className="text-red-500"
                      style={{ position: "absolute", bottom: "-20px", left: 0 }}
                    >
                      {formik.errors.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="px-9 py-6 card-footer d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {!loading ? (
                "Submit"
              ) : (
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

export { PostJob };
