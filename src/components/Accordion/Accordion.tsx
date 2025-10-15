import React from "react";
import {
  Accordion as GluestackAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
  AccordionContentText,
  AccordionIcon,
} from "../../ui/accordion"

export interface AccordionProps {
  text: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Accordion: React.FC<AccordionProps> = ({ text, children, onClick }) => {
  return (

    // <GluestackAccordion 
    //   type="single" 
    //   isCollapsible={true}
    //   style={{
    //     backgroundColor: Constants.styles.backgroundColor.WHITE,
    //     borderRadius: Constants.styles.borderRadius.MEDIUM,
    //     borderWidth: Constants.styles.borderWidth.THIN,
    //     borderColor: Constants.styles.borderColor.LIGHT,
    //     overflow: "hidden",
    //   }}
    // >
    //   <GluestackAccordion.Item value="item-1">
    //     <GluestackAccordion.Header>
    //       <GluestackAccordion.Trigger onPress={onClick}>
    //         {({ isExpanded }: { isExpanded: boolean }) => (
    //           <>
    //             <GluestackAccordion.TitleText
    //               style={{
    //                 fontFamily: Constants.styles.fontFamily.REGULAR,
    //                 color: Constants.styles.textColor.DEFAULT,
    //               }}
    //             >
    //               {text}
    //             </GluestackAccordion.TitleText>
    //             <GluestackAccordion.Icon>
    //               <Text 
    //                 style={{ 
    //                   fontSize: Constants.styles.fontSize.LARGE, 
    //                   fontWeight: String(Constants.styles.fontWeight.NORMAL) as any,
    //                   fontFamily: Constants.styles.fontFamily.REGULAR,
    //                   color: Constants.styles.textColor.DEFAULT,
    //                 }}
    //               >
    //                 {isExpanded ? "−" : "+"}
    //               </Text>
    //             </GluestackAccordion.Icon>
    //           </>
    //         )}
    //       </GluestackAccordion.Trigger>
    //     </GluestackAccordion.Header>
    //     <GluestackAccordion.Content>
    //       {children}
    //     </GluestackAccordion.Content>
    //   </GluestackAccordion.Item>
    // </GluestackAccordion>

    // <GluestackAccordion variant="unfilled" className="m-5 w-[90%]">
    //   <AccordionItem
    //     value="item-1"
    //     isDisabled={true}
    //     className="border-b border-outline-300"
    //   >
    //     <AccordionHeader>
    //       <AccordionTrigger>
    //         {({ isExpanded }) => {
    //           return (
    //             <>
    //               <AccordionTitleText>Disabled Item</AccordionTitleText>
    //               {isExpanded ? (
    //                 <AccordionIcon as={RemoveIcon} />
    //               ) : (
    //                 <AccordionIcon as={AddIcon} />
    //               )}
    //             </>
    //           );
    //         }}
    //       </AccordionTrigger>
    //     </AccordionHeader>
    //     <AccordionContent>
    //       <AccordionContentText>This is a Disabled Item.</AccordionContentText>
    //     </AccordionContent>
    //   </AccordionItem>
    //   <AccordionItem value="item-2">
    //     <AccordionHeader>
    //       <AccordionTrigger>
    //         {({ isExpanded }) => {
    //           return (
    //             <>
    //               <AccordionTitleText>
    //                 Is this accordion accessible?
    //               </AccordionTitleText>
    //               {isExpanded ? (
    //                 <AccordionIcon as={RemoveIcon} />
    //               ) : (
    //                 <AccordionIcon as={AddIcon} />
    //               )}
    //             </>
    //           );
    //         }}
    //       </AccordionTrigger>
    //     </AccordionHeader>
    //     <AccordionContent>
    //       <AccordionContentText>
    //         Yes, the accordion is accessible. It adheres to the WAI-ARIA design
    //         pattern. You can read more about it in the accessibility section of
    //         the docs.
    //       </AccordionContentText>
    //     </AccordionContent>
    //   </AccordionItem>
    // </GluestackAccordion>
    <></>
  )
}

