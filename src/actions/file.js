import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export const {
  upload,
  changePhoto,
} = createActions({
  [ActionTypes.UPLOAD]: (data) => (data),
  [ActionTypes.CHANGE_PHOTO]: (data) => (data),
});