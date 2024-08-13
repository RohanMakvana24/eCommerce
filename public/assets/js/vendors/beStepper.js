"use strict";
function elementExists(e) {
  return null !== document.querySelector(e);
}
var stepperForm;
elementExists("#stepperForm") &&
  document.addEventListener("DOMContentLoaded", function () {
    stepperForm = new Stepper(document.querySelector("#stepperForm"), {
      linear: !1,
      animation: !0,
    });
  });
