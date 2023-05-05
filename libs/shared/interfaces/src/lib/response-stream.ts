import { Writable } from 'stream';

export interface ResponseStream extends Writable {
  setContentType: (contentType: string) => void;
}
