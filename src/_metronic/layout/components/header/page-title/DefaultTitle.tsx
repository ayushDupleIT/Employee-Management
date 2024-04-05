import { FC } from "react";
import { useTitle } from "../../../../../app/routing/TitleProvider";

const DefaultTitle: FC = () => {
  const { title } = useTitle();

  console.log("hello", title)
  return (
    <div className="page-title d-flex justify-content-center flex-column me-5">
      {title && (
        <h1 className="mb-0 text-gray-900 d-flex flex-column fw-bolder fs-3">
          {title}
        </h1>
      )}
    </div>
  );
};

export { DefaultTitle };
