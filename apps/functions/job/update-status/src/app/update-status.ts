import { JobStatus, Prisma, UserRole } from '@prisma/client';

import * as jobCrudService from '@squaredash/crud/job';
import { ForbiddenException, NotFoundException } from '@squaredash/shared/util';

// Define some custom type to make the code more readable and understandable
type Job = Prisma.JobGetPayload<{
  include: {
    insuranceScope: {
      include: {
        customer: {
          include: {
            responsibleMembers: true;
          };
        };
      };
    };
  };
}>;

// Define a custom type for the current user context, to make it easier to understand and pass around
type CurrentUserContext = { companyId: string; id: string; role: UserRole };

/**
 * Updates the status of a job with the given job ID to the given status, after verifying the user's permissions.
 *
 * @async
 * @function
 * @param {string} jobId - The ID of the job to update.
 * @param {JobStatus} status - The new status to set for the job.
 * @param {CurrentUserContext} context - The context of the current user making the request.
 * @returns {Promise<void>} - A Promise that resolves with no value when the update is complete.
 * @throws {NotFoundException} - If the job with the given ID is not found.
 * @throws {ForbiddenException} - If the current user does not have permission to update the job's status.
 */
export async function updateStatus(
  jobId: string,
  status: JobStatus,
  context: CurrentUserContext
): Promise<void> {
  const job = await getJobById(jobId);

  await verifyUserPermissions(job, context);
  await setJobStatusById(jobId, status);
}

/**
 * Retrieves a job with the given ID, including its insurance scope and responsible members.
 *
 * @async
 * @function
 * @param {string} jobId - The ID of the job to retrieve.
 * @returns {Promise<Job>} A promise that resolves to the retrieved job object.
 * @throws {NotFoundException} If no job with the given ID was found.
 */
async function getJobById(jobId: string): Promise<Job> {
  const job = await jobCrudService.findUnique({
    where: { id: jobId },
    include: {
      insuranceScope: {
        include: {
          customer: {
            include: {
              responsibleMembers: true,
            },
          },
        },
      },
    },
  });
  if (!job) {
    throw new NotFoundException();
  }

  return job as Job;
}

/**
 * Verifies that the specified user has permission to update the status of the specified job.
 *
 * @async
 * @function
 * @param {Job} job - The job to verify permissions for.
 * @param {CurrentUserContext} currentUserContext - The context of the current user making the request.
 * @throws {ForbiddenException} If the specified user does not have permission to update the job status.
 */
async function verifyUserPermissions(
  job: Job,
  currentUserContext: CurrentUserContext
): Promise<void> {
  if (currentUserContext.companyId !== job.insuranceScope.companyId) {
    throw new ForbiddenException('IM0086');
  }

  const allowedToCompleteJobStatuses = [
    JobStatus.PENDING_COMPLETION,
    JobStatus.DEDUCTABLE_PAID,
  ] as JobStatus[];
  if (!allowedToCompleteJobStatuses.includes(job.status)) {
    throw new ForbiddenException('IM0086');
  }

  if (
    currentUserContext.role === UserRole.COMPANY_USER &&
    !isMemberResponsible(job, currentUserContext.id)
  ) {
    throw new ForbiddenException('IM0086');
  }
}

/**
 * Determines if the given user is responsible for the given job.
 *
 * @param {Job} job - The job to check.
 * @param {string} userId - The ID of the user to check.
 * @returns {boolean} - `true` if the user is responsible for the job, `false` otherwise.
 */
function isMemberResponsible(job: Job, userId: string): boolean {
  return job.insuranceScope.customer.responsibleMembers.some(
    (responsibleMember) => responsibleMember.id === userId
  );
}

/**
 * Sets the status of the job with the given ID to the given status.
 *
 * @async
 * @function
 * @param {string} jobId - The ID of the job to update.
 * @param {JobStatus} status - The new status for the job.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 */
async function setJobStatusById(
  jobId: string,
  status: JobStatus
): Promise<void> {
  await jobCrudService.update({
    where: { id: jobId },
    data: { status: status },
  });
}
