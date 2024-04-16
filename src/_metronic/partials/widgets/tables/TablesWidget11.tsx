import { FC, useState } from "react";
import { Link } from "react-router-dom";
import PdfViewer from "../../../../app/component/pdfViewer";

type Candidate = {
  name: string;
  jobTitle: string;
  createdAt: string;
  resume: string;
};

type Props = {
  className: string;
  candidates: Candidate[];
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const TablesWidget11: FC<Props> = ({ className, candidates }) => {
  const pdf = "../../../public/Invoice.pdf";
  const [pdfFile, setPdfFile] = useState<string>("");
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState<boolean>(false);

  const handleViewPdf = (item: any) => {
    setPdfFile(pdf);
    setIsPdfViewerOpen(true);
  };

  const handleClosePdfViewer = () => {
    setIsPdfViewerOpen(false);
  };

  return (
    <div className={`card ${className}`}>
      <div className="flex justify-between pt-5 card-header border-1">
        <h3 className="card-title align-items-start flex-column">
          <span
            className="mb-1 card-label fw-bolder fs-1"
            style={{ color: "rgb(33 56 79)" }}
            // style={{ color: "#4c9af3" }}
          >
            Candidates table
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
            to="/candidates"
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
                <th className="text-gray-900 min-w-150px fs-4">Name</th>
                <th className="text-gray-900 min-w-10px fs-4">Job Title</th>
                <th className="text-gray-900 min-w-10px fs-4">Applied On</th>
                <th className="text-gray-900 min-w-80px ms-4 fs-4">Resume</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="d-flex justify-content-start flex-column">
                        <a
                          href='#'
                          className="text-gray-600 cursor-default text-hover-primary fs-5 clamp-4"
                        >
                          {candidate.name}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="text-gray-600 cursor-default text-hover-primary d-block fs-5 clamp-2"
                    >
                      {candidate.jobTitle}
                    </a>
                  </td>
                  <td className="">
                    <span className="text-gray-600 fs-5 d-block">
                      {formatDate(candidate.createdAt)}
                    </span>
                  </td>
                  <td className="">
                    <a
                      href={candidate.resume}
                      className="btn btn-sm btn-light btn-active-green hover:text-green-600"
                      data-kt-menu-trigger="click"
                      data-kt-menu-placement="bottom-end"
                      style={{ color: "gray" }}
                      // onClick={() => handleViewPdf(candidate)}
                    >
                      Download
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

export { TablesWidget11 };
