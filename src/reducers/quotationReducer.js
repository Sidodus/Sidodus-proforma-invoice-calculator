import {
  GET_QUOTATIONS,
  GET_EDIT_QUOTATION,
  GET_PROFORMA_INVOICE,
  GET_CURRENCY,
  GET_EXCHANGE_RATE,
  NAIRA_EXCHANGE_RATE,
  DOLLAR_EXCHANGE_RATE,
  ADD_QUOTATION,
  CLEAR_ALL_QUOTATIONS,
  ADD_PROFORMA_INVOICE,
  ADD_CURRENCY,
  ADD_EXCHANGE_RATE,
  UPDATE_QUOTATION,
  DELETE_QUOTATION
} from "../actions/types";

const initialState = {
  quotations: [],
  proformaInvoice: {},
  currency: {},
  exchangeRate: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUOTATIONS:
      return {
        ...state,
        quotations: action.payload
      };
    case GET_EDIT_QUOTATION:
      return {
        ...state,
        quotations: action.payload
      };
    case GET_PROFORMA_INVOICE:
      return {
        ...state,
        proformaInvoice: action.payload
      };
    case GET_CURRENCY:
      return {
        ...state,
        currency: action.payload
      };
    case GET_EXCHANGE_RATE:
      return {
        ...state,
        exchangeRate: action.payload
      };
    case NAIRA_EXCHANGE_RATE:
      return {
        ...state,
        quotations: action.payload
      };
    case DOLLAR_EXCHANGE_RATE:
      return {
        ...state,
        quotations: action.payload
      };
    case ADD_QUOTATION:
      return {
        ...state,
        quotations: action.payload
      };
    case CLEAR_ALL_QUOTATIONS:
      return {
        ...state,
        quotations: action.payload
      };
    case ADD_PROFORMA_INVOICE:
      return {
        ...state,
        proformaInvoice: action.payload
      };
    case ADD_CURRENCY:
      return {
        ...state,
        currency: action.payload
      };
    case ADD_EXCHANGE_RATE:
      return {
        ...state,
        exchangeRate: action.payload
      };
    case UPDATE_QUOTATION:
      return {
        ...state,
        quotations: action.payload
      };
    case DELETE_QUOTATION:
      return {
        ...state,
        quotations: action.payload
      };
    default:
      return state;
  }
}
