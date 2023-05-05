import { UPLOAD_TYPE } from './upload-type';

interface UploadFileConfig {
  prefix: string;
  allowedMimeTypes: string[];
}

type UploadTypeMap = {
  [key in UPLOAD_TYPE]: UploadFileConfig;
};

export const UPLOAD_TYPE_MAP: UploadTypeMap = {
  [UPLOAD_TYPE.COMPANY_AVATAR]: {
    prefix: 'company-avatar',
    allowedMimeTypes: ['image/bmp', 'image/jpeg', 'image/x-png', 'image/png'],
  },
  [UPLOAD_TYPE.USER_AVATAR]: {
    prefix: 'user-avatar',
    allowedMimeTypes: ['image/bmp', 'image/jpeg', 'image/x-png', 'image/png'],
  },
  [UPLOAD_TYPE.INSURANCE_SCOPE]: {
    prefix: 'insurance-scope',
    allowedMimeTypes: ['application/pdf'],
  },
  [UPLOAD_TYPE.INSURANCE_SCOPE_EXTRACTED]: {
    prefix: 'insurance-scope-extracted',
    allowedMimeTypes: ['application/json'],
  },
  [UPLOAD_TYPE.JOB_CONTRACT]: {
    prefix: 'job-contract',
    allowedMimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats',
      'image/jpeg',
      'image/heic',
    ],
  },
};
