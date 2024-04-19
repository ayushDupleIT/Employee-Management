import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../ApiRoutes";
import { Editor } from "../component/Editor";
import toast from "react-hot-toast";

const profileDetailsSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  subject: Yup.string().required("Subject is required"),
  client: Yup.string().required("Client is required"),
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

interface Location {
  city: string;
  state: string;
  country: string;
}

const EditApplication: React.FC = () => {
  const [data, setData] = useState<any>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState<{ subject: string }[]>([]);
  const [jobLocations, setLocation] = useState<{ name: string }[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

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
          `${API.JOB_URL}/${selectedItemId}`,
          values
        );
        console.log("Update response:", response.data);
        setLoading(false);
        toast.success("Job Updated Successfully");
        navigate("/jobs-posted");
      } catch (error) {
        console.error("Error updating job:", error);
        setLoading(false);
      }
    },
  });

  interface JobData {
    // Define the properties of the job data
    id: any;
    itemId: any;
    // Add other properties here...
  }

  const fetchLocation = async () => {
    try {
      const locations = await axios.get(API.location);
      setLocations(locations.data.data);
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

  const location: any = useLocation();
  console.log("formik errors", formik.errors);
  useEffect(() => {
    if (location?.state?.itemId) {
      const itemId: any = location.state.itemId;
      const fetchJob = async (id: any) => {
        try {
          const fetchData: any = await axios.get<JobData>(
            `${API.JOB_URL}/${id}`
          );
          console.log("fetchData", fetchData.data.data);
          const data: any = fetchData.data.data;
          setData(data);
          formik.setFieldValue("subject", data.subject);
          formik.setFieldValue("title", data.title);
          formik.setFieldValue("location", data.location);
          formik.setFieldValue("client", data.client);
          formik.setFieldValue("description", data.description);

          setSelectedItemId(id);
        } catch (error) {
          console.error("Error fetching job data:", error);
        }
      };

      fetchJob(itemId);
    }
    fetchSubjects();
    fetchLocation()
    setLocation(indianStates);
  }, [location]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  console.log(formik.errors);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue("title", value);
  };

  const handleChangeClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue("client", value);
  };
  // Handle changes in location field

  console.log("formik.values", formik.values);
  // Handle changes in subject field
  const handleSubjectChange = (event: any) => {
    const subject = event.target.value; // Get the updated subject
    formik.setFieldValue("subject", subject);
  };

  const handleEditorChange = (data: any) => {
    formik.setFieldValue("description", data); // Update the "description" field in form state
  };
  return (
    <div className="mb-5 card mb-xl-10">
      <div className="border-0 cursor-pointer card-body">
        <div className="flex justify-between">
          <div className="my-1 d-flex align-items-center position-relative">
            <h2 className="fw-bold">Edit Job Posting</h2>
          </div>
          <div className="flex flex-row gap-4 justify-end space-y-1">
            <div className="my-1 d-flex align-items-center position-relative">
              <span className="p-4 px-4 font-bold fs-4">
                Candidates applied:
              </span>
              <span className="px-4 py-2 font-bold bg-gray-100 rounded fs-4">
                {data.applicantCount}
              </span>
            </div>
            <div className="my-1 d-flex align-items-center position-relative">
              <span className="p-4 px-4 font-bold fs-4">Date Posted On:</span>
              <span className="px-4 py-2 font-bold bg-gray-100 rounded fs-4">
                {formatDate(data.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div id="kt_account_profile_details" className="show">
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
                      placeholder="Software"
                      onChange={handleChange}
                      value={formik.values.title || data?.title}
                      name="title"
                      // onChange={formik.handleChange}
                    />
                    {formik.touched.title && formik.errors.title && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.title}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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
                      placeholder="Banking"
                      onChange={handleChangeClient}
                      value={formik.values.client || data?.client}
                      name="client"
                      // onChange={formik.handleChange}
                    />
                    {formik.touched.client && formik.errors.client && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.client}
                        </div>
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
                  value={formik.values.location || data?.location} // Bind value to state variable
                  onChange={(e) => {
                    formik.setFieldValue("location", e.target.value);
                  }} // Attach onChange event handler
                >
                  <option selected value="">
                    {data?.location}
                  </option>
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
                {/* Uncomment the following block to display error message if needed */}
                {/* {formik.touched.country && formik.errors.country && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>{formik.errors.country}</div>
          </div>
        )} */}
              </div>
            </div>

            <div className="mb-6 row">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Subject
              </label>
              <div className="col-lg-8 fv-row">
                <select
                  className="form-select form-select-solid form-select-lg"
                  value={formik.values.subject} // Bind value to state variable
                  onChange={handleSubjectChange} // Attach onChange event handler
                >
                  <option value="">{data.subject}</option>
                  {subjects.map((item, index) => (
                    <option key={index} value={item.subject}>
                      {item.subject}
                    </option>
                  ))}
                  {/* <option value="reports">Reports</option> */}
                  {/* Add more subjects as needed */}
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
                  value={formik.values.description || data.description}
                  onChange={handleEditorChange}
                />
                {/* <CKEditor
                  editor={ClassicEditor}
                  data={formik?.values?.description || data?.description}
                  onChange={(event, editor) => {
                    const description = editor.getData(); // Get the updated description from CKEditor
                    formik.setFieldValue("description", description);
                  }}
                /> */}
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

export default EditApplication;
