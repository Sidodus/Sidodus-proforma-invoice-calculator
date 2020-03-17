import {
  GET_CURRENCY,
  ADD_CURRENCY,
  GET_EXCHANGE_RATE,
  ADD_EXCHANGE_RATE,
  NAIRA_EXCHANGE_RATE,
  DOLLAR_EXCHANGE_RATE
} from "./types";
import {
  getStorageExchangeRate,
  getStorageCurrency,
  addStorageCurrency,
  addStorageExchangeRate,
  calculateNairaStorageExchangeRate,
  calculateDollarStorageExchangeRate
} from "./currencyStorageActions";

export const getCurrency = () => async dispatch => {
  // Get Quotations From Storage & Push To State
  const res = await getStorageCurrency();
  dispatch({
    type: GET_CURRENCY,
    payload: res
  });
};

export const getExchangeRate = () => async dispatch => {
  // Get Quotations From Storage & Push To State
  const res = await getStorageExchangeRate();
  dispatch({
    type: GET_EXCHANGE_RATE,
    payload: res
  });
};

export const addCurrency = currency => async dispatch => {
  // Add Proforma Invoice To Storage & State
  addStorageCurrency(currency);

  dispatch({
    type: ADD_CURRENCY,
    payload: currency
  });
};

export const addExchangeRate = exchangeRate => async dispatch => {
  // Add Proforma Invoice To Storage & State
  addStorageExchangeRate(exchangeRate);

  dispatch({
    type: ADD_EXCHANGE_RATE,
    payload: exchangeRate
  });
};

export const calculateNairaExchangeRate = (ngn, usd) => async dispatch => {
  let exchangeRate;
  if (ngn > usd) {
    exchangeRate = ngn / usd;
  } else if (usd > ngn) {
    exchangeRate = usd / ngn;
  }
  // Add Proforma Invoice To Storage & State
  const res = calculateNairaStorageExchangeRate(exchangeRate);
  dispatch({
    type: NAIRA_EXCHANGE_RATE,
    payload: res
  });
};

export const calculateDollarExchangeRate = (ngn, usd) => async dispatch => {
  let exchangeRate;
  if (ngn > usd) {
    exchangeRate = ngn / usd;
  } else if (usd > ngn) {
    exchangeRate = usd / ngn;
  }
  // Add Proforma Invoice To Storage & State
  const res = calculateDollarStorageExchangeRate(exchangeRate);
  dispatch({
    type: DOLLAR_EXCHANGE_RATE,
    payload: res
  });
};
