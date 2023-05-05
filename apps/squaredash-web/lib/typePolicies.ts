import { varToken } from './variables';

export const Mutation = {
  fields: {
    logIn: {
      merge(_, incoming, { args }) {
        if (args.set_token !== false) {
          varToken(incoming);
        }
        return incoming;
      },
    },
  },
};
