import { useState, useEffect } from "react";
import { loadAsync } from "expo-font";

const customFonts = {
  Righteous: require("../../assets/fonts/Righteous-Regular.ttf"),
  "Muli-Regular": require("../../assets/fonts/Muli/Muli-Regular.ttf"),
  "Muli-Bold": require("../../assets/fonts/Muli/Muli-Bold.ttf"),
  "Muli-SemiBold": require("../../assets/fonts/Muli/Muli-SemiBold.ttf")
};

const useFonts = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadAsync(customFonts).then(() => setFontLoaded(true));
  }, []);

  return [fontLoaded];
};

export default useFonts;
