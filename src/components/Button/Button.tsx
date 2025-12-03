import React from "react"
import { Button as GluestackButton, ButtonText } from "../../ui/button"
import { GluestackUIProvider } from "../../ui/gluestack-ui-provider"
import Constants from "@/src/constants/constants";

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
  onClick: () => void
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
  onClick,
}) => {
  const { action, variant: gluestackVariant } = variantMap[variant]

  let tiroliro = {}
  let buttonSize: "sm" | "md" = "md"

  if (variant === "primary") tiroliro = { backgroundColor: Constants.styles.color.BLUE }
  if (variant === "secondary") {
    tiroliro = { backgroundColor: Constants.styles.color.WHITE, borderColor: Constants.styles.color.BLACK }
    buttonSize = "sm"
  }
  if (variant === "secondary-outline") {
    tiroliro = { backgroundColor: Constants.styles.color.WHITE, borderColor: Constants.styles.color.BLACK }
    buttonSize = "sm"
  }


  return (
    <GluestackUIProvider>
    <GluestackButton
      action={action}
      variant={gluestackVariant}
      size={buttonSize}
      onPress={onClick}
      style={tiroliro}
    >
      <ButtonText>{text}</ButtonText>
    </GluestackButton>
    </GluestackUIProvider>
  )
}
