/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import noUiSlider, { target } from "nouislider";
import { useLayout } from "../../core";
import { KTIcon } from "../../../helpers";
import { DefaultTitle } from "./page-title/DefaultTitle";
import { Dropdown2, ThemeModeSwitcher } from "../../../partials";
import { useAuth } from "../../../../app/modules/auth";
import { Dropdown1 } from "../../../partials/content/dropdown/Dropdown1";
import { TitleProvider, useTitle } from "../../../../app/routing/TitleProvider";
import NotificationsContainer from "./NotificationsContainer"; // Import NotificationsContainer
import API from "../../../../app/ApiRoutes";
import axios from "axios";
import LogOut from "../../../../app/component/logOut";

const HeaderToolbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); // Add state for notifications

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen); // Toggle notifications
  };

  const { classes } = useLayout();
  const [status, setStatus] = useState<string>("1");
  const { currentUser, logout } = useAuth();
  const [notifications, setIsNotifications] = useState([]);
  const [modal, setModal] = useState(false);

  const fetchNotifications = async () => {
    try {
      const response: any = await axios.get(
        `${API.CANDIDATE_URL}/job/getNotifications`
      );
      // console.log("response", response.data.notifications)
      setIsNotifications(response.data.notifications.slice(0, 5));
      // console.log(response.data.notifications)
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchNotifications();
    const slider: target = document.querySelector(
      "#kt_toolbar_slider"
    ) as target;
    const rangeSliderValueElement: Element | null = document.querySelector(
      "#kt_toolbar_slider_value"
    );

    if (!slider) {
      return;
    }

    slider.innerHTML = "";

    noUiSlider.create(slider, {
      start: [5],
      connect: [true, false],
      step: 1,
      range: {
        min: [1],
        max: [10],
      },
    });

    slider.noUiSlider?.on("update", function (values: any, handle: any) {
      if (!rangeSliderValueElement) {
        return;
      }

      rangeSliderValueElement.innerHTML = parseInt(values[handle]).toFixed(1);
    });
  }, []);

  return (
    <div className="p-4 toolbar d-flex align-items-stretch">
      {/* begin::Toolbar container */}
      <div
        className={`${classes.headerContainer.join(
          " "
        )} py-6 py-lg-0 d-flex flex-column flex-lg-row align-items-lg-stretch justify-content-lg-between`}
      >
        <DefaultTitle />
        <div className="overflow-auto pt-3 d-flex align-items-stretch pt-lg-0">
          {/* Notifications button */}
          {/* <button
            className="p-4 px-6 mx-4 font-bold bg-gray-200 rounded cursor-pointer fs-5"
            onClick={toggleNotifications}
          >
            <i className="pr-3 justify-content-lg-between bi bi-bell-fill fs-3"></i>
            Notifications
          </button>
          {isNotificationsOpen && <NotificationsContainer notifications={notifications} />}  */}
          {/* Render NotificationsContainer if isNotificationsOpen is true */}
          {/* Logout button */}
          <button
            className="gap-3 p-4 px-6 font-bold bg-gray-200 rounded fs-5 btn btn-active-primary"
            onClick={() => setModal(true)}
          >
            <i className="pr-3 font-bold justify-content-lg-between bi bi-box-arrow-in-right fs-2"></i>
            Log out
          </button>
        </div>
        {/* end::Toolbar container */}
        {modal && (
          <LogOut
            isOpen={modal}
            onCancel={() => setModal(false)}
            onConfirm={logout}
          />
        )}
      </div>
    </div>
  );
};

export { HeaderToolbar };
