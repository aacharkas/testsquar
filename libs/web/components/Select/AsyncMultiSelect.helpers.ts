export const convertAsyncData = ({
  responsePathToArray,
  previousData,
  skipElements,
  responseIdName,
  responseNameName,
  numberRequestElements,
  loadRequest,
  setSkipElements,
  numberShowToUser,
  defaultValueNeeded,
  data,
  convertHelpFunction,
  removeIds,
  query,
}) => {
  // get totalAmount
  const totalAmount =
    data?.[responsePathToArray]?.totalCount ||
    previousData?.[responsePathToArray]?.totalCount;
  // get arrays of data
  const previousDataArray = previousData?.[responsePathToArray]?.rows ?? [];
  const currentDataArray = data?.[responsePathToArray]?.rows ?? [];
  // get array to process (concatenation of old and new data)
  let processValue = [];
  if (skipElements > 0) {
    processValue = [...previousDataArray, ...currentDataArray];
  } else {
    processValue = data ? currentDataArray : previousDataArray;
  }
  // formate data for async select
  let resultArray = processValue.map((item) => ({
    id: item?.[responseIdName],
    name: item?.[responseNameName],
  }));
  // remove already used values from array
  if (removeIds) {
    resultArray = resultArray.filter((item) => !removeIds.includes(item?.id));
  }
  // load new data if user used data that list contain less than 5 elements
  if (
    resultArray.length < 5 &&
    totalAmount >= skipElements + numberRequestElements &&
    !loadRequest
  ) {
    setSkipElements(skipElements + numberRequestElements);
  }
  // return to user only some elements
  resultArray = resultArray.slice(0, numberShowToUser);
  if (!resultArray.length && query) {
    defaultValueNeeded = '';
  }
  if (defaultValueNeeded) {
    resultArray.unshift({ id: 0, name: defaultValueNeeded });
  }
  // apply custom convert function if provided
  if (convertHelpFunction) {
    return convertHelpFunction(resultArray);
  } else {
    return resultArray;
  }
};
