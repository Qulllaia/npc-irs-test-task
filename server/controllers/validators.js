const NUMBER_TYPE = "number";

function validateNumberType(value) {
  if (typeof value === NUMBER_TYPE) {
    return true;
  }
  return false;
}

function dataCheck(data, NECESSARY_DATA) {
  for (let param of NECESSARY_DATA) {
    if (!Object.keys(data).includes(param) || !data[param])
      return `Отсутствует необходимый параметр - ${param}`;
  }
  return;
}

module.exports = { validateNumberType, dataCheck };
