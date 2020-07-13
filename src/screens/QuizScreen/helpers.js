import _ from "lodash";

export function checkIfChoiceIsCorrect(isChoiceCorrect) {
  // If a check has not been made, the param will be undefined, so return null.
  // Otherwise return whether the choice is correct or not.
  return _.isUndefined(isChoiceCorrect) ? null : isChoiceCorrect;
}
