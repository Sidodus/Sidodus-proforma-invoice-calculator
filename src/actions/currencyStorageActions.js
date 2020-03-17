import { getStorageQuotations } from "./quotationStorageAction";
import { JSnumberToWordProcessor } from "../components/JSnumberToWordProcessor/JSnumberToWordProcessor";

export const getStorageCurrency = () => {
  if (localStorage.getItem("currency") === null) {
    localStorage.setItem(
      "currency",
      JSON.stringify({
        senior: "Naira",
        junior: "kobo",
        sign: "₦",
        abbrevation: "NGN"
      })
    );
  }

  const data = JSON.parse(localStorage.getItem("currency"));

  return data;
};

export const getStorageExchangeRate = () => {
  if (localStorage.getItem("exchange_rate") === null) {
    localStorage.setItem(
      "exchange_rate",
      JSON.stringify({ naira: 365, dollar: 1 })
    );
  }

  const data = JSON.parse(localStorage.getItem("exchange_rate"));

  return data;
};

export const calculateNairaStorageExchangeRate = exchangeRate => {
  const getAllQuotation = getStorageQuotations();

  const quotationExchangeRate = getAllQuotation.map(quotations => ({
    id: quotations.id,
    itemName: quotations.itemName,
    itemDescription: quotations.itemDescription,
    itemUnit: quotations.itemUnit,
    itemPrice:
      JSnumberToWordProcessor(
        String(
          Number(quotations.itemPrice).toFixed(2) *
            Number(exchangeRate).toFixed(2)
        )
      ).length === 2
        ? JSnumberToWordProcessor(
            String(
              Number(quotations.itemPrice).toFixed(2) *
                Number(exchangeRate).toFixed(2)
            )
          )[0].displayNum +
          "." +
          JSnumberToWordProcessor(
            String(
              (
                Number(quotations.itemPrice).toFixed(2) *
                Number(exchangeRate).toFixed(2)
              ).toFixed(2) // toFixed(2) here to format decimal
            )
          )[1].displayNum
        : JSnumberToWordProcessor(
            String(
              Number(quotations.itemPrice).toFixed(2) *
                Number(exchangeRate).toFixed(2)
            )
          )[0].displayNum
  }));
  const newQuotationExchangeRate = quotationExchangeRate.map(quotations => ({
    id: quotations.id,
    itemName: quotations.itemName,
    itemDescription: quotations.itemDescription,
    itemUnit: quotations.itemUnit,
    itemPrice: quotations.itemPrice.split(",").reduce((acc, arr) => {
      return acc + arr;
    })
  }));

  localStorage.setItem("quotations", JSON.stringify(newQuotationExchangeRate));

  return newQuotationExchangeRate;
};

export const calculateDollarStorageExchangeRate = exchangeRate => {
  const getAllQuotation = getStorageQuotations();

  const quotationExchangeRate = getAllQuotation.map(quotations => ({
    id: quotations.id,
    itemName: quotations.itemName,
    itemDescription: quotations.itemDescription,
    itemUnit: quotations.itemUnit,
    itemPrice:
      JSnumberToWordProcessor(
        String(
          Number(quotations.itemPrice).toFixed(2) /
            Number(exchangeRate).toFixed(2)
        )
      ).length === 2
        ? JSnumberToWordProcessor(
            String(
              Number(quotations.itemPrice).toFixed(2) /
                Number(exchangeRate).toFixed(2)
            )
          )[0].displayNum +
          "." +
          JSnumberToWordProcessor(
            String(
              (
                Number(quotations.itemPrice).toFixed(2) /
                Number(exchangeRate).toFixed(2)
              ).toFixed(2) // toFixed(2) here to format decimal
            )
          )[1].displayNum
        : JSnumberToWordProcessor(
            String(
              Number(quotations.itemPrice).toFixed(2) /
                Number(exchangeRate).toFixed(2)
            )
          )[0].displayNum
  }));

  const newQuotationExchangeRate = quotationExchangeRate.map(quotations => ({
    id: quotations.id,
    itemName: quotations.itemName,
    itemDescription: quotations.itemDescription,
    itemUnit: quotations.itemUnit,
    itemPrice: quotations.itemPrice.split(",").reduce((acc, arr) => {
      return acc + arr;
    })
  }));

  localStorage.setItem("quotations", JSON.stringify(newQuotationExchangeRate));

  return newQuotationExchangeRate;
};

export const addStorageCurrency = currency => {
  localStorage.setItem(
    "currency",
    JSON.stringify({
      senior: currency.senior,
      junior: currency.junior,
      sign: currency.sign,
      abbrevation: currency.abbrevation
    })
  );
};

export const addStorageExchangeRate = exchageRate => {
  localStorage.setItem(
    "exchange_rate",
    JSON.stringify({
      naira: exchageRate.naira,
      dollar: exchageRate.dollar
    })
  );
};

export const toggleStorageExchangeRateForm = () => {
  if (localStorage.getItem("toggle_exchange_rate_form") === null) {
    localStorage.setItem("toggle_exchange_rate_form", JSON.stringify(false));
  }

  const data = JSON.parse(localStorage.getItem("toggle_exchange_rate_form"));

  return data;
};

export const toggleStorageForm2 = () => {
  if (localStorage.getItem("toggle_form2") === null) {
    localStorage.setItem("toggle_form2", JSON.stringify(false));
  }

  const data = JSON.parse(localStorage.getItem("toggle_form2"));

  return data;
};
