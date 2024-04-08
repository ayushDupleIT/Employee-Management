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
  const [location, setLocation] = useState<{ name: string }[]>([]);
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
  useEffect(() => {
    fetchCategories();
    setLocation(indianStates);
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
        console.log("New Job Posted:", response.data);
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

  console.log(formik.errors);

  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Post new Job");
  }, []);

  const handleEditorChange = (data: any) => {
    formik.setFieldValue("description", data); // Update the "description" field in form state
  };

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
        <form onSubmit={formik.handleSubmit} noValidate className="form">
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
                    {formik.touched.title && formik.errors.title && (
                      <div className="invalid-feedback">
                        {formik.errors.title}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6 row">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Field
              </label>
              <div className="w-full col-lg-7 fv-row d-flex">
                <select
                  className="form-select form-select-solid form-select-lg flex-grow-2"
                  {...formik.getFieldProps("category")}
                >
                  <option value="">Select a Category...</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category._id}>
                      {category.category}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-icon btn-primary"
                  onClick={handleOpenModal}
                >
                  <i className="bi bi-plus"></i>
                </button>
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
                    {formik.touched.client && formik.errors.client && (
                      <div className="invalid-feedback">
                        {formik.errors.client}
                      </div>
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
                  {location.map((state, index) => (
                    <option key={index} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
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
                  <option value="job_listings">Job Listings</option>
                  <option value="candidates">Candidates</option>
                  <option value="applications">Applications</option>
                  <option value="recruiters">Recruiters</option>
                </select>

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
                <Editor
                  value={formik.values.description}
                  onChange={handleEditorChange}
                />
                {/* <CKEditor
                  editor={ClassicEditor}
                  data=""
                  onReady={(editor) => {
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={handleEditorChange}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                /> */}
                {formik.touched.description && formik.errors.description && (
                  <div className="invalid-feedback">
                    {formik.errors.description}
                  </div>
                )}
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
        {showModal && <NewCategoryModal onClose={handleCloseModal} />}
      </div>
    </div>
  );
};

export { PostJob };
