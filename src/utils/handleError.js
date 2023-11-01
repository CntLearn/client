import Toaster from './Toaster';

function HandleError(err) {
  console.log('err in action  : ', err)
  const errorMessage = `Server Error: ${ err?.response?.data.error.message ? err?.response?.data.error.message : err?.message }` || 'Some Error occurred in the server';
  Toaster(errorMessage, 'error');
}

export default HandleError