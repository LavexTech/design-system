import React from "react"
import { Button as GluestackButton, ButtonText } from "../../ui/button"
import { GluestackUIProvider } from "../../ui/gluestack-ui-provider"
import Constants from "../../constants/constants";

type ButtonProps = {
  text: string;
  variant?:
  | "default"
  | "default-outline"
  | "success"
  | "danger"
  | "success-outline"
  | "danger-outline"
  | "primary"
  | "secondary"
  | "secondary-outline";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  onClick: () => void;
  disabled?: boolean;
  darkMode?: boolean;
  fontScale?: number;
}

const variantMap = {
  default: { action: "primary" as const, variant: "solid" as const },
  success: { action: "positive" as const, variant: "solid" as const },
  danger: { action: "negative" as const, variant: "solid" as const },
  "default-outline": { action: "primary" as const, variant: "outline" as const },
  "success-outline": { action: "positive" as const, variant: "outline" as const },
  "danger-outline": { action: "negative" as const, variant: "outline" as const },
  "primary": { action: "primary" as const, variant: "solid" as const },
  "secondary": { action: "secondary" as const, variant: "solid" as const },
  "secondary-outline": { action: "secondary" as const, variant: "outline" as const },
}

export const Button: React.FC<ButtonProps> = ({
  text,
  variant = "default",
  size,
  onClick,
  disabled = false,
  darkMode = false,
  fontScale = 1,
}) => {
  const { action, variant: gluestackVariant } = variantMap[variant]

  let buttonStyle: any = {}
  let textStyle: any = {}
  let buttonSize: "xs" | "sm" | "md" | "lg" | "xl" = (size !== undefined ? size : "md")

  if (variant === "primary") {
    buttonStyle = {
      backgroundColor: Constants.styles.color.PRIMARY_DARK, 
      borderColor: Constants.styles.color.PRIMARY_DARK,
      borderWidth: 1,
    }
    textStyle = {
      color: Constants.styles.color.PRIMARY_LIGHT,
    }
  }
  if (variant === "secondary") {
    buttonStyle = {
      backgroundColor: Constants.styles.color.PRIMARY_DARK,
      borderColor: Constants.styles.color.PRIMARY_DARK,
      borderWidth: 1,
    }
    textStyle = {
      color: Constants.styles.color.BACKGROUND_LIGHT,
    }
  }
  if (variant === "secondary-outline") {
    buttonStyle = {
      backgroundColor: Constants.styles.color.BACKGROUND_LIGHT,
      borderColor: Constants.styles.color.PRIMARY_DARK,
      borderWidth: 1,
    }
    textStyle = {
      color: Constants.styles.color.PRIMARY_DARK,
    }
  }

  if (darkMode && (variant === "default" || variant === "default-outline")) {
    buttonStyle = {
      backgroundColor: variant === "default" ? Constants.styles.theme.dark.background.subtle : "transparent",
      borderColor: Constants.styles.theme.dark.border.default,
      borderWidth: 1,
    };
    textStyle = {
      color: Constants.styles.theme.dark.text.default,
      fontSize: Constants.styles.fontSize.MEDIUM * fontScale,
    };
  } else if (fontScale !== 1) {
    textStyle = {
      ...textStyle,
      fontSize: Constants.styles.fontSize.MEDIUM * fontScale,
    };
  }

  return (
    <GluestackUIProvider mode={darkMode ? "dark" : "light"}>
    <GluestackButton
      action={action}
      variant={gluestackVariant}
      size={buttonSize}
      onPress={onClick}
      isDisabled={disabled}
      style={[buttonStyle]}
    >
      <ButtonText style={[textStyle]}>
        {text}
      </ButtonText>
    </GluestackButton>
    </GluestackUIProvider>
  )
}
