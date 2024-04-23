import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogOut: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="flex overflow-hidden fixed inset-0 z-50 justify-center items-center h-screen">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div className="overflow-hidden bg-white rounded-lg shadow-xl transition-all transform sm:max-w-xl sm:w-full">
        <div className="px-6 py-8 sm:px-8">
          <div className="justify-center sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-center">
              <h3
                className="font-bold leading-6 text-gray-900 fs-4"
                id="modal-headline"
              >
                Logout Confirmation
              </h3>
              <div className="mt-2">
                <p className="text-lg text-gray-600 fs-4">
                  Are you sure you want to logout?
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 px-4 py-3 bg-gray-50">
          <div className="flex justify-center">
            <button
              onClick={onConfirm}
              type="button"
              className="inline-flex justify-center px-6 py-3 mr-5 text-lg text-white rounded-md border border-transparent shadow-sm fs-4 bg-primary hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
            >
              Log out
            </button>
            <button
              onClick={onCancel}
              type="button"
              className="inline-flex justify-center px-6 py-3 text-lg text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm fs-4 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogOut;
