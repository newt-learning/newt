import React, { useState } from "react";
import _ from "lodash";
// Components
import VideoUrlForm from "./VideoUrlForm";
import VideoConfirmation from "./VideoConfirmation";

const AddVideoScreen = () => {
  const [videoInfo, setVideoInfo] = useState(null);
  const [onConfirmationSection, setOnConfirmationSection] = useState(false);

  return onConfirmationSection ? (
    <VideoConfirmation
      videoInfo={videoInfo}
      setOnConfirmationSection={setOnConfirmationSection}
    />
  ) : (
    <VideoUrlForm
      setVideoInfo={setVideoInfo}
      setOnConfirmationSection={setOnConfirmationSection}
    />
  );
};

export default AddVideoScreen;
