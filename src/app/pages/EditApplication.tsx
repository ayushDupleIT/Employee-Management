import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import axios from "axios";
import API from "../ApiRoutes";
import { Editor } from "../component/Editor";

const profileDetailsSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  subject: Yup.string().required("Subject is required"),
});

const EditApplication: React.FC = () => {
  const [data, setData] = useState<any>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  console.log("data ", data);

  const formik :any = useFormik({
    initialValues: data,
    validationSchema: profileDetailsSchema,
    onSubmit: async (values:any) => {
      try {
        setLoading(true);
        // Send PATCH request to update the data
        const response = await axios.patch(
          `${API.JOB_URL}/${selectedItemId}`,
          values
        );
        console.log("Update response:", response.data);
        setLoading(false);
        window.location.reload();
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

  const location :any  = useLocation();

  useEffect(() => {
    if (location?.state?.itemId) {
      // Check if "itemId" exists in state
      const itemId: any = location.state.itemId;
      const fetchJob = async (id: any) => {
        try {
          const fetchData :any = await axios.get<JobData>(`${API.JOB_URL}/${id}`);
          console.log("fetchData", fetchData.data.data);
          const data :any  = fetchData.data.data;
          setData(data);
          formik.setFieldValue("subject", data.subject);
          formik.setFieldValue("title", data.title);
          formik.setFieldValue("location", data.location);
          setSelectedItemId(id);
        } catch (error) {
          console.error("Error fetching job data:", error);
          // Handle errors if needed
        }
      };

      fetchJob(itemId);
    }
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



  // Handle changes in location field
  
  console.log("formik.values", formik.values);
  // Handle changes in subject field
  const handleSubjectChange = (event:any) => {
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
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Aland Islands">Aland Islands</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Algeria</option>
                  <option value="American Samoa">American Samoa</option>
                  <option value="Andorra">Andorra</option>
                  <option value="Angola">Angola</option>
                  <option value="Anguilla">Anguilla</option>
                  <option value="Antarctica">Antarctica</option>
                  <option value="Antigua and Barbuda">
                    Antigua and Barbuda
                  </option>
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
                  <option value="job_listings">Job Listings</option>
                  <option value="candidates">Candidates</option>
                  <option value="applications">Applications</option>
                  <option value="recruiters">Recruiters</option>
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
