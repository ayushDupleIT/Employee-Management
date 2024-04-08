import React from "react";

interface ModalProps {
  url: string;
  onClose: () => void;
}

const PdfViewer: React.FC<ModalProps> = ({ url, onClose }) => {
  return  (
    <div  style={{zIndex :"100"}} className="overflow-y-auto fixed inset-0 pt-6 z-100">
      <div className="flex justify-center items-center px-2 pb-20 min-h-screen text-center z-100">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block overflow-hidden text-left align-bottom bg-white rounded-lg shadow-xl transition-all transform sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="px-8 pt-6 pb-8 z-100 sm:p-8">
            <div className="z-100 sm:flex sm:items-start">
              <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    View resume
                  </h3>
                  <button
                    onClick={onClose}
                    type="button"
                    className="inline-flex justify-center px-2 py-1 text-base font-medium text-white bg-red-500 rounded-md border border-transparent hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                  >
                    Close
                  </button>
                </div>
                <div className="mt-4">
                  <embed
                    src={url}
                    type="application/pdf"
                    width="100%"
                    height="600px" // Increased height by 100px
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
