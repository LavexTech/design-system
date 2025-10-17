import React from "react";
import { Button as GluestackButton, ButtonText } from "../../ui/button";
import { GluestackUIProvider } from "../../ui/gluestack-ui-provider";

type ButtonProps = {
  text: string;
  variant?:
  | "default"
  | "default-outline"
  | "success"
  | "danger"
  | "success-outline"
  | "danger-outline";
  onClick: () => void;
}

const variantMap = {
  default: { action: "primary" as const, variant: "solid" as const },
  success: { action: "positive" as const, variant: "solid" as const },
  danger: { action: "negative" as const, variant: "solid" as const },
  "default-outline": { action: "primary" as const, variant: "outline" as const },
  "success-outline": { action: "positive" as const, variant: "outline" as const },
  "danger-outline": { action: "negative" as const, variant: "outline" as const },
}

export const Button: React.FC<ButtonProps> = ({
  text,
  variant = "default",
  onClick,
}) => {
  const { action, variant: gluestackVariant } = variantMap[variant];

  return (
    <GluestackUIProvider>
    <GluestackButton
      action={action}
      variant={gluestackVariant}
      size="md"
      onPress={onClick}
    >
      {/* @ts-expect-error */}
      <ButtonText>{text}</ButtonText>
    </GluestackButton>
    </GluestackUIProvider>
  )
}
