import { ScrollView } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Info } from "@src/components/Info/Info";
import { Accordion, AccordionItem } from "@src/components/Accordion/Accordion";

export default function Index() {
  return (
    <ScrollView style={{ marginTop: 20, padding: 20 }}>
      <MainTitle text="Main Title" />
      <Subtitle text="Subtitle" />
      <Title text="Title" />
      <Text text="TextBox" />
      <Info text="Info" />
      <Accordion>
        <AccordionItem id="item-1" title="Primeiro Item">
          <Text size="small" text="Conteúdo do primeiro item do accordion. Este item pode ser expandido e colapsado independentemente." />
        </AccordionItem>
        <AccordionItem id="item-2" title="Segundo Item">
          <Text size="small" text="Conteúdo do segundo item. Cada item tem seu próprio estado de expansão/colapso." />
        </AccordionItem>
        <AccordionItem id="item-3" title="Terceiro Item">
          <Text size="small" text="Conteúdo do terceiro item. Todos os itens estão dentro de um único componente Accordion." />
        </AccordionItem>
      </Accordion>
    </ScrollView>
  )
}