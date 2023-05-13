import { tokenService } from './tokenService';

export const resetService = () => {
  tokenService.updateLocalTokenData('');
  // tokenService.updateLocalTokenData('', 'refresh_token');
  window.location.replace('/');
  // window.location.reload()
};
