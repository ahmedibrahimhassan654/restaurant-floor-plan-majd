import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MdSettings, MdUndo, MdDirectionsRun } from "react-icons/md";
import { FaFile, FaMousePointer, FaPlus } from "react-icons/fa";
import ToolbarButton from "./toolbar-button";
import ToolbarSaveButton from "./toolbar-save-button";
import ToolbarLoadButton from "./toolbar-load-button";
import If from "../../utils/react-if";
import Cat from "./Cat.json";
import {
  MODE_IDLE,
  MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON,
  MODE_VIEWING_CATALOG,
  MODE_CONFIGURING_PROJECT,
} from "../../constants";
import * as SharedStyle from "../../shared-style";
import axios from "axios";
import { getJson } from "./getJson";
import { APIURL } from "../../../demo/src/APIURL";

const iconTextStyle = {
  fontSize: "19px",
  textDecoration: "none",
  fontWeight: "bold",
  margin: "0px",
  userSelect: "none",
};

const Icon2D = ({ style }) => <p style={{ ...iconTextStyle, ...style }}>2D</p>;
const Icon3D = ({ style }) => <p style={{ ...iconTextStyle, ...style }}>3D</p>;

const ASIDE_STYLE = {
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  padding: "10px",
};

const sortButtonsCb = (a, b) => {
  if (a.index === undefined || a.index === null) {
    a.index = Number.MAX_SAFE_INTEGER;
  }

  if (b.index === undefined || b.index === null) {
    b.index = Number.MAX_SAFE_INTEGER;
  }

  return a.index - b.index;
};

const mapButtonsCb = (el, ind) => {
  return (
    <If key={ind} condition={el.condition} style={{ position: "relative" }}>
      {el.dom}
    </If>
  );
};

const Toolbar = (
  { state, width, height, toolbarButtons, allowProjectFileSupport },
  context
) => {
  const { projectActions, viewer3DActions, translator } = context;
  let mode = state.get("mode");
  let alterate = state.get("alterate");
  let alterateColor = alterate ? SharedStyle.MATERIAL_COLORS[500].orange : "";

  let sorter = [
    // {
    //   index: 0,
    //   condition: allowProjectFileSupport,
    //   dom: (
    //     <ToolbarButton
    //       active={false}
    //       tooltip={translator.t("New project")}
    //       onClick={(event) =>
    //         confirm(translator.t("Would you want to start a new Project?"))
    //           ? projectActions.newProject()
    //           : null
    //       }
    //     >
    //       <FaFile />
    //     </ToolbarButton>
    //   ),
    // },
    {
      index: 1,
      condition: allowProjectFileSupport,
      dom: <ToolbarSaveButton state={state} />,
    },
    // {
    //   index: 2,
    //   condition: allowProjectFileSupport,
    //   dom: <ToolbarLoadButton state={state} />,
    // },
    {
      index: 3,
      condition: true,
      dom: (
        <ToolbarButton
          active={[MODE_VIEWING_CATALOG].includes(mode)}
          tooltip={translator.t("Open catalog")}
          onClick={(event) => projectActions.openCatalog()}
        >
          <FaPlus />
        </ToolbarButton>
      ),
    },
    // {
    //   index: 4,
    //   condition: true,
    //   dom: (
    //     <ToolbarButton
    //       active={[MODE_3D_VIEW].includes(mode)}
    //       tooltip={translator.t("3D View")}
    //       onClick={(event) => viewer3DActions.selectTool3DView()}
    //     >
    //       <Icon3D />
    //     </ToolbarButton>
    //   ),
    // },
    // {
    //   index: 5,
    //   condition: true,
    //   dom: (
    //     <ToolbarButton
    //       active={[MODE_IDLE].includes(mode)}
    //       tooltip={translator.t("2D View")}
    //       onClick={(event) => projectActions.setMode(MODE_IDLE)}
    //     >
    //       {[MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode) ? (
    //         <Icon2D style={{ color: alterateColor }} />
    //       ) : (
    //         <FaMousePointer style={{ color: alterateColor }} />
    //       )}
    //     </ToolbarButton>
    //   ),
    // },
    // {
    //   index: 6,
    //   condition: true,
    //   dom: (
    //     <ToolbarButton
    //       active={[MODE_3D_FIRST_PERSON].includes(mode)}
    //       tooltip={translator.t("3D First Person")}
    //       onClick={(event) => viewer3DActions.selectTool3DFirstPerson()}
    //     >
    //       <MdDirectionsRun />
    //     </ToolbarButton>
    //   ),
    // },
    {
      index: 7,
      condition: true,
      dom: (
        <ToolbarButton
          active={false}
          tooltip={translator.t("Undo (CTRL-Z)")}
          onClick={(event) => projectActions.undo()}
        >
          <MdUndo />
        </ToolbarButton>
      ),
    },
    {
      index: 8,
      condition: true,
      dom: (
        <ToolbarButton
          active={[MODE_CONFIGURING_PROJECT].includes(mode)}
          tooltip={translator.t("Configure project")}
          onClick={(event) => projectActions.openProjectConfigurator()}
        >
          <MdSettings />
        </ToolbarButton>
      ),
    },
  ];

  sorter = sorter.concat(
    toolbarButtons.map((Component, key) => {
      return Component.prototype //if is a react component
        ? {
            condition: true,
            dom: React.createElement(Component, { mode, state, key }),
          }
        : {
            //else is a sortable toolbar button
            index: Component.index,
            condition: Component.condition,
            dom: React.createElement(Component.dom, { mode, state, key }),
          };
    })
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlParams = new URLSearchParams(window.location.search);
  const restaurant = urlParams.get("restaurant");
  // const domain = urlParams.get("domain");
  console.log("restaurant", restaurant);

  const axiosInstance = axios.create({
    baseURL: `${APIURL}/api/v1/restaurant/planner`,
  });

  const getPlanner = () => {
    axiosInstance
      .get(`/get?restaurant_id=${restaurant}`)
      .then((res) => {
        console.log("res", res);
        console.log("res", res.data.status == 404);
        localStorage.setItem(
          "backend_img",
          res.data.backend_img || "https://start-tech.ae/plan-1.jpg"
        );
        if (res.data.status == 404) {
          projectActions.newProject();
          setLoading(false);
          console.log("ceate");
        } else if (res.data.status == 200) {
          setLoading(false);
          console.log("res", res);
          localStorage.setItem("orders", res.data.items_have_order);
          localStorage.setItem("use_user_id_popup", res.data.use_user_id_popup);

          console.log("load");

          // console.log("data", res.data.data.url);
          console.log("Cat", Cat);
          console.log("dataaaaaaaa", res.data.data);
          // projectActions.loadProject(Cat);
          projectActions.loadProject(res.data.data);
        }
      })
      .catch((err) => {
        console.log("error", err.response.status);
        if (err.response) {
          if (err.response.status == 422) {
            setError("Enter Resturant ID");
            setLoading(false);
          }
        }
      });
  };
  useEffect(() => {
    getPlanner();
  }, []);
  // console.log("errrrrrrrror", error);
  return (
    <React.Fragment>
      {loading ? (
        <div className="loading">
          <span className="loader"></span>
        </div>
      ) : error ? (
        <div className="loading">
          <div className="error">
            <h4>Error!!</h4>
            <p>{error}</p>
          </div>
        </div>
      ) : (
        <aside
          style={{ ...ASIDE_STYLE, maxWidth: width, maxHeight: height }}
          className="toolbar"
        >
          {sorter.sort(sortButtonsCb).map(mapButtonsCb)}
        </aside>
      )}
    </React.Fragment>
  );
};

Toolbar.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  allowProjectFileSupport: PropTypes.bool.isRequired,
  toolbarButtons: PropTypes.array,
};

Toolbar.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};

export default Toolbar;
