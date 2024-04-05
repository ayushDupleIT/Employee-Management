import React, { useEffect, useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../_metronic/helpers";
import { useTitle } from "../routing/TitleProvider";


const initialData = [
  {
    id: 1,
    jobTitle: "Software Engineer",
    subject: "Web Development",
    location: "New York",
    date: "2024-04-01",
    candidatesApplied: 10,
    actions: "actions_placeholder",
  },
  {
    id: 2,
    jobTitle: "Data Scientist",
    subject: "Data Science",
    location: "San Francisco",
    date: "2024-04-02",
    candidatesApplied: 15,
    actions: "actions_placeholder",
  },
  {
    id: 3,
    jobTitle: "UX/UI Designer",
    subject: "UI/UX Design",
    location: "Seattle",
    date: "2024-04-03",
    candidatesApplied: 8,
    actions: "actions_placeholder",
  },
  {
    id: 4,
    jobTitle: "DevOps Engineer",
    subject: "DevOps",
    location: "Chicago",
    date: "2024-04-04",
    candidatesApplied: 12,
    actions: "actions_placeholder",
  },
  {
    id: 5,
    jobTitle: "Product Manager",
    subject: "Product Management",
    location: "Boston",
    date: "2024-04-05",
    candidatesApplied: 20,
    actions: "actions_placeholder",
  },
];

const Subject = () => {
  const [data, setData] = useState(initialData);

  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle('Subject Page');
    console.log("Triggered")
  }, []);

  return (
    <div>
      <div className={`card`}>
        {/* Your existing card content */}
        {/* ... */}
        {/* New dynamic rendering using state data */}
        <div className="py-3 card-body">
          <div className="table-responsive">
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
                {data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}.</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="d-flex justify-content-start flex-column">
                          <a
                            href="#"
                            className="text-gray-600 fw-bold text-hover-primary fs-4"
                          >
                            {item.jobTitle}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="text-gray-600 fw-bold text-hover-primary d-block fs-4"
                      >
                        {item.subject}
                      </a>
                    </td>
                    <td className="text-end">
                      <div className="d-flex flex-column w-100 me-2">
                        <div className="mb-2 d-flex flex-stack">
                          <span className="text-muted me-2 fs-4 fw-semibold">
                            {item.location}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">
                      <div className="d-flex flex-column w-100 me-2">
                        <div className="mb-2 d-flex flex-stack">
                          <span className="text-muted me-2 fs-4 fw-semibold">
                            {item.date}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">
                      <div className="d-flex flex-column w-100 ms-15">
                        <div className="mb-2 d-flex flex-stack">
                          <span className="text-muted me-2 fs-4 fw-semibold">
                            {item.candidatesApplied}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex-shrink-0 d-flex justify-content-end">
                        {/* <a
                          href="#"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                        >
                          <KTIcon iconName="switch" className="fs-3" />
                        </a> */}
                        <a
                          href="#"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          data-bs-target='#kt_modal_add_job'
                        >
                         <i className="bi bi-eye-fill fs-3"></i>
                        </a>
                        <a
                          href="#"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          data-bs-target='#kt_modal_add_job'
                        >
                         <i className="bi bi-file-earmark-minus fs-3"></i>
                        </a>
                        <a
                          href="#"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                        >
                          <i className="bi bi-trash3-fill fs-3"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subject;
