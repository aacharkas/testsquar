- Parameters that need to be defined for execution:

* Secrets:
  - AWS_ACCESS_KEY_ID (your AWS access key ID)
  - AWS_SECRET_ACCESS_KEY (your AWS access key)
  - ADOBE_ACCOUNT_ID
  - ADOBE_CLIENT_ID
  - ADOBE_CLIENT_SECRET
  - ADOBE_ORG_ID
  - PRIVATE_KEYS
* Env:
  - AWS_REGION (region where the infrastructure is deployed)
  - ECR_REPOSITORY (AWS ECR Repository name)
  - JOB_DEFINITION_TEMP (Path where the template for batch job definition is stored)
  - JOB_TEMP (Path where the template for batch job is stored)
  - BATCH_TFSTATE (Path to batch tfstate file)
  - DOCKER_FILE_PATH: (Located dockerfile for code)
  - DOCKER_FILE: (Name dockerfile)
  - BACKET: (Name s3 bucket)
  - PATH_TO_S3_FILE: Ppath to file in the bucket)
    - In job TestPR
      - DOCKER_FILE_PATH_PYTHON: (Located dockerfile for py)
      - DOCKER_FILE_PYTHON: (Name dockerfile для сборки образа с py script )
      - DIR_ART (directory where the result of executing the py script is saved)

---

Workflows consists of 3 files

     pr_staging.yml
     push_staging.yml
     main_staging.yml

- pr_staging.yml:
  Triggered by PR to staging. runs test and verify the build of container images.

- push_staging: Triggered by merge to staging.
  Consists of two jobs:

  - testAfterMerge (test after merge to staging)
  - buildAndDeployToStaging (Build and deploy after merge to staging).
    Responsible for:
    1. Building and pushing the container image with the necessary parameters to ECR
    1. Registration of batch job definition based on template file ./aws/templates/job_definition_template.json
    1. Running a batch job based on ./aws/templates/job_template.json
    1. Tracking the status of batch job.

- main_staging.yml Triggered by merge to main. Responsible for building and deploying code to the producion.
