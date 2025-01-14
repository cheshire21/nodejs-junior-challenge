/**
 * @typedef {Object} Call
 * @property {string} identifier - Call's identifier
 * @property {string} type - Call's type
 * @property {number} duration - Call's duration
 */

/**
 * @typedef {Object} ProcessedCall
 * @property {string} identifier - Call's identifier
 * @property {string} type - Call's type
 * @property {number} duration - Call's duration
 * @property {number} callCost - Call's cost
 */

/**
 * @typedef {Object} CallsResponse
 * @property {number} totalCalls - Number of processed calls
 * @property {number} total - Total to pay including all the processed calls
 * @property {ProcessedCall[]} callsDetails - Processed information about calls
 */

function calculate(duration, additionalCost, firstminutes = 0, cost = 0) {
  let amount = Math.min(duration, firstminutes) * cost;
  if (duration > firstminutes) {
    amount += (duration - firstminutes) * additionalCost;
  }
  return amount;
}
function ProcessedCall(call) {
  let amount = 0;
  const { duration } = call;
  switch (call.type) {
    case 'International':
      amount = calculate(duration, 3.03, 3, 7.56);
      break;
    case 'National':
      amount = calculate(duration, 0.48, 3, 1.2);
      break;
    case 'Local':
      amount = calculate(duration, 0.2);
      break;
    default:
      return null;
  }
  return amount;
}

/** 
 * Design a solution to calculate what to pay for a set of phone calls. The function must receive an 
 * array of objects that will contain the identifier, type and duration attributes. For the type attribute, 
 * the only valid values are: National, International and Local
 * 
 * The criteria for calculating the cost of each call is as follows:
 * 
 * International: first 3 minutes $ 7.56 -> $ 3.03 for each additional minute
 * National: first 3 minutes $ 1.20 -> $ 0.48 per additional minute
 * Local: $ 0.2 per minute.
 * 
 * The function must return the total calls, the details of each call (the detail received + the cost of the call) 
 * and the total to pay taking into account all calls
 * 
 * @param {Call[]} calls - Call's information to be processed
 * 
 * @returns {CallsResponse}  - Processed information
*/
    
function callsCost(calls) {
  let prices = 0;
  const details = calls.map((item) => {
    const price = ProcessedCall(item);
    prices += price;
    return price ? {
      ...item,
      cost: +price.toFixed(2),
    } : null;
  }).filter((item) => item);
    
  return {
    totalCalls: details.length,
    callsDetails: details,
    total: +prices.toFixed(2),
  };
}

module.exports = callsCost;
