import React from "react";
import PropTypes from "prop-types";
import { FaSave as IconSave } from "react-icons/fa";
import ToolbarButton from "./toolbar-button";
import { browserDownload } from "../../utils/browser";
import { Project } from "../../class/export";
import axios from "axios";
import toast from "react-hot-toast";
import { APIURL } from "../../../demo/src/APIURL";

export default function ToolbarSaveButton({ state }, { translator }) {
  const urlParams = new URLSearchParams(window.location.search);
  const restaurant = urlParams.get("restaurant");
  // const domain = urlParams.get("domain");
  console.log("restaurant", restaurant);

  const axiosInstance = axios.create({
    baseURL: `${APIURL}/api/v1/restaurant/planner`,
  });

  const saveProjectToFile = (e) => {
    e.preventDefault();
    let unselectedState = Project.unselectAll(state).updatedState;

    const jsonData = JSON.stringify(unselectedState.get("scene").toJS());
    const blob = new Blob([jsonData], {
      type: "application/json",
    });
    
    const formData = new FormData();
    formData.append("file", blob, "data.json");
    formData.append("restaurant_id", restaurant); // Add restaurant_id to FormData

    axiosInstance
      .post(`/save`, formData, { // Send formData directly
        // Axios will set Content-Type for FormData automatically,
        // including the boundary. Explicitly setting it can sometimes cause issues.
      })
      .then((res) => {
        console.log("res", res);
        toast.success("Saved successfully");
      })
      .catch(err => { // It's good practice to add a catch for the API call
        console.error("Error saving project:", err);
        toast.error(translator.t("Failed to save project."));
      });
    // browserDownload(state.get("scene").toJS()); // This was commented out, assuming it's not needed
    console.log("jsss", unselectedState.get("scene").toJS());
  };

  return (
    <ToolbarButton
      active={false}
      tooltip={translator.t("Save project")}
      onClick={saveProjectToFile}
    >
      <IconSave />
    </ToolbarButton>
  );
}

ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired,
};

ToolbarSaveButton.contextTypes = {
  translator: PropTypes.object.isRequired,
};
