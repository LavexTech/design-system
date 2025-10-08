import { ScrollView } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Info } from "@src/components/Info/Info";
import { Grid } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { Accordion } from "@src/components/Accordion/Accordion";
import { OrderList, Order } from "@src/components/OrderList/OrderList";

export default function Index() {
  const orders: Order[] = [
    {
      id: "1",
      title: "Pedido #001 - Produto A",
      description: "Descrição completa do Produto A com todos os detalhes importantes.",
      price: 299.99,
      discount: 15,
      details: "Válido até o final do mês. Entrega grátis para todo o Brasil."
    },
    {
      id: "2",
      title: "Pedido #002 - Produto B",
      description: "Produto B em promoção por tempo limitado!",
      price: 149.90,
      discount: 25,
      details: "Estoque limitado. Aproveite enquanto durarem as unidades."
    },
    {
      id: "3",
      title: "Pedido #003 - Produto C",
      description: "Leve 3 e pague 2 neste combo imperdível.",
      price: 599.00,
      details: "Economia garantida! Produtos de alta qualidade com desconto especial."
    }
  ];

  const handleOrderClick = (order: Order) => {
    console.log("Pedido clicado:", order.title);
  };

  return (
    <ScrollView style={{ marginTop: 20, padding: 20 }}>
      <MainTitle text="Main Title" />
      <Subtitle text="Subtitle" />
      <Title text="Title" />
      <Text text="TextBox" />
      <Info text="Info" />
      <Grid columns={3} gap={4}>
        <Text text="Column 1" />
        <Text text="Column 2" />
        <Text text="Column 3" />
      </Grid>
      <Card>
        <Text text="Card" />
      </Card>
      <Accordion text="O que é um FAQ?">
        <Text text="FAQ significa 'Perguntas Frequentes' e é usado para organizar informações comuns." />
      </Accordion>
      <Accordion text="Como usar o Accordion?">
        <Info text="Clique no título para expandir ou recolher o conteúdo." />
      </Accordion>
      
      <MainTitle text="Lista de Pedidos" />
      <OrderList orders={orders} onClick={handleOrderClick} />
    </ScrollView>
  )
}