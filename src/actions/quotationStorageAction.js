export const getStorageQuotations = () => {
  // Check  If Quotations Exist
  if (
    localStorage.getItem("quotations") === null ||
    localStorage.getItem("quotations") === ""
  ) {
    localStorage.setItem("quotations", JSON.stringify([]));
  }

  if (
    localStorage.getItem("quotations_length") === null ||
    localStorage.getItem("quotations_length") === ""
  ) {
    localStorage.setItem("quotations_length", JSON.stringify(0));
  }

  // Get All Quotations
  const data = JSON.parse(localStorage.getItem("quotations"));

  //  Save Length Of Quotations
  localStorage.setItem("quotations_length", JSON.stringify(data.length));

  return data;
};

export const getStorageProformaInvoice = () => {
  const nullInvoice = {
    totalQuoteAmount: Number(),
    lpoItemName: "",
    totalJobUnit: Number(),
    serviceCharge: Number(),
    vat: Number()
  };
  // Check  If Proforma Invoice Exist
  if (
    localStorage.getItem("proforma_invoice") === null ||
    localStorage.getItem("proforma_invoice") === "" ||
    localStorage.getItem("proforma_invoice") === undefined
  ) {
    localStorage.setItem("proforma_invoice", JSON.stringify(nullInvoice));
  }

  // Get Proforma Invoice
  const data = JSON.parse(localStorage.getItem("proforma_invoice"));

  return data;
};

export const get_EditStorageQuotation = site_ID => {
  const quotations = getStorageQuotations();
  // Filter Out Todo
  const newQuotations = quotations.filter(
    quotation => quotation.id === site_ID
  );

  return newQuotations;
};

export const addStorageQuotation = newTask => {
  const data = getStorageQuotations();
  // Add New Task To List
  data.push(newTask);
  // Save To Storage
  localStorage.setItem("quotations", JSON.stringify(data));

  return data;
};

export const clearAllStorageQuotations = () => {
  localStorage.setItem("quotations", JSON.stringify([]));
  localStorage.setItem("quotations_length", JSON.stringify(0));

  const data = JSON.parse(localStorage.getItem("quotations"));
  return data;
};

export const addStorageProformaInvoice = proforma => {
  localStorage.setItem("proforma_invoice", JSON.stringify(proforma));

  // return proforma;
};

export const updateStorageQuotation = newTask => {
  const quotations = getStorageQuotations();
  const data = quotations.filter(quotation => quotation.id !== newTask.id);
  // Add New Task To List
  data.push(newTask);
  // Save To Storage
  localStorage.setItem("quotations", JSON.stringify(data));
  //  Save New Length Of Todo
  localStorage.setItem("quotations_length", JSON.stringify(data.length));

  return data;
};

export const deleteStorageQuotation = id => {
  const quotations = getStorageQuotations();
  const data = quotations.filter(quotation => quotation.id !== id);
  localStorage.setItem("quotations", JSON.stringify(data));
  //  Save New Length Of Todo
  localStorage.setItem("quotations_length", JSON.stringify(data.length));

  return data;
};
