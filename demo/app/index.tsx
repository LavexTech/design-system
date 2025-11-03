import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { UserInfo } from "@src/components/UserInfo/UserInfo";
import { TextArea } from "@src/components/TextArea/TextArea";
import { Info } from "@src/components/Info/Info";
import { Accordion, AccordionItem } from "@src/components/Accordion/Accordion";
import { Grid, GridItem } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { Message } from "@src/components/Message/Message";
import { Input } from "@src/components/Input/Input";
import { InputName } from "@src/components/InputName/InputName";
import { InputPhone } from "@src/components/InputPhone/InputPhone";
import { TextList } from "@src/components/TextList/TextList";
import { List } from "@src/components/List/List";
import { InputPassword } from "@src/components/InputPassword/InputPassword";
import { Image } from "@src/components/Image/Image";
import { Stepper } from "@src/components/Stepper/Stepper";
import { Alert } from "@src/components/Alert/Alert";
import { IconHome } from "@src/components/Icons/IconHome";
import { IconArrowLeft } from "@src/components/Icons/IconArrowLeft";
import { IconArrowRight } from "@src/components/Icons/IconArrowRight";
import { IconChevronLeft } from "@src/components/Icons/IconChevronLeft";
import { IconChevronRight } from "@src/components/Icons/IconChevronRight";
import { IconSend } from "@src/components/Icons/IconSend";
import { IconPlus } from "@src/components/Icons/IconPlus";
import { IconMinus } from "@src/components/Icons/IconMinus";
import { IconClose } from "@src/components/Icons/IconClose";
import { IconTrash } from "@src/components/Icons/IconTrash";
import { IconSearch } from "@src/components/Icons/IconSearch";
import { IconFilter } from "@src/components/Icons/IconFilter";
import { IconProfile } from "@src/components/Icons/IconProfile";
import { IconEye } from "@src/components/Icons/IconEye";
import { IconEyeClosed } from "@src/components/Icons/IconEyeClosed";
import { IconMessage } from "@src/components/Icons/IconMessage";
import { IconHistory } from "@src/components/Icons/IconHistory";
import { IconImage } from "@src/components/Icons/IconImage";
import { IconExclamation } from "@src/components/Icons/IconExclamation";
import { Stars } from "@src/components/Stars/Stars";
import { InputChat } from "@src/components/InputChat/InputChat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserCardHorizontal } from "@src/components/UserCardHorizontal/UserCardHorizontal";
import Constants from "@src/constants/constants";

export default function Index() {
  const [value, setValue] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [inputValue, setInputValue] = useState("");

  const insets = useSafeAreaInsets();
  
  const handleSend = () => {
    console.log("Mensagem enviada:", inputValue);
    setInputValue("");
  };
  const [shirtCount, setShirtCount] = useState(0);
  const [pantsCount, setPantsCount] = useState(1);
  
  const sampleUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    company: "Example Inc.",
    profileImage: "https://picsum.photos/id/15/200/200",
    ordersCount: 32,
    rating: 3.5,
    id: "1",
  };

  const [contactMessage, setContactMessage] = useState("");
  const [phone, setPhone] = useState('');
  
  return (
    <ScrollView
      style={{ flex: 1, padding: 20 }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={true}
    >
      <Grid columns={1} gap={2}>
        <View style={{ marginTop: 20 }}>
          <Subtitle text="Com Mensagem de Erro Customizada" />
          <Info text="Exemplo com mensagem de erro personalizada" />
          <InputPhone
              value={phone}
              onChange={setPhone}
              errorMessage="Por favor, insira um telefone válido"
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <InputName
            label="Nome Completo"
            value={userName}
            placeholder="Digite seu nome completo"
            onChange={setUserName}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Input
            label="Input"
            value={value}
            placeholder="Enter Text here..."
            onChange={setValue}
            validation={validateInput}
            errorMessage="Input must be less than 7 characters" />
        </View>
        <View style={{ marginTop: 20 }}>
          <InputPassword
            label="Senha"
            value={password}
            placeholder="Digite sua senha"
            onChange={setPassword}
            showPasswordToggle={true}
            errorMessage="Senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula e número" />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}
        >
          <View style={{ paddingBottom: insets.bottom }}>
            <InputChat
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSend}
              placeholder="Digite sua mensagem..."
            />
          </View>
        </KeyboardAvoidingView>
        <View style={{ marginTop: 20 }} >
          <TextArea
            label="Mensagem"
            value={contactMessage}
            onChange={setContactMessage}
            placeholder="Digite sua mensagem aqui..."
            maxLength={100}
          />
        </View>
        <MainTitle text="Main Title" />
        <Subtitle text="Subtitle" />
        <Title text="Title" />
        <Text text="TextBox" />
        <Info text="Info" />
        <Title text="Grid Components" />
        <Grid columns={3} gap={4}>
          <Text text="Column 1" />
          <Text text="Column 2" />
          <Text text="Column 3" />
        </Grid>
        <Subtitle text="Grid with Cards (2 columns)" />
        <Grid columns={2} gap={4}>
          <Card>
            <Text text="Card 1" />
          </Card>
          <Card>
            <Text text="Card 2" />
          </Card>
          <Card>
            <Text text="Card 3" />
          </Card>
          <Card>
            <Text text="Card 4" />
          </Card>
        </Grid>
        <Grid columns={3} gap={0}>
          <GridItem>
              <Text text="Column 1" />
              <MainTitle text="Hello World" />
              <Image
                  src="https://picsum.photos/id/11/100/100"
                  alt="Placeholder image"
                  size="lg"
                  type="circle"
                  onClick={() => console.log("Image clicked!")}
              />
          </GridItem>
          <GridItem>
              <Text text="Column 2" />
              <Title text="Hello World" />
              <Image src="https://picsum.photos/id/1/100" alt="Logo placeholder" size="md" type="default" />
          </GridItem>
          <GridItem>
              <Text text="Column 3" />
              <Subtitle text="Hello World" />
              <Image
                  src="https://picsum.photos/id/10/100/100"
                  alt="Icon placeholder"
                  size="xl"
                  type="circle"
                  onClick={() => alert("Icon clicked!")}
              />
            <Text text="Column 1" />
            <MainTitle text="Hello World" />
            <Image
              src="https://picsum.photos/id/11/100/100"
              alt="Placeholder image"
              size="lg"
              type="circle"
              onClick={() => console.log("Image clicked!")}
            />
          </GridItem>
          <GridItem>
            <Text text="Column 2" />
            <Title text="Hello World" />
            <Image src="https://picsum.photos/id/1/100" alt="Logo placeholder" size="md" type="default" />
          </GridItem>
          <GridItem>
            <Text text="Column 3" />
            <Subtitle text="Hello World" />
            <Image
              src="https://picsum.photos/id/10/100/100"
              alt="Icon placeholder"
              size="xl"
              type="circle"
              onClick={() => alert("Icon clicked!")}
            />
          </GridItem>
          <Text text="Column 1" size="small" />
          <Text text="Column 2" level="success" />
          <Text text="Column 3" size="large" />
      </Grid>

        <Subtitle text="Custom Column Spans (10 columns grid)" />
        <Grid columns={10} gap={4}>
          <GridItem colSpan={3}>
            <Card>
              <></>
            </Card>
          </GridItem>
          <GridItem colSpan={5}>
            <Card>
              <></>
            </Card>
          </GridItem>
          <GridItem colSpan={2}>
            <Card>
              <></>
            </Card>
          </GridItem>
          <GridItem colSpan={4}>
            <Card>
              <></>
            </Card>
          </GridItem>
          <GridItem colSpan={6}>
            <Card>
              <></>
            </Card>
          </GridItem>
          <GridItem colSpan={2}>
            <Card>
              <></>
            </Card>
          </GridItem>
          <GridItem colSpan={4}>
            <Card>
              <></>
            </Card>
          </GridItem>
          <GridItem colSpan={4}>
            <Card>
              <></>
            </Card>
          </GridItem>
        </Grid>
      </Grid>
      <View style={{ marginTop: 20, marginBottom: 20 }}>
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
      </View>
      <Card>
        <Text text="Card" level="warning" />
      </Card>
      <Grid columns={1} gap={4}>
        <Title text="Stepper Component" />
        <Stepper
          text="Camiseta"
          min={0}
          max={10}
          value={shirtCount}
          onChange={setShirtCount}
        />
        <Stepper
          text="Calça"
          min={0}
          max={5}
          value={pantsCount}
          onChange={setPantsCount}
        />
      </Grid>
      <View style={{ marginTop: 20 }}>
        <Title text="Message Components" />
        <View style={{ backgroundColor: Constants.styles.backgroundColor.LIGHT_GRAY, marginTop: 10, borderRadius: 8 }}>
          <Message
            text="Blah?"
            onClick={() => console.log("Mensagem clicada!")}
            isOwn={false}
            senderName="Maria"
            timestamp="14:30"
            avatarUrl="https://picsum.photos/id/91/40/40"
          />
          <Message
            text="Blah blah blah  blah blah blah blah blah blah"
            onClick={() => console.log("Mensagem clicada!")}
            isOwn={true}
            timestamp="14:31"
            avatarUrl="https://picsum.photos/id/64/40/40"
          />
          <Message
            text="Blah blah blah  blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah"
            onClick={() => console.log("Mensagem clicada!")}
            isOwn={false}
            senderName="Maria"
            timestamp="14:32"
            avatarUrl="https://picsum.photos/id/91/40/40"
          />
          <Message
            text="Blah."
            onClick={() => console.log("Mensagem clicada!")}
            isOwn={true}
            timestamp="14:33"
            avatarUrl="https://picsum.photos/id/64/40/40"
          />
        </View>
      </View>
      <View style={{ marginTop: 30, marginBottom: 30 }}>
        <TextArea label="Mensagem" value={contactMessage} onChange={setContactMessage} placeholder="Digite sua mensagem aqui..." />
      </View>
      <View style={{ marginTop: 20 }}>
        <UserCardHorizontal
          user={sampleUser}
          onClick={() => console.log("Usuário clicado:", sampleUser.id)}
        />
        <UserCardHorizontal
          user={{ ...sampleUser, id: "2", name: "Maria Silva", rating: 5, ordersCount: 48 }}
          onClick={() => console.log("Usuário clicado: 2")}
        />
      </View>
      <View style={{ marginTop: 30, marginBottom: 30 }}>
        <Grid columns={1} gap={2}>
          <GridItem>
            <Title text="Text list" />
          </GridItem>
          <GridItem>
            <TextList
              texts={[
                "1x Calça Tiroliro",
                "2x Blusa xpto etc",
                "5x Camiseta de banda",
                "3x Pares de meia",
                "1x Edredom",
              ]}
            />
          </GridItem>
        </Grid>
      </View>
      <View style={{ marginTop: 20, padding: 20 }}>
        <Alert
          text="O pagamento deve ser efetuado antes da data de vencimento."
        />
      </View>
      <View style={{ marginTop: 20 }} >
        <List title="Lista de exemplo">
          <Text text="Item 1" />
          <Text text="Item 2" />
          <Text text="Item 3" />
        </List>
      </View>
      <View style={{
        marginTop: 40,
        padding: 20,
        width: "100%",
        maxWidth: 300,
        backgroundColor: "#F8F9FA",
        borderRadius: 8
      }}>
        <MainTitle text="UserInfo Demo" />
        <View style={{ marginTop: 20 }}>
          <Grid columns={1} gap={4}>
            <UserInfo
              user={sampleUser}
              type="name"
              onClick={() => alert('Nome clicado!')}
            />

            <UserInfo
              user={sampleUser}
              type="email"
              onClick={() => alert('Email clicado!')}
            />

            <UserInfo
              user={sampleUser}
              type="phone"
            />

            <UserInfo
              user={sampleUser}
              type="bio"
            />

            <UserInfo
              user={sampleUser}
              type="company"
              onClick={() => alert('Empresa clicada!')}
            />
          </Grid>
        </View>
      </View>

      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Title text="Icons" />
      </View>

      <Card title="⭐ Avaliação e Favoritos">
        <Stars rating={3.5} size={32} />
      </Card>

      <Card title="🏠 Navegação">
        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          <IconHome fill="#4A90E2" width={32} height={32} />
          <IconArrowLeft fill="#4A90E2" width={32} height={32} />
          <IconArrowRight fill="#4A90E2" width={32} height={32} />
          <IconChevronLeft fill="#4A90E2" width={32} height={32} />
          <IconChevronRight fill="#4A90E2" width={32} height={32} />
        </View>
      </Card>
      <Card title="✉️ Ações">
        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          <IconSend fill="#34C759" width={32} height={32} />
          <IconPlus fill="#34C759" width={32} height={32} />
          <IconMinus fill="#FF9500" width={32} height={32} />
          <IconClose fill="#FF3B30" width={32} height={32} />
          <IconTrash fill="#FF3B30" width={32} height={32} />
        </View>
      </Card>

      <Card title="🔍 Pesquisa e Filtro">
        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          <IconSearch fill="#8E8E93" width={32} height={32} />
          <IconFilter fill="#8E8E93" width={32} height={32} />
        </View>
      </Card>

      <Card title="👤 Usuário e Perfil">
        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          <IconProfile fill="#5856D6" width={32} height={32} />
          <IconEye fill="#5856D6" width={32} height={32} />
          <IconEyeClosed fill="#5856D6" width={32} height={32} />
        </View>
      </Card>

      <Card title="💬 Comunicação">
        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          <IconMessage fill="#007AFF" width={32} height={32} />
          <IconHistory fill="#007AFF" width={32} height={32} />
        </View>
      </Card>

      <Card title="🖼️ Mídia e Alertas">
        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          <IconImage fill="#AF52DE" width={32} height={32} />
          <IconExclamation fill="#FF9500" width={32} height={32} />
        </View>
      </Card>
    </ScrollView >
  )
}

const validateInput = (value: string) => {
  return value.length < 7;
}
