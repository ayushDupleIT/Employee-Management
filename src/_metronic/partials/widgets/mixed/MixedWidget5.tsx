import { FC } from "react";
import { toAbsoluteUrl } from "../../../helpers";

type Props = {
  className: string;
  time: string;
  image: string;
  title: string;
  description: string;
};

const MixedWidget5: FC<Props> = ({
  className,
  time,
  image,
  title,
  description,
}) => {
  return (
    <div className={`card ${className}`}>
  <div className="card-body d-grid grid-column rounded-lg bg-blue-100  ">
    <div className="d-flex items-center pe-2 mb-5 gy-2">
      <div className="symbol symbol-50px ">
        <span className="symbol-label me-5">
          <img
            src={toAbsoluteUrl(image)}
            className="h-50 align-self-center text-primary"
            alt=""
            style={{ color: "blue" }}
          />
        </span>
      </div>
      <div>
        <span className="text-muted fw-bold text-3xl pt-2">{time}</span>
        <a
          href="#"
          className="text-gray-900 me-5 fw-bold text-hover-primary text-3xl"
        >
          {title}
        </a>
      </div>
    </div>
  </div>
</div>

  );
};

export { MixedWidget5 };
