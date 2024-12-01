import {AxiosError} from 'axios';

import restClient from '../client/rest';
import {notifiError} from '../toast';

export const interceptor = () => {
  restClient.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        notifiError(
          'Response error',
          `${
            (error.response?.data as {status_message?: string})
              ?.status_message ?? 'Unknown error'
          }`,
        );
        console.error(
          'Response error:',
          error.response.status,
          error.response.data,
        );
      } else if (error.request) {
        // The request was made but no response was received
        notifiError(
          'Request error',
          'We have encountered an issue with your request',
        );

        console.error('Request error:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        notifiError('Err', error.request.data as string);
        console.error('Error:', error.message);
      }

      return Promise.reject(error);
    },
  );
};
