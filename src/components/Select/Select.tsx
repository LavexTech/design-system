import React, { useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { TextBox as Text } from "../Text/Text"
import { Grid, GridItem } from "../Grid/Grid"
import { Modal } from "../Modal/Modal"
import { CheckboxListItem } from "../CheckboxListItem/CheckboxListItem"
import { IconChevronDown } from "../Icons/IconChevronDown"
import Constants from "../../constants/constants"

const OPTION_GAP = Constants.styles.spacing.MEDIUM

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
  triggerFontScale?: number
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
  triggerFontScale = 1,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find((option) => option.value === value)
  const displayText = selectedOption?.label ?? placeholder
  const hasError = Boolean(errorMessage)

  function handleSelect(optionValue: string) {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <View style={styles.root}>
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
              null,
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
                fontScale={fontScale * triggerFontScale}
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
        >
          <View style={styles.options}>
            {options.map((option) => {
              const isSelected = option.value === value
              return (
                <CheckboxListItem
                  key={option.value}
                  label={option.label}
                  checked={isSelected}
                  divider
                  fontScale={fontScale}
                  onChange={(next) => {
                    if (!next) {
                      return
                    }
                    handleSelect(option.value)
                  }}
                />
              )
            })}
          </View>
        </Modal>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    alignSelf: "stretch",
  },
  trigger: {
    minHeight: Constants.styles.componentSize.INPUT_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Constants.styles.spacing.MEDIUM,
    backgroundColor: Constants.styles.surface.DEFAULT,
    borderRadius: Constants.styles.borderRadius.LARGE,
    borderWidth: Constants.styles.borderWidth.INTERACTIVE,
    borderColor: Constants.styles.border.INTERACTIVE,
  },
  triggerDark: {
    backgroundColor: Constants.styles.theme.dark.background.subtle,
    borderColor: Constants.styles.theme.dark.border.default,
  },
  triggerError: {
    borderColor: Constants.styles.text.DANGER,
  },
  chevron: {
    marginLeft: Constants.styles.spacing.SMALL,
  },
  triggerText: {
    flex: 1,
    marginRight: Constants.styles.spacing.SMALL,
  },
  options: {
    gap: OPTION_GAP,
    width: "100%",
    alignItems: "stretch",
  },
})
