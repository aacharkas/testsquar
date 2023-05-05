export const fillDates = (dates) => {
  let dateOfLossFrom = undefined,
    dateOfLossTo = undefined;
  if (dates.dateFrom) {
    dateOfLossFrom = new Date(dates.dateFrom).toISOString();
  }
  if (dates.dateTo) {
    dateOfLossTo = new Date(dates.dateTo).toISOString();
  }
  return {
    dateOfLossFrom,
    dateOfLossTo,
  };
};

export const fillCustomers = (customers) => {
  let res = [];
  const array = customers?.map((item) => item.id);
  if (array?.includes(0)) {
    return [];
  } else {
    array?.map((item) => {
      if (item) {
        res.push(item);
      } else {
        res = [];
      }
    });
    return Array.from(new Set(res));
  }
};

export const fillInsuranceCarriers = (carriers) => {
  let res = [];
  const array = carriers?.map((item) => item.id);
  if (array?.includes(0)) {
    return [];
  } else {
    array?.map((item) => {
      if (item) {
        res.push(item);
      } else {
        res = [];
      }
    });
    return Array.from(new Set(res));
  }
};
