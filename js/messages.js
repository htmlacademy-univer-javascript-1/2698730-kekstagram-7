import {isEscapeKey} from './util.js';

const DATA_ERROR_SHOW_TIME = 5000;

const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');

let messageElement = null;

const isMessageShown = () => messageElement !== null;

const closeMessage = () => {
  messageElement.removeEventListener('click', onMessageClick);
  messageElement.remove();
  messageElement = null;

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onMessageClick(evt) {
  if (evt.target === messageElement || evt.target.matches('button')) {
    closeMessage();
  }
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

const showMessage = (templateElement) => {
  messageElement = templateElement.cloneNode(true);
  messageElement.addEventListener('click', onMessageClick);
  document.body.append(messageElement);

  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccessMessage = () => {
  showMessage(successTemplateElement);
};

const showErrorMessage = () => {
  showMessage(errorTemplateElement);
};

const showDataError = (message) => {
  const dataErrorElement = document.createElement('div');
  dataErrorElement.classList.add('data-error');
  dataErrorElement.textContent = message;
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, DATA_ERROR_SHOW_TIME);
};

export {showSuccessMessage, showErrorMessage, showDataError, isMessageShown};
