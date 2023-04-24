import { tokenService } from './tokenService';

export const resetService = () => {
  tokenService.updateLocalTokenData('', 'access_token');
  tokenService.updateLocalTokenData('', 'refresh_token');
  window.location.replace('/');
};
