// const JOB_URL = "http://localhost:8080/job/";
// const CANDIDATE_URL = "http://localhost:8080/candidate/";
// const CAT_URL = "http://localhost:8080/cat/";
// const SUBJECT_URL = "http://localhost:8080/subject/";
// const LOCATION_URL = "http://localhost:8080/location/";

const JOB_URL = "http://64.227.173.23:8080/job/";
const CANDIDATE_URL = "http://64.227.173.23:8080/candidate/";
const SUBJECT_URL = "http://64.227.173.23:8080/subject/";
const LOCATION_URL = "http://64.227.173.23:8080/location/";
const CAT_URL = "http://64.227.173.23:8080/cat/";
const AWS_S3 = "http://64.227.173.23:8080/aws-s3/image-upload/";

const API = {
  // Jobs
  JOB_URL: JOB_URL,
  CANDIDATE_URL: CANDIDATE_URL,
  create_job: JOB_URL,
  get_all_jobs: JOB_URL + "/",
  get_job_by_id: JOB_URL + "/",
  cat: CAT_URL,
  view_pdf: AWS_S3,
  subject: SUBJECT_URL,
  location: LOCATION_URL,
};

export default API;
