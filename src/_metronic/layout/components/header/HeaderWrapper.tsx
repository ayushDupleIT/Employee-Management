import clsx from "clsx";
import { Link } from "react-router-dom";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";
import { useLayout } from "../../core";
import { HeaderToolbar } from "./HeaderToolbar";
import { TitleProvider } from "../../../../app/routing/TitleProvider";
// import IMG from "../../../../media/logos/IMG-20240415-WA0024.jpg";
import IMG from "../../../../media/logos/Nice Job Logo.png";

export function HeaderWrapper() {
  const { config, classes, attributes } = useLayout();
  const { aside } = config;

  return (
    <div className="bg-[red]">
      <div
        id="kt_header"
        className={clsx(
          "header",
          classes.header.join(" "),
          "align-items-stretch "
        )}
        {...attributes.headerMenu}
      >
        {/* begin::Brand */}
        <div className={clsx("header-brand")}>
          {/* begin::Logo */}
          <div className={clsx("flex items-center text-center")}>
            {/* begin::Logo */}
            <Link to="/">
              <img
                alt="Logo"
                src={IMG}
                className="rounded-lg"
                style={{ width: "110px", height: "100px" }}
              />
            </Link>
            {/* <h1 className="ml-8 text-black fs-6">Admin Dashboard</h1> */}
          </div>

          {/* end::Logo */}

          {/* {aside.minimize && (
            <div
              id="kt_aside_toggle"
              className="px-0 w-auto btn btn-icon btn-active-color-primary aside-minimize"
              data-kt-toggle="true"
              data-kt-toggle-state="active"
              data-kt-toggle-target="body"
              data-kt-toggle-name="aside-minimize"
            >
              <KTIcon
                iconName="exit-left"
                className="fs-1 me-n1 minimize-default"
              />
              <KTIcon
                iconName="entrance-left"
                className="fs-1 minimize-active"
              />
            </div>
          )} */}

          {/* begin::Aside toggle */}
          <div
            className="d-flex align-items-center d-lg-none ms-n3 me-1"
            title="Show aside menu"
          >
            <div
              className="btn btn-icon btn-active-color-primary w-30px h-30px"
              id="kt_aside_mobile_toggle"
            >
              <KTIcon iconName="abstract-14" className="fs-1" />
            </div>
          </div>
          {/* end::Aside toggle */}
        </div>
        {/* end::Brand */}
        <HeaderToolbar />
      </div>
    </div>
  );
}
