import React, { useEffect, useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../_metronic/helpers";
import { useTitle } from "../routing/TitleProvider";
import axios from "axios";
import API from "../ApiRoutes";
import toast from "react-hot-toast";
import ConfirmationModal from "../component/confirmationModal";
import SubjectModal from "../component/SubjectModal";

type DataResponse = {
  _id: number;
  subject: string;
  actions: string;
};

const Subject = () => {
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [data, setData] = useState<DataResponse[]>([]);

  const { setTitle } = useTitle();
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const fetchSubjects = async () => {
    try {
      const fetch = await axios.get(`${API.subject}`);
      console.log("fetch", fetch.data.data);
      setData(fetch.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(`${API.subject}/${id}`);
      fetchSubjects();
      toast.success("Subject deleted successfully");
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleConfirmDelete = () => {
    if (deleteItemId) {
      handleDelete(deleteItemId);
      setIsModalOpen(false); // Close the modal after confirming deletion
    }
  };
  useEffect(() => {
    setTitle("Subject Page");
    fetchSubjects();
  }, []);

  return (
    <div>
      <div className={`card`}>
        {/* Your existing card content */}
        {/* ... */}
        {/* New dynamic rendering using state data */}
        <div className="py-3 card-body">
          <div className="flex justify-end pb-10">
            <div className="flex flex-row gap-6 justify-start space-y-1">
              <div className="my-1 d-flex align-items-center position-relative">
                <button
                  className="p-4 px-6 mt-6 font-bold bg-green-600 rounded cursor-pointer fs-6 hover:bg-red-600 btn btn-primary" 
                  style={{ color: "#ffffff" }}
                  onClick={handleOpenModal}
                >
                  Add Subject {/* Use bi-plus-lg for larger size */}
                </button>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table align-middle table-row-dashed table-row-gray-300 gs-0 gy-4">
              <thead>
                <tr className="text-gray-900 fw-bold text-muted">
                  <th className="w-500px fs-4">S.No</th>
                  <th className="min-w-150px ms-5 fs-4">Subject</th>
                  <th className="min-w-100px text-end fs-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: any, index: any) => (
                  <tr key={item.id}>
                    <td>{index + 1}.</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="d-flex justify-content-start flex-column">
                          <a
                            href="#"
                            className="text-gray-600 cursor-default fw-bold fs-4"
                          >
                            {item.subject}
                          </a>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="flex-shrink-0 d-flex justify-content-end">
                        <a
                          href="#"
                          className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
                          onClick={() => {
                            setDeleteItemId(item._id); // Set the deleteItemId when the delete button is clicked
                            setIsModalOpen(true); // Open the modal
                          }}
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
        {showModal && (
          <SubjectModal
            fetchSubjects={fetchSubjects}
            onClose={handleCloseModal}
          />
        )}

        <ConfirmationModal
          isOpen={isModalOpen}
          onCancel={handleCancel}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
};

export default Subject;
