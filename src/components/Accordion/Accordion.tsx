import React from "react";
import {
  Accordion as GluestackAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
  AccordionIcon,
} from "../../ui/accordion"
import { Divider } from "../../ui/divider";
import { AddIcon, RemoveIcon } from '../../ui/icon';
import Constants from "../../constants/constants";

export interface AccordionProps {
  text: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Accordion: React.FC<AccordionProps> = ({ text, children, onClick }) => {
  return (
    <>
    <GluestackAccordion 
      variant="unfilled" 
      isCollapsible={true}
      style={{ backgroundColor: Constants.styles.backgroundColor.WHITE }}
    >
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }: { isExpanded: boolean }) => {
              return (
                <>
                  <AccordionTitleText>
                    {text}
                  </AccordionTitleText>
                  {isExpanded ? (
                    // TODO: Trocar GluestackIcon pelo nosso componente Icon
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
      </AccordionItem>
    </GluestackAccordion>
    <Divider />
    </>
  )
}

