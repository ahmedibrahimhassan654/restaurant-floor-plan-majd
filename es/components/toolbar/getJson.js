"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getJson = exports.getJson = function getJson(file) {
  try {
    var response = fetch("https://pos.pspservicesco.com/storage/restaurant-planner/restaurant-planner-13.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    var data = response.json();
    console.log("data", data);
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }
};