import React, { useState, useEffect } from "react";
import { KTIcon, toAbsoluteUrl } from "../../_metronic/helpers";
import { UserEditModal } from "../../app/modules/apps/user-management/users-list/user-edit-modal/UserEditModal";
import Select from "react-select";
import { useTitle } from "../routing/TitleProvider";
import axios from "axios";
import API from "../ApiRoutes";
import { useLocation } from "react-router-dom";
import { PaginationControl } from "react-bootstrap-pagination-control";
import PdfViewer from "../component/pdfViewer";
import Invoice from "../../../public/Invoice.pdf";

interface JobData {
  id: string;
  // Define other properties as needed
}

interface GetAllResponse {
  data: JobData[];
}

const JobsCandidate = () => {
  const [data, setData] = useState([]);
  const location: any = useLocation();
  const { setTitle } = useTitle();
  const [searchItem, setSearchItem] = useState("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [itemId, setItemId] = useState<any>("");
  const [pdfFile, setPdfFile] = useState<string>("");
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const pdf = "../../../public/Invoice.pdf";
  useEffect(() => {
    setTitle("Job Candidates Page");
    console.log("Triggered");
  }, []);

  const getAllJobs = async (): Promise<GetAllResponse> => {
    try {
      const response = await axios.get<GetAllResponse>(`${API.CANDIDATE_URL}/`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching all jobs: " + error);
    }
  };

  const searchJobFromTerm = async () => {
    try {
      const searchData = { search: searchItem };
      const fetchData = await axios.post(
        `${API.CANDIDATE_URL}/filterCandidatesForJob/${itemId}`,
        searchData
      );
      setSearchItem("");
      console.log("fetchData", fetchData);
      setData(fetchData.data.data);
      setTotal(fetchData.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadPdf = (pdfUrl: string, fileName: string) => {
    fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
  };

  const fetchPageData = async (page: number) => {
    setLoading(true);
    try {
      const responseJobs = await axios.get(
        `${API.CANDIDATE_URL}/getCandidatesForJob/${itemId}?page=${page}`
      );
      console.log("responseJobs", responseJobs.data.data);
      setData(responseJobs.data.data);
      setTotal(responseJobs.data.count);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const markSeen = async () => {
    try {
      if (location?.state?.itemId) {
        const itemId: any = location?.state?.itemId;
        await axios.post(`${API.CANDIDATE_URL}/mark-seen-by-Admin/${itemId}`);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (location?.state?.itemId) {
          // Check if "itemId" exists in stat
          const itemId: any = location?.state?.itemId;
          const fetchJob = async (id: any) => {
            try {
              const fetchData: any = await axios.get<JobData>(
                `${API.CANDIDATE_URL}/getCandidatesForJob/${id}`
              );
              setData(fetchData.data.data);
              setTotal(fetchData.data.count);
              setLoading(false);
            } catch (error) {
              setLoading(false);
              console.error("Error fetching job data:", error);
              // Handle errors if needed
            }
          };
          setItemId(itemId);
          fetchJob(itemId);
        } else {
          const allJobs: any = await getAllJobs();
          setData(allJobs.data);
          console.log("ALL JOBS");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    markSeen();
  }, [location]);

  const handleViewPdf = (item: any) => {
    setPdfFile(item.resume);
    setIsPdfViewerOpen(true);
  };

  const handleDownload = (resumeUrl: any) => {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "resume"; // You can set a default name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClosePdfViewer = () => {
    setIsPdfViewerOpen(false);
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
                  placeholder="Search users"
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
                  <th className="min-w-160px fs-4">Name</th>
                  <th className="min-w-160px fs-4">Job Title</th>
                  <th className="min-w-160px fs-4">Email</th>
                  <th className="min-w-120px fs-4">Phone No.</th>
                  <th className="min-w-120px fs-4">Client</th>

                  <th className="min-w-80px fs-4">Applied on</th>
                  <th className="min-w-100px text-end fs-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? ( // Show loading indicator
                  <tr>
                    <td
                      colSpan={7}
                      className="justify-center text-center p-15 fs-4 fw-bold"
                    >
                      Loading...{" "}
                      <span className="align-middle spinner-border spinner-border-sm me-2"></span>
                    </td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((item: any, index: any) => (
                    <tr
                      key={item.id}
                      className={item.seenByAdmin ? "" : "bg-sky-100"}
                    >
                      <td className="px-5">
                        {(page - 1) * limit + (index + 1)}.
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="d-flex justify-content-start flex-column">
                            <a
                              href="#"
                              className="text-gray-600 cursor-default fw-bold fs-4 clamp-1"
                            >
                              {item.name}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a
                          href="#"
                          className="text-gray-600 cursor-default fw-bold d-block fs-4 clamp-1"
                        >
                          {item.jobTitle}
                        </a>
                      </td>
                      <td className="text-end">
                        <a
                          href="#"
                          className="text-left text-gray-600 ursor-default fw-bold d-block fs-4 clamp-1"
                        >
                          {item.email}
                        </a>
                      </td>
                      <td className="">
                        <a
                          href="#"
                          className="text-gray-600 cursor-default fw-bold d-block fs-4 clamp-1"
                        >
                          {item.phone}
                        </a>
                      </td>
                      <td className="">
                        <div className="d-flex flex-column">
                          <div className="mb-2 d-flex flex-stack">
                            <span className="text-gray-600 fs-4 fw-bold line-clamp-1">
                              {item.client ? item.client : "Client"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="">
                        <div className="w-40 d-flex flex-column">
                          <div className="mb-2 d-flex flex-stack">
                            <span className="text-gray-600 fs-4 fw-bold">
                              {formatDate(item.createdAt)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex-shrink-0 d-flex justify-content-center">
                          <a
                            href={item.resume}
                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                            // onClick={() => handleViewPdf(item)}
                          >
                            <i className="bi-cloud-arrow-down-fill fs-5"></i>
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
                      No Candidates found!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {isPdfViewerOpen && (
            <PdfViewer url={pdfFile} onClose={handleClosePdfViewer} />
          )}
          <PaginationControl
            page={page}
            between={4}
            total={total}
            limit={limit}
            changePage={(page) => {
              setPage(page);
              fetchPageData(page);
            }}
            ellipsis={1}
          />
        </div>
      </div>
    </div>
  );
};

export default JobsCandidate;
