import React from "react"
import { View, StyleSheet } from "react-native"
import {
  Accordion as GluestackAccordion,
  AccordionItem as GluestackAccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
  AccordionIcon,
} from "../../ui/accordion"
import { Divider } from "../Divider/Divider"
import { IconChevronDown } from "../Icons/IconChevronDown"
import { IconChevronUp } from "../Icons/IconChevronUp"
import Constants from "../../constants/constants"
import { GluestackUIProvider } from "../../ui/gluestack-ui-provider"

type AccordionItemProps = {
  id: string
  title: string
  titleAccessory?: React.ReactNode
  children: React.ReactNode
  darkMode?: boolean
  fontScale?: number
}

type AccordionProps = {
  children: React.ReactNode
  darkMode?: boolean
  /** When set, the matching AccordionItem id starts expanded. */
  defaultValue?: string
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  titleAccessory,
  children,
  darkMode = false,
  fontScale = 1,
}) => {
  return (
    <>
      <GluestackAccordionItem value={id}>
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }: { isExpanded: boolean }) => {
              return (
                <>
                  <View style={styles.titleRow}>
                    <AccordionTitleText
                      style={{
                        color: darkMode
                          ? Constants.styles.theme.dark.text.default
                          : Constants.styles.theme.light.text.default,
                        fontSize: Constants.styles.fontSize.MEDIUM * fontScale,
                        flexShrink: 1,
                      }}
                    >
                      {title}
                    </AccordionTitleText>
                    {titleAccessory ? (
                      <View style={styles.titleAccessory}>{titleAccessory}</View>
                    ) : null}
                  </View>
                  {isExpanded ? (
                    <AccordionIcon as={IconChevronUp} />
                  ) : (
                    <AccordionIcon as={IconChevronDown} />
                  )}
                </>
              )
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>{children}</AccordionContent>
      </GluestackAccordionItem>
      <Divider darkMode={darkMode} />
    </>
  )
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  darkMode = false,
  defaultValue,
}) => {
  return (
    <GluestackUIProvider mode={darkMode ? "dark" : "light"}>
      <GluestackAccordion
        variant="unfilled"
        isCollapsible={true}
        defaultValue={defaultValue}
        style={{
          backgroundColor: darkMode
            ? Constants.styles.theme.dark.background.surface
            : Constants.styles.backgroundColor.WHITE,
        }}
      >
        {children}
      </GluestackAccordion>
    </GluestackUIProvider>
  )
}

const styles = StyleSheet.create({
  titleRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: Constants.styles.spacing.SMALL,
  },
  titleAccessory: {
    marginLeft: Constants.styles.spacing.SMALL,
    justifyContent: "center",
    alignItems: "center",
  },
})
