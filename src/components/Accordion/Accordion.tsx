import React from "react"
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
import { AddIcon, RemoveIcon } from '../../ui/icon'
import Constants from "../../constants/constants"
import { GluestackUIProvider } from "../../ui/gluestack-ui-provider"

type AccordionItemProps = {
  id: string,
  title: string,
  children: React.ReactNode,
  darkMode?: boolean,
  fontScale?: number,
}

type AccordionProps = {
  children: React.ReactNode,
  darkMode?: boolean,
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ id, title, children, darkMode = false, fontScale = 1 }) => {
  return (
    <>
      <GluestackAccordionItem value={id}>
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }: { isExpanded: boolean }) => {
              return (
                <>
                  <AccordionTitleText
                    style={{
                      color: darkMode ? Constants.styles.theme.dark.text.default : Constants.styles.theme.light.text.default,
                      fontSize: Constants.styles.fontSize.MEDIUM * fontScale,
                    }}
                  >
                    {title}
                  </AccordionTitleText>
                  {isExpanded ? (
                    <AccordionIcon as={RemoveIcon} />
                  ) : (
                    <AccordionIcon as={AddIcon} />
                  )}
                </>
              );
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          {children}
        </AccordionContent>
      </GluestackAccordionItem>
      <Divider darkMode={darkMode} />
    </>
  )
}

export const Accordion: React.FC<AccordionProps> = ({ children, darkMode = false }) => {
  return (
    <GluestackUIProvider mode={darkMode ? "dark" : "light"}>
      <GluestackAccordion 
        variant="unfilled" 
        isCollapsible={true}
        style={{ backgroundColor: darkMode ? Constants.styles.theme.dark.background.surface : Constants.styles.backgroundColor.WHITE }}
      >
        {children}
      </GluestackAccordion>
    </GluestackUIProvider>
)
}

