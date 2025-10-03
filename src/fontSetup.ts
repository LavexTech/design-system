import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { Text, TextInput } from "react-native";
import React from "react";

async function loadFonts() {
  await Font.loadAsync({
    "Roboto-Italic": require("./assets/fonts/Roboto/static/Roboto-Italic.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/static/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("./assets/fonts/Roboto/static/Roboto-BoldItalic.ttf"),
    "Roboto-ExtraLight": require("./assets/fonts/Roboto/static/Roboto-ExtraLight.ttf"),
    "Roboto-ExtraLightItalic": require("./assets/fonts/Roboto/static/Roboto-ExtraLightItalic.ttf"),
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
