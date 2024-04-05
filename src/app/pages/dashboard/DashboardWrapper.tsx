import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import {
  TablesWidget10,
  TablesWidget11,
  MixedWidget5,
  StatisticsWidget5,
} from "../../../_metronic/partials/widgets";
import { useTitle } from "../../routing/TitleProvider";
import axios from "axios";
import API from "../../ApiRoutes";

const DashboardPage = () => {
  const { setTitle } = useTitle();
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobCount, setJobsCount] = useState(0);
  const [candidatesCount, setCandidatesCount] = useState(0);

  useEffect(() => {
    setTitle("Dashboard");

    const fetchData = async () => {
      try {
        const responseJobs = await axios.get(`${API.JOB_URL}`);
        const jobsData = responseJobs.data.data.slice(0, 5); // Get first 5 jobs
        setJobs(jobsData);
        setJobsCount(responseJobs.data.count);

        const responseCandidates = await axios.get(`${API.CANDIDATE_URL}`);
        const candidatesData = responseCandidates.data.data.slice(0, 5); // Get first 5 candidates
        setCandidatesCount(responseCandidates.data.count);
        setCandidates(candidatesData);

        console.log("candidatesCount", candidates);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="mb-4 row g-5 g-xxl-8">
        <div className="col-xxl-6">
          <MixedWidget5
            className="mb-5 card-xl-stretch mb-xl-0"
            image="media/svg/brand-logos/briefcase-fill.svg"
            time="Total Posted Jobs : "
            title={jobCount.toString()}
            description="Pitstop creates quick email campaigns.<br/>We help to strengthen your brand."
          />
        </div>
        <div className="col-xxl-6">
          <MixedWidget5
            className="mb-5 card-xl-stretch mb-xl-0"
            image="media/svg/brand-logos/person-lines-fill.svg"
            time="Total Candidates: "
            title={candidatesCount.toString()}
            description="Keenthemes uses the latest and greatest<br/>frameworks for complete modernization."
          />
        </div>
      </div>

      <div className="row g-4 g-xl-8">
        <div className="col-xxl-6">
          <TablesWidget10
            className="mb-5 card-xxl-stretch mb-xl-12"
            jobs={jobs}
          />
        </div>
        <div className="col-xxl-6">
          <TablesWidget11
            className="mb-5 card-xxl-stretch mb-xl-12"
            candidates={candidates}
          />
        </div>
      </div>
    </>
  );
};

const DashboardWrapper = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };
