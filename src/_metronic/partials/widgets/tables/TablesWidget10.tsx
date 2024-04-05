import React, { FC } from "react";
import { Link } from "react-router-dom";

type Job = {
  title: string;
  description: string;
  createdAt: string;
  applicantCount: string;
};

type Props = {
  className: string;
  jobs: Job[]; // Accept jobs as a prop
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const TablesWidget10: FC<Props> = ({ className, jobs }) => {
  return (
    <div className={`card ${className}`}>
      <div className="flex justify-between pt-5 card-header border-1">
        <h3 className="card-title align-items-start flex-column">
          <span
            className="mb-1 card-label fw-bolder fs-1"
            style={{ color: "#4c9af3" }}
          >
            Jobs Table
          </span>
        </h3>
        <div
          className="card-toolbar"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-trigger="hover"
          title="Click to add a user"
        >
          <Link
            to="/jobs-posted"
            className="btn btn-sm btn-primary"
            style={{ color: "white" }}
          >
            View All
          </Link>
        </div>
      </div>
      <div className="py-3 card-body border-1">
        <div className="table-responsive">
          <table className="table align-middle table-row-dashed table-row-gray-300 gs-0 gy-4">
            <thead>
              <tr className="fw-bold text-muted">
                <th className="text-gray-900 min-w-150px fs-4">Job Title</th>
                <th className="text-gray-900 min-w-10px fs-4">Description</th>
                <th className="text-gray-900 min-w-15px fs-4">Date</th>
                <th className="text-gray-900 min-w-120px fs-4">Applicants</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={index}>
                  <td style={{ maxWidth: "160px" }}>
                    <a
                      href="#"
                      className="text-gray-600 text-hover-primary d-block fs-5"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxHeight: "3.6rem", // Adjust this value to accommodate two lines of text
                      }}
                    >
                      {job.title}
                    </a>
                  </td>
                  <td style={{ maxWidth: "160px" }}>
                    <a   
                    
                     dangerouslySetInnerHTML={{ __html: job.description }}
                      href="#"
                      className="text-gray-600 text-hover-primary d-block fs-5 ck-p-m"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        overflow: "hidden",
                       
                        WebkitBoxOrient: "vertical",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxHeight: "3.6rem", // Adjust this value to accommodate two lines of text
                      }}
                    >
                      {/* {job.title} */}
                    </a>
                  </td>
                 

                  <td>
                    <span className="text-gray-600 fs-5 d-block">
                      {formatDate(job.createdAt)}
                    </span>
                  </td>
                  <td>
                    <a
                      // href={job.applicantCount}
                      className="cursor-default btn btn-sm btn-light ms-10"
                      data-kt-menu-trigger="click"
                      data-kt-menu-placement="bottom-end"
                      style={{ color: "gray" }}
                    >
                      {job.applicantCount}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { TablesWidget10 };
