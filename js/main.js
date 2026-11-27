import {getData} from './api.js';
import {renderPictures} from './pictures.js';
import {showDataError} from './messages.js';
import './upload-form.js';

const initApp = async () => {
  try {
    const photos = await getData();
    renderPictures(photos);
  } catch (err) {
    showDataError(err.message);
  }
};

initApp();
