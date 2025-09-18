import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { Text, TextInput } from "react-native";
import React from "react";

async function loadFonts() {
  await Font.loadAsync({
    Roboto: require("./assets/fonts/Roboto/static/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/static/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/static/Roboto-Medium.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto/static/Roboto-Light.ttf"),
    "Roboto-ExtraLight": require("./assets/fonts/Roboto/static/Roboto-ExtraLight.ttf"),
    "Roboto-ExtraLightItalic": require("./assets/fonts/Roboto/static/Roboto-ExtraLightItalic.ttf"),
    "Roboto-MediumItalic": require("./assets/fonts/Roboto/static/Roboto-MediumItalic.ttf"),
    "Roboto-Thin": require("./assets/fonts/Roboto/static/Roboto-Thin.ttf"),
    "Roboto-ThinItalic": require("./assets/fonts/Roboto/static/Roboto-ThinItalic.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto/static/Roboto-Black.ttf"),
    "Roboto-BlackItalic": require("./assets/fonts/Roboto/static/Roboto-BlackItalic.ttf"),
    "Roboto-SemiBold": require("./assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
    "Roboto-SemiBoldItalic": require("./assets/fonts/Roboto/static/Roboto-SemiBoldItalic.ttf"),
    "Roboto-BoldItalic": require("./assets/fonts/Roboto/static/Roboto-BoldItalic.ttf"),
    "Roboto-ExtraBold": require("./assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
    "Roboto-ExtraBoldItalic": require("./assets/fonts/Roboto/static/Roboto-ExtraBoldItalic.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto/static/Roboto-Regular.ttf"),
  });
}

function applyGlobalFont(fontFamily: string = "Roboto") {
  const oldTextRender = Text.render;
  Text.render = function (...args) {
    const origin = oldTextRender.call(this, ...args);
    return (
      origin &&
      React.cloneElement(origin, {
        style: [{ fontFamily }, origin.props.style],
      })
    );
  };

  const oldInputRender = TextInput.render;
  TextInput.render = function (...args) {
    const origin = oldInputRender.call(this, ...args);
    return (
      origin &&
      React.cloneElement(origin, {
        style: [{ fontFamily }, origin.props.style],
      })
    );
  };
}

export function useGlobalFonts(defaultFont: string = "Roboto") {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadFonts().then(() => {
      applyGlobalFont(defaultFont);
      setReady(true);
    });
  }, []);

  return ready;
}
