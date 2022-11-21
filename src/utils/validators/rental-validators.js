const { isUUID, isFloat, isInt, matches } = require('validator');
const id = (input) => {
  if (!isString(input)) {
    return false;
  } else {
    return isUUID(input, 4);
  }
};

const integer = (input) => {
  if (!input || isString(input)) {
    return false;
  } else {
    return isInt(input.toString());
  }
};
const float = (input) => {
  if (!input || isString(input)) {
    return false;
  } else {
    return isFloat(input.toString());
  }
};
const isString = (input) => {
  return (
    typeof input === 'string' &&
    Object.prototype.toString.call(input) === '[object String]'
  );
};
const isArray = (input) => {
  return (
    typeof input === 'object' &&
    Object.prototype.toString.call(input) === '[object Array]'
  );
};
const isSort = (input) => {
  if (isString(input) && (input === 'desc' || input === 'asc')) {
    return true;
  }
};
const rental = (data) => {
  if (!data) {
    return {
      valid: false,
      message: "Field 'data' must be sent properly",
    };
  }
  if (!(data.type && isString(data.type))) {
    return {
      valid: false,
      message: "Field 'type' must be provived as string",
    };
  }
  if (!(data.brand && isString(data.brand))) {
    return {
      valid: false,
      message: "Field 'brand' must be provided as string",
    };
  }
  if (!(data.model && isString(data.model))) {
    return {
      valid: false,
      message: "Field 'model' must be provided as string",
    };
  }
  if (!(data.year && integer(data.year))) {
    return {
      valid: false,
      message: "Field 'year' must be provided as integer",
    };
  }
  if (!(data.travelled && integer(data.travelled))) {
    return {
      valid: false,
      message: "Field 'travelled' must be provided as int",
    };
  }
  if (!(data.plate && isString(data.plate))) {
    return {
      valid: false,
      message: "Field 'plate' must be provided as String",
    };
  }
  if (!(data.priceMonthly && float(data.priceMonthly))) {
    return {
      valid: false,
      message: "Field 'priceMonthly' must be provided as float",
    };
  }
  if (!(data.priceDayly && float(data.priceDayly))) {
    return {
      valid: false,
      message: "Field 'priceDayly' must be provided as Float",
    };
  }
  return {
    valid: true,
  };
};

//filter & sort validators
const sort = (sort, data) => {
  if (!data) {
    sort.push({ brand: 'desc' });
    return false;
  }
  if (Object.keys(data).length !== 0) {
    if (data.brand) {
      if (isSort(data.brand)) sort.push({ brand: data.brand });
    } else {
      sort.push({ brand: 'desc' });
    }
    if (data.model) {
      if (isSort(data.model)) sort.push({ model: data.model });
    }
    if (data.year) {
      if (isSort(data.year)) sort.push({ year: data.year });
    }
    if (data.priceMonthly) {
      if (isSort(data.priceMonthly))
        sort.push({ priceMonthly: data.priceMonthly });
    }
    if (data.priceDayly) {
      if (isSort(data.priceDayly)) sort.push({ priceDayly: data.priceDayly });
    }
  } else {
    sort.push({ brand: 'desc' });
  }
  return sort;
};

const filter = (filter, data) => {
  if (!data) return false;

  if (isArray(data.type)) filter.push({ type: { in: data.type } });

  if (isArray(data.brand)) filter.push({ brand: { in: data.brand } });

  if (isArray(data.model)) filter.push({ model: { in: data.model } });

  if (isArray(data.year)) filter.push({ year: { in: data.year } });

  if (isFloat(data.yearLT.toString()))
    filter.push({ year: { lte: data.yearLT } });

  if (isFloat(data.yearGT.toString()))
    filter.push({ year: { gte: data.yearGT } });

  if (isFloat(data.priceMonthlyLT.toString()))
    filter.push({ priceMonthly: { lte: data.priceMonthlyLT } });

  if (isFloat(data.priceMonthlyGT.toString()))
    filter.push({ priceMonthly: { gte: data.priceMonthlyGT } });

  if (isFloat(data.priceDaylyLT.toString()))
    filter.push({ priceDayly: { lte: data.priceDaylyLT } });

  if (isFloat(data.priceDaylyGT.toString()))
    filter.push({ priceDayly: { gte: data.priceDaylyGT } });

  return filter;
};
module.exports = {
  id,
  float,
  integer,
  rental,
  filter,
  sort,
};
// const licencePlate = (input) => {
//   if (!isString(input)) {
//     return false;
//   } else {
//     const re = new RegExp(
//       '/^(0[1-9]|[1-7][0-9]|8[01])(([A-PR-VYZ])(\\d{4,5})|([A-PR-VYZ]{2})(\\d{3,4})|([A-PR-VYZ]{3})(\\d{2,3}))$/'
//     );
//     return re.test(input.toUpperCase());
//   }
// };
