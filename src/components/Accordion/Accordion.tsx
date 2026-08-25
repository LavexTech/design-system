import React from "react"
import {
  LayoutAnimation,
  Platform,
  UIManager,
  View,
  StyleSheet,
} from "react-native"
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
import { ChevronDownIcon, ChevronUpIcon } from "../../ui/icon"
import Constants from "../../constants/constants"
import { GluestackUIProvider } from "../../ui/gluestack-ui-provider"

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const ACCORDION_ANIMATION = {
  duration: 300,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
}

type AccordionItemProps = {
  id: string
  title: string
  /** Renders immediately after the title (e.g. status Tag). */
  titleAccessory?: React.ReactNode
  /** Renders before the title inside the header (e.g. back chevron). */
  leading?: React.ReactNode
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
  leading,
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
                <View style={styles.triggerRow}>
                  <View style={styles.titleRow}>
                    {leading ? (
                      <View style={styles.leading}>{leading}</View>
                    ) : null}
                    <View style={styles.titleCluster}>
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
                        <View style={styles.titleAccessory}>
                          {titleAccessory}
                        </View>
                      ) : null}
                    </View>
                  </View>
                  <View style={styles.chevron}>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUpIcon} />
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} />
                    )}
                  </View>
                </View>
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
        type="single"
        isCollapsible={true}
        defaultValue={defaultValue ? [defaultValue] : undefined}
        onValueChange={() => {
          LayoutAnimation.configureNext(ACCORDION_ANIMATION)
        }}
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
  triggerRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  titleRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
    marginRight: Constants.styles.spacing.MEDIUM,
  },
  leading: {
    marginRight: Constants.styles.spacing.SMALL,
    flexShrink: 0,
  },
  titleCluster: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    flexGrow: 0,
    maxWidth: "100%",
    gap: Constants.styles.spacing.SMALL,
  },
  titleAccessory: {
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  chevron: {
    flexShrink: 0,
    marginLeft: Constants.styles.spacing.SMALL,
  },
})
