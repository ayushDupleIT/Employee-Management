import React, { useState, useEffect } from "react";
import { KTIcon, toAbsoluteUrl } from "../../_metronic/helpers";
import { useTitle } from "../routing/TitleProvider";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../ApiRoutes";
import ConfirmationModal from "./confirmationModal";

type DataResponse = {
  _id: number;
  title: string;
  subject: string;
  location: string;
  createdAt: any;
  applicantCount: number;
  actions: string;
};

const JobsPosted = () => {
  const [data, setData] = useState<DataResponse[]>([]);

  const [searchItem, setSearchItem] = useState("");

  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseJobs = await axios.get(`${API.JOB_URL}`);
        console.log("responseJobs", responseJobs.data.data);
        setData(responseJobs.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Jobs Posted");
    console.log("Triggered");
  }, []);

  const navigate = useNavigate();

  const handleLinkClick = (item: any) => {
    navigate(`/editapplication`, { state: { itemId: item._id } });
    console.log("item.id", item._id);
  };

  const redirectToCandidate = (item: any) => {
    navigate(`/candidates`, { state: { itemId: item._id } });
    console.log("item.id", item._id);
  };

  const handleDelete = async () => {
    // / const deleteJob = await axios.delete(`${API.JOB_URL}/${itemId}`);
    try {
      if (deleteItemId) {
        const deleteJob = await axios.delete(`${API.JOB_URL}/${deleteItemId}`);
        console.log("Deleting item with id:", deleteItemId);
        setDeleteItemId(null);
        setIsModalOpen(false);
        window.location.reload();
      } else {
        console.error("No item id found for deletion.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      // Handle error appropriately
    }
  };

  const searchJobFromTerm = async () => {
    try {
      const searchData = { search: searchItem };
      const fetchData = await axios.post(
        `${API.JOB_URL}/search-job`,
        searchData
      );
      setSearchItem("");
      console.log("fetchData", fetchData);
      setData(fetchData.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div>
      <div className={`card`}>
        {/* Your existing card content */}
        {/* ... */}
        {/* New dynamic rendering using state data */}
        <div className="p-10 py-6 pb-10 mt-5 card-body">
          <div className="flex justify-end">
            <div className="flex flex-row gap-6 justify-end space-y-1">
              {/* <div className="my-1 d-flex align-items-center position-relative">
                <select
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  data-kt-user-table-filter="search"
                  className="pl-14 form-select form-select-solid w-150px"
                >
                  <option value="">Location</option>
                  {dummyLocations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div> */}
              {/* <div className="my-1 d-flex align-items-center position-relative">
                <select
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  data-kt-user-table-filter="search"
                  className="pl-14 form-select form-select-solid w-150px"
                >
                  <option value="">Subject</option>
                  {dummyLocations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div> */}
              <div className="my-1 d-flex align-items-center position-relative">
                <KTIcon
                  iconName="magnifier"
                  className="fs-1 position-absolute ms-6"
                />
                <input
                  type="text"
                  data-kt-user-table-filter="search"
                  className="form-control form-control-solid w-300px ps-14"
                  placeholder="Search jobs"
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                />
              </div>
              <div className="my-1 d-flex align-items-center position-relative">
                <button
                  className="p-4 px-6 font-bold rounded cursor-pointer fs-5"
                  style={{ backgroundColor: "#056ee9", color: "#ffffff" }}
                  onClick={searchJobFromTerm}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 table-responsive">
            <table className="table align-middle table-row-dashed table-row-gray-300 gs-0 gy-4">
              <thead>
                <tr className="text-gray-900 fw-bold text-muted">
                  <th className="w-25px fs-4">S.No</th>
                  <th className="min-w-150px fs-4">Job Title</th>
                  <th className="min-w-140px fs-4">Subject</th>
                  <th className="min-w-120px fs-4">Location</th>
                  <th className="min-w-120px fs-4">Date</th>
                  <th className="min-w-120px fs-4">Candidates Applied</th>
                  <th className="min-w-100px text-end fs-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item: any, index: any) => (
                    <tr key={item.id}>
                      <td>{index + 1}.</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="d-flex justify-content-start flex-column">
                            <button
                              // onClick={() => handleLinkClick(item)}
                              className="text-gray-600 cursor-auto fw-bold fs-4"
                            >
                              {item.title}
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a
                          href="#"
                          className="text-gray-600 cursor-auto fw-bold d-block fs-4"
                        >
                          {item.subject}
                        </a>
                      </td>

                      <td className="text-end">
                        <div className="d-flex flex-column w-100 me-2">
                          <div className="mb-2 d-flex flex-stack">
                            <span className="text-gray-600 me-2 fs-4 fw-bold">
                              {item.location}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-end">
                        <div className="d-flex flex-column w-100 me-2">
                          <div className="mb-2 d-flex flex-stack">
                            <span className="text-gray-600 me-2 fs-4 fw-bold">
                              {formatDate(item.createdAt)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-end">
                        <div className="d-flex flex-column w-100 ms-15">
                          <div
                            className="mb-2 d-flex flex-stack"
                            onClick={() => redirectToCandidate(item)}
                          >
                            <span className="justify-center p-2 px-4 rounded transition-colors duration-300 cursor-pointer me-2 fs-4 fw-semibold bg-slate-200 hover:bg-blue-600 hover:text-white">
                              {item.applicantCount}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex-shrink-0 d-flex justify-content-end">
                          <div
                            onClick={() => handleLinkClick(item)}
                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          >
                            <i className="bi bi-pencil-square fs-3 bg-f9f9f9 btn-bg-light"></i>
                          </div>

                          <a
                            href="#"
                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          >
                            <i className="bi bi-check-lg fs-3"></i>
                          </a>
                          <a
                            // onClick={() => handleDeleteBanner(item.id)}
                            onClick={() => {
                              setDeleteItemId(item._id); // Set the deleteItemId when the delete button is clicked
                              setIsModalOpen(true); // Open the modal
                            }}
                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                          >
                            <i className="bi bi-trash3-fill fs-3"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="justify-center text-center p-15 fs-4 fw-bold"
                    >
                      No jobs found!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <ConfirmationModal
            isOpen={isModalOpen}
            onCancel={handleCancel}
            onConfirm={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default JobsPosted;
