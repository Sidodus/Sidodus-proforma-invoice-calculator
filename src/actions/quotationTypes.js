import {
  GET_QUOTATIONS,
  GET_EDIT_QUOTATION,
  GET_PROFORMA_INVOICE,
  ADD_QUOTATION,
  CLEAR_ALL_QUOTATIONS,
  ADD_PROFORMA_INVOICE,
  UPDATE_QUOTATION,
  DELETE_QUOTATION
} from "./types";

import {
  getStorageQuotations,
  get_EditStorageQuotation,
  addStorageQuotation,
  clearAllStorageQuotations,
  updateStorageQuotation,
  deleteStorageQuotation,
  addStorageProformaInvoice,
  getStorageProformaInvoice
} from "./quotationStorageAction";

export const getQuotations = () => async dispatch => {
  // Get Quotations From Storage & Push To State
  const res = await getStorageQuotations();
  dispatch({
    type: GET_QUOTATIONS,
    payload: res
  });
};

export const getProformaInvoice = () => async dispatch => {
  // Get Quotations From Storage & Push To State
  const res = await getStorageProformaInvoice();
  dispatch({
    type: GET_PROFORMA_INVOICE,
    payload: res
  });
};

export const get_editQuotation = quotation => async dispatch => {
  // Get & Edit Quotation From Storage & State
  const res = await get_EditStorageQuotation(quotation.id);
  dispatch({
    type: GET_EDIT_QUOTATION,
    payload: res
  });
};

export const addQuotation = quotation => async dispatch => {
  // Add Quotation To Storage & State
  const res = await addStorageQuotation(quotation);
  dispatch({
    type: ADD_QUOTATION,
    payload: res
  });
};

export const clearAllQuotations = () => dispatch => {
  // Add Quotation To Storage & State
  const res = clearAllStorageQuotations();
  dispatch({
    type: CLEAR_ALL_QUOTATIONS,
    payload: res
  });
};

export const addProformaInvoice = proforma => async dispatch => {
  // Add Proforma Invoice To Storage & State
  addStorageProformaInvoice(proforma);

  dispatch({
    type: ADD_PROFORMA_INVOICE,
    payload: proforma
  });
};

export const updateQuotation = quotation => async dispatch => {
  // Update Quotation In Storage & State
  const res = await updateStorageQuotation(quotation);
  dispatch({
    type: UPDATE_QUOTATION,
    payload: res
  });
};

export const deleteQuotation = id => async dispatch => {
  // Delete Quotation From Storage & State
  const res = await deleteStorageQuotation(id);
  dispatch({
    type: DELETE_QUOTATION,
    payload: res
  });
};
