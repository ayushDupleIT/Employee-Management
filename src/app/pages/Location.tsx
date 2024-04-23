import React, { useEffect, useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../_metronic/helpers";
import { useTitle } from "../routing/TitleProvider";
import SubjectModal from "../component/SubjectModal";
import ConfirmationModal from "../component/confirmationModal";
import LocationModal from "../component/LocationModal";
import axios from "axios";
import API from "../ApiRoutes";
import toast from "react-hot-toast";

const Location = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const { setTitle } = useTitle();

  const fetchLocation = async () => {
    try {
      const fetch = await axios.get(API.location);
      setData(fetch.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleDelete = async (id: any) => {
    try {
      await axios.delete(`${API.location}/${id}`);
      toast.success("Location deleted successfully");
      fetchLocation();
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
    setTitle("Location Page");
    fetchLocation();
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
                  Add Location {/* Use bi-plus-lg for larger size */}
                </button>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table align-middle table-row-dashed table-row-gray-300 gs-0 gy-4">
              <thead>
                <tr className="text-gray-900 fw-bold text-muted">
                  <th className="w-25px fs-4">S.No</th>
                  <th className="w-400px fs-4">City</th>
                  <th className="min-w-140px w-400px fs-4">State</th>
                  <th className="min-w-120px w-400px fs-4">Country</th>
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
                            {item.city}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="text-gray-600 cursor-default fw-bold d-block fs-4"
                      >
                        {item.state}
                      </a>
                    </td>
                    <td className="text-end">
                      <div className="d-flex flex-column w-100 me-2">
                        <div className="mb-2 d-flex flex-stack">
                          <span className="text-muted me-2 fs-4 fw-semibold">
                            {item.country}
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
          <LocationModal
            fetchLocation={fetchLocation()}
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

export default Location;
