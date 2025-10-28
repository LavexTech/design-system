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

type AccordionItemProps = {
  id: string,
  title: string,
  children: React.ReactNode
}

type AccordionProps = {
  children: React.ReactNode
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ id, title, children }) => {
  return (
    <>
      <GluestackAccordionItem value={id}>
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }: { isExpanded: boolean }) => {
              return (
                <>
                  <AccordionTitleText>
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
      <Divider />
    </>
  )
}

export const Accordion: React.FC<AccordionProps> = ({ children }) => {
  return (
    <GluestackAccordion 
      variant="unfilled" 
      isCollapsible={true}
      style={{ backgroundColor: Constants.styles.backgroundColor.WHITE }}
    >
      {children}
    </GluestackAccordion>
)
}

