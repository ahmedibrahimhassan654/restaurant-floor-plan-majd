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

// Define isProduction variable with a fallback
const isProduction = false; // Force development mode for now

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

let blackList = ["UPDATE_MOUSE_COORDS", "UPDATE_ZOOM_SCALE", "UPDATE_2D_CAMERA"];

console.info(
  "Environment is in development and these actions will be blacklisted",
  blackList
);
console.info("Enable Chrome custom formatter for Immutable pretty print");
immutableDevtools(Immutable);

// Simplified store creation
let store = createStore(reducer);

let plugins = [
  PlannerPlugins.Keyboard(),
  PlannerPlugins.Autosave("react-planner_v0"),
  PlannerPlugins.ConsoleDebugger(),
];

let toolbarButtons = [ToolbarScreenshotButton];

// Try a simple render first to test if React is working
ReactDOM.render(
  <div style={{padding: 20, color: 'red', fontSize: 24}}>
    Loading React Planner...
  </div>,
  document.getElementById("app")
);

// Then render the full application after a short delay
setTimeout(() => {
  ReactDOM.render(
    <React.Fragment>
      <Toaster />
      <Provider store={store}>
        <ContainerDimensions>
        <>
          <div style={{padding: 20, color:'red', fontSize: 24}}>
            React Planner is ready!
          </div>
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
          </>
        </ContainerDimensions>
      </Provider>
    </React.Fragment>,
    document.getElementById("app")
  );
}, 1000);
