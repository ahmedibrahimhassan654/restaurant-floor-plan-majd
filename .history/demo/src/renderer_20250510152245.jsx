import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ContainerDimensions from "react-container-dimensions";
import Immutable, { Map } from "immutable";
import immutableDevtools from "immutable-devtools";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "./index.css";

import MyCatalog from "./catalog/mycatalog";

import ToolbarScreenshotButton from "./ui/toolbar-screenshot-button";
import { Toaster } from "react-hot-toast";
import {
  Models as PlannerModels,
  reducer as PlannerReducer,
  ReactPlanner,
  Plugins as PlannerPlugins,
} from "react-planner"; //react-planner

// Define isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//define stateS
let AppState = Map({
  "react-planner": new PlannerModels.State(),
});

//define reducer
let reducer = (state, action) => {
  state = state || AppState;
  state = state.update("react-planner", (plannerState) =>
    PlannerReducer(plannerState, action)
  );
  return state;
};

let blackList =
  isProduction === true
    ? []
    : ["UPDATE_MOUSE_COORDS", "UPDATE_ZOOM_SCALE", "UPDATE_2D_CAMERA"];

if (!isProduction) {
  console.info(
    "Environment is in development and these actions will be blacklisted",
    blackList
  );
  console.info("Enable Chrome custom formatter for Immutable pretty print");
  immutableDevtools(Immutable);
}

//init store
let store = createStore(
  reducer,
  null,
  !isProduction && window.devToolsExtension
    ? window.devToolsExtension({
        features: {
          pause: true, // start/pause recording of dispatched actions
          lock: true, // lock/unlock dispatching actions and side effects
          persist: true, // persist states on page reloading
          export: true, // export history of actions in a file
          import: "custom", // import history of actions from a file
          jump: true, // jump back and forth (time travelling)
          skip: true, // skip (cancel) actions
          reorder: true, // drag and drop actions in the history list
          dispatch: true, // dispatch custom actions or action creators
          test: true, // generate tests for the selected actions
        },
        actionsBlacklist: blackList,
        maxAge: 999999,
      })
    : (f) => f
);

let plugins = [
  PlannerPlugins.Keyboard(),
  PlannerPlugins.Autosave("react-planner_v0"),
  PlannerPlugins.ConsoleDebugger(),
];

let toolbarButtons = [ToolbarScreenshotButton];
// const urlParams = new URLSearchParams(window.location.search);

// const restaurant = urlParams.get("restaurant");
// // const domain = urlParams.get("domain");
// console.log("restaurant", restaurant);

// const axiosInstance = axios.create({
//   baseURL: `https://pos.pspservicesco.com/api/v1/restaurant/planner`,
// });

// const getPlanner = () => {
//   axiosInstance.get(`/get?restaurant_id=${restaurant}`).then((res) => {
//     console.log("res", res);
//   });
// };
// useEffect(() => {
//   getPlanner();
// }, []);

//render
ReactDOM.render(
  <React.Fragment>
    <Toaster />
    <Provider store={store}>
      <ContainerDimensions>
        {({ width, height }) => (
          <ReactPlanner
            catalog={MyCatalog}
            width={width}
            height={height}
            plugins={plugins}
            toolbarButtons={toolbarButtons}
            stateExtractor={(state) => state.get("react-planner")}
          />
        )}
      </ContainerDimensions>
    </Provider>
  </React.Fragment>,
  document.getElementById("app")
);
