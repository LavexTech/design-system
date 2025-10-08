import React from "react";
import { Text } from "react-native";
import { Accordion as GluestackAccordion } from "../../ui-gluestack/accordion";
import Constants from "../../constants/constants";

export interface AccordionProps {
  text: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Accordion: React.FC<AccordionProps> = ({ text, children, onClick }) => {
  return (
    <GluestackAccordion 
      type="single" 
      isCollapsible={true}
      style={{
        backgroundColor: Constants.styles.backgroundColor.WHITE,
        borderRadius: Constants.styles.borderRadius.MEDIUM,
        borderWidth: Constants.styles.borderWidth.THIN,
        borderColor: Constants.styles.borderColor.LIGHT,
        overflow: "hidden",
      }}
    >
      <GluestackAccordion.Item value="item-1">
        <GluestackAccordion.Header>
          <GluestackAccordion.Trigger onPress={onClick}>
            {({ isExpanded }: { isExpanded: boolean }) => (
              <>
                <GluestackAccordion.TitleText
                  style={{
                    fontFamily: Constants.styles.fontFamily.REGULAR,
                    color: Constants.styles.textColor.DEFAULT,
                  }}
                >
                  {text}
                </GluestackAccordion.TitleText>
                <GluestackAccordion.Icon>
                  <Text 
                    style={{ 
                      fontSize: Constants.styles.fontSize.LARGE, 
                      fontWeight: String(Constants.styles.fontWeight.NORMAL) as any,
                      fontFamily: Constants.styles.fontFamily.REGULAR,
                      color: Constants.styles.textColor.DEFAULT,
                    }}
                  >
                    {isExpanded ? "−" : "+"}
                  </Text>
                </GluestackAccordion.Icon>
              </>
            )}
          </GluestackAccordion.Trigger>
        </GluestackAccordion.Header>
        <GluestackAccordion.Content>
          {children}
        </GluestackAccordion.Content>
      </GluestackAccordion.Item>
    </GluestackAccordion>
  );
};

