import React, { useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { GluestackUIProvider } from "../../ui/gluestack-ui-provider"
import { TextBox as Text } from "../Text/Text"
import { Grid, GridItem } from "../Grid/Grid"
import { Modal } from "../Modal/Modal"
import { Button } from "../Button/Button"
import { IconChevronDown } from "../Icons/IconChevronDown"
import { IconCheck } from "../Icons/IconCheck"
import Constants from "../../constants/constants"

const OPTION_BUTTON_MIN_HEIGHT =
  Constants.styles.componentSize.BUTTON_HEIGHT +
  Constants.styles.spacing.MEDIUM * 2

export type SelectOption = {
  label: string
  value: string
}

type SelectProps = {
  label: string
  value?: string
  placeholder?: string
  options: SelectOption[]
  onChange: (value: string) => void
  errorMessage?: string
  darkMode?: boolean
  fontScale?: number
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  placeholder = "Selecione",
  options,
  onChange,
  errorMessage,
  darkMode = false,
  fontScale = 1,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find((option) => option.value === value)
  const displayText = selectedOption?.label ?? placeholder
  const hasError = Boolean(errorMessage)
  const optionRowHeight = OPTION_BUTTON_MIN_HEIGHT
  const optionGap = Constants.styles.spacing.SMALL
  const optionsHeight =
    options.length * optionRowHeight +
    Math.max(0, options.length - 1) * optionGap
  const chromeHeight =
    Constants.styles.componentSize.BUTTON_HEIGHT +
    Constants.styles.spacing.LARGE * 2
  const contentMinHeight = Math.round((optionsHeight + chromeHeight) * 1.5)

  function handleSelect(optionValue: string) {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <GluestackUIProvider mode={darkMode ? "dark" : "light"} style={{ width: "100%" }}>
      <Grid columns={1} gap={2} darkMode={darkMode}>
        {label ? (
          <GridItem colSpan={4}>
            <Text text={label} size="small" darkMode={darkMode} fontScale={fontScale} />
          </GridItem>
        ) : null}
        <GridItem colSpan={4}>
          <Pressable
            onPress={() => setIsOpen(true)}
            style={[
              styles.trigger,
              darkMode ? styles.triggerDark : null,
              hasError ? styles.triggerError : null,
            ]}
            accessibilityRole="button"
            accessibilityLabel={label}
          >
            <View style={styles.triggerText}>
              <Text
                text={displayText}
                size="medium"
                darkMode={darkMode}
                fontScale={fontScale}
                fill={false}
              />
            </View>
            <View style={styles.chevron}>
              <IconChevronDown
                size={Constants.styles.fontSize.MEDIUM * fontScale}
                color={
                  darkMode
                    ? Constants.styles.theme.dark.text.muted
                    : Constants.styles.textColor.INFO
                }
              />
            </View>
          </Pressable>
        </GridItem>
        {errorMessage ? (
          <GridItem colSpan={4}>
            <Text
              size="small"
              level="error"
              text={errorMessage}
              darkMode={darkMode}
              fontScale={fontScale}
            />
          </GridItem>
        ) : null}
      </Grid>
      {isOpen ? (
        <Modal
          onClose={() => setIsOpen(false)}
          buttonText="Voltar"
          buttonVariant="default-outline"
          darkMode={darkMode}
          fontScale={fontScale}
          contentMinHeight={contentMinHeight}
        >
          <View style={[styles.options, { minHeight: Math.round(optionsHeight * 1.5) }]}>
            {options.map((option) => {
              const isSelected = option.value === value
              return (
                <View key={option.value} style={styles.optionButton}>
                  <Button
                    text={option.label}
                    variant={isSelected ? "success-outline" : "default-outline"}
                    onClick={() => handleSelect(option.value)}
                    darkMode={darkMode}
                    fontScale={fontScale}
                    style={styles.optionButtonInner}
                    textStyle={styles.optionButtonText}
                    icon={
                      isSelected ? (
                        <IconCheck
                          size={20}
                          color={Constants.styles.textColor.SUCCESS}
                        />
                      ) : undefined
                    }
                  />
                </View>
              )
            })}
          </View>
        </Modal>
      ) : null}
    </GluestackUIProvider>
  )
}

const styles = StyleSheet.create({
  trigger: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Constants.styles.spacing.MEDIUM,
    backgroundColor: Constants.styles.backgroundColor.WHITE,
    borderRadius: Constants.styles.borderRadius.MEDIUM,
    borderWidth: Constants.styles.borderWidth.REGULAR,
    borderColor: Constants.styles.borderColor.MEDIUM,
  },
  triggerDark: {
    backgroundColor: Constants.styles.theme.dark.background.subtle,
    borderColor: Constants.styles.theme.dark.border.default,
  },
  triggerError: {
    borderColor: Constants.styles.textColor.DANGER,
  },
  chevron: {
    marginLeft: Constants.styles.spacing.SMALL,
  },
  triggerText: {
    flex: 1,
    marginRight: Constants.styles.spacing.SMALL,
  },
  options: {
    gap: Constants.styles.spacing.SMALL,
    width: "100%",
    justifyContent: "center",
  },
  optionButton: {
    width: "100%",
  },
  optionButtonInner: {
    width: "100%",
    minHeight: OPTION_BUTTON_MIN_HEIGHT,
    height: "auto",
    paddingVertical: Constants.styles.spacing.MEDIUM,
  },
  optionButtonText: {
    textAlign: "center",
    width: "100%",
    paddingHorizontal: Constants.styles.spacing.EXTRA_LARGE,
  },
})
