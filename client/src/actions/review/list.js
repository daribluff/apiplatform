import fetch from '../../utils/fetch';

export function error(error) {
  return {type: 'REVIEW_LIST_ERROR', error};
}

export function loading(loading) {
  return {type: 'REVIEW_LIST_LOADING', loading};
}

export function success(data) {
  return {type: 'REVIEW_LIST_SUCCESS', data};
}

export function list(page = '/reviews') {
  return (dispatch) => {
    dispatch(loading(true));
    dispatch(error(''));

    fetch(page)
      .then(response => response.json())
      .then(data => {
        dispatch(loading(false));
        dispatch(success(data));
      })
      .catch(e => {
        dispatch(loading(false));
        dispatch(error(e.message))
      });
  };
}

export function reset() {
  return {type: 'REVIEW_LIST_RESET'};
}
