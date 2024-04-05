// const JOB_URL = "http://localhost:8080/job/";
// const CANDIDATE_URL = "http://localhost:8080/candidate/";

const JOB_URL = "http://64.227.173.23:8080/job/";
const CANDIDATE_URL = "http://64.227.173.23:8080/candidate/";

const API = {
    // Jobs
    JOB_URL: JOB_URL,
    CANDIDATE_URL: CANDIDATE_URL,
    create_job: JOB_URL,
    get_all_jobs: JOB_URL + '/',
    get_job_by_id: JOB_URL + '/'
}

export default API;
