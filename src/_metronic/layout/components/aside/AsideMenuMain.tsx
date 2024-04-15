import { useIntl } from "react-intl";
import { KTIcon } from "../../../helpers";
import { AsideMenuItemWithSub } from "./AsideMenuItemWithSub";
import { AsideMenuItem } from "./AsideMenuItem";

export function AsideMenuMain() {
  const intl = useIntl();

  return (
    <>
      <div className="menu-item">
        {/* <div className="pt-8 pb-2 menu-content">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Crafted
          </span>
        </div> */}
      </div>
      
      <AsideMenuItem
        to="/dashboard"
        title="Dashboard"
        // icon="gift"
        fontIcon="bi-bar-chart-line"
      />
      <AsideMenuItem
        to="/post-a-job"
        title="Post a Job"
        // icon="gift"
        fontIcon="bi-file-text"
      />
      <AsideMenuItem
        to="/jobs-posted"
        title="Jobs posted"
        // icon="gift"
        fontIcon="bi-journals"
      />
      <AsideMenuItem
        to="/candidates"
        title="Candidates"
        // icon="gift"
        fontIcon="bi-people"
      />
      <AsideMenuItem
        to="/subject"
        title="Subject"
        // icon="gift"
        fontIcon="bi-clipboard-data"
      />
      <AsideMenuItem
        to="/location"
        title="Location"
        // icon="gift"
        fontIcon="bi-geo-alt-fill"
      />
      <AsideMenuItem
        to="/category"
        title="Category"
        // icon="gift"
        fontIcon="bi bi-list-ul"
      />
    
    </>
  );
}
