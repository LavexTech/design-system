import React, { useState } from "react"
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native"

import Constants from "@src/constants/constants"

// Texts
import { MainTitle } from "@src/components/MainTitle/MainTitle"
import { Subtitle } from "@src/components/Subtitle/Subtitle"
import { Title } from "@src/components/Title/Title"
import { TextBox as Text } from "@src/components/Text/Text";
import { UserInfo } from "@src/components/UserInfo/UserInfo"
import { TextArea } from "@src/components/TextArea/TextArea"
import { Info } from "@src/components/Info/Info"

// Inputs
import { Input } from "@src/components/Input/Input"
import { InputName } from "@src/components/InputName/InputName"
import { InputPhone } from "@src/components/InputPhone/InputPhone"
import { InputChat } from "@src/components/InputChat/InputChat"

// User Cards
import { UserCardBio } from "@src/components/UserCardBio/UserCardBio"
import { UserCardHorizontal } from "@src/components/UserCardHorizontal/UserCardHorizontal"
import { UserCardVertical } from "@src/components/UserCardVertical/UserCardVertical"

// Lists
import { List } from "@src/components/List/List"
import { TextList } from "@src/components/TextList/TextList"
import { UserList } from "@src/components/UserList/UserList"

// Others
import { Accordion, AccordionItem } from "@src/components/Accordion/Accordion"
import { Grid, GridItem } from "@src/components/Grid/Grid"
import { Card } from "@src/components/Card/Card"
import { Message } from "@src/components/Message/Message"
import { InputPassword } from "@src/components/InputPassword/InputPassword"
import { Image } from "@src/components/Image/Image"
import { Stepper } from "@src/components/Stepper/Stepper"
import { Alert } from "@src/components/Alert/Alert"
import { Stars } from "@src/components/Stars/Stars"
import { Modal } from "@src/components/Modal/Modal"
import { Button } from "@src/components/Button/Button"
import { Order } from "@src/components/Order/Order";
import { Offer } from "@src/components/Offer/Offer"

// Icons
import { IconHome } from "@src/components/Icons/IconHome"
import { IconArrowLeft } from "@src/components/Icons/IconArrowLeft"
import { IconArrowRight } from "@src/components/Icons/IconArrowRight"
import { IconChevronLeft } from "@src/components/Icons/IconChevronLeft"
import { IconChevronRight } from "@src/components/Icons/IconChevronRight"
import { IconSend } from "@src/components/Icons/IconSend"
import { IconPlus } from "@src/components/Icons/IconPlus"
import { IconMinus } from "@src/components/Icons/IconMinus"
import { IconClose } from "@src/components/Icons/IconClose"
import { IconTrash } from "@src/components/Icons/IconTrash"
import { IconSearch } from "@src/components/Icons/IconSearch"
import { IconFilter } from "@src/components/Icons/IconFilter"
import { IconProfile } from "@src/components/Icons/IconProfile"
import { IconEye } from "@src/components/Icons/IconEye"
import { IconEyeClosed } from "@src/components/Icons/IconEyeClosed"
import { IconMessage } from "@src/components/Icons/IconMessage"
import { IconHistory } from "@src/components/Icons/IconHistory"
import { IconImage } from "@src/components/Icons/IconImage"
import { IconExclamation } from "@src/components/Icons/IconExclamation"
import { Gallery } from "@src/components/Gallery/Gallery"


export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [value, setValue] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    console.log("Mensagem enviada:", inputValue);
    setInputValue("");
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://picsum.photos/id/10/200/200",
    "https://picsum.photos/id/11/200/200",
    "https://picsum.photos/id/12/200/200",
    "https://picsum.photos/id/13/200/200",
  ];
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
    <>
      <ScrollView
        style={{ flex: 1, padding: 20 }}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 40 }}
        showsVerticalScrollIndicator={true}
      >

{/* Inputs */}

      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <Subtitle text="Inputs" />
      </View>

      <Card>
        <Grid columns={1} gap={4}>
          <InputPhone
            value={phone}
            onChange={setPhone}
            errorMessage="Por favor, insira um telefone válido"
          />

          <InputName
            label="Nome Completo"
            value={userName}
            placeholder="Digite seu nome completo"
            onChange={setUserName}
          />

          <Input
            label="Input"
            value={value}
            placeholder="Enter Text here..."
            onChange={setValue}
            validation={validateInput}
            errorMessage="Input must be less than 7 characters"
          />

          <InputPassword
            label="Senha"
            value={password}
            placeholder="Digite sua senha"
            onChange={setPassword}
            showPasswordToggle={true}
            errorMessage="Senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula e número"
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}
          >
            <InputChat
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSend}
              placeholder="Digite sua mensagem..."
            />
          </KeyboardAvoidingView>

          <TextArea
            label="Mensagem"
            value={contactMessage}
            onChange={setContactMessage}
            placeholder="Digite sua mensagem aqui..."
            maxLength={100}
          />
        </Grid>
      </Card>

{/* Texts */}

      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <Subtitle text="Texts" />
      </View>

      <Card>
        <Grid columns={1} gap={4}>
          <MainTitle text="Main Title" />
          <Title text="Title" />
          <Subtitle text="Subtitle" />
          <Text text="TextBox" />
          <Info text="Info" />
        </Grid>
      </Card>

{/* Buttons */}

      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <Subtitle text="Buttons" />
      </View>

      <Card>
        <Grid columns={1} gap={4}>
          <Button text="Default" onClick={() => console.log("Default")} />
          <Button text="Success" onClick={() => console.log("Success")} variant="success" />
          <Button text="Danger" onClick={() => console.log("Danger")} variant="danger" />
          <Button text="Default Outline" onClick={() => console.log("Outline")} variant="default-outline" />
          <Button text="Success Outline" onClick={() => console.log("Success Outline")} variant="success-outline" />
          <Button text="Danger Outline" onClick={() => console.log("Danger Outline")} variant="danger-outline" />
          <Button text="Mostrar Modal" onClick={() => setShowModal(true)} />
        </Grid>
      </Card>

{/* Images */}

      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <Subtitle text="Images" />
      </View>

      <Card>
        <Grid columns={3} gap={2}>
          <GridItem colSpan={1}>
            <View style={{ height: 100, width: 100, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                src="https://picsum.photos/id/1/100/"
                alt="Placeholder image"
                size="lg"
                type="circle"
                onClick={() => console.log("Image clicked!")}
              />
            </View>
          </GridItem>
          <GridItem colSpan={1}>
            <View style={{ height: 100, width: 100, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                src="https://picsum.photos/id/2/100"
                alt="Logo placeholder"
                size="md"
                type="default"
              />
            </View>
          </GridItem>
          <GridItem colSpan={1}>
            <View style={{ height: 100, width: 100, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                src="https://picsum.photos/id/3/100/"
                alt="Placeholder image"
                size="xs"
                type="circle"
                onClick={() => console.log("Image clicked!")}
              />
            </View>
          </GridItem>
        </Grid>
      </Card>

{/* Grid */}

      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <Subtitle text="Grid" />
      </View>

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

{/* Accordion */}

      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <Subtitle text="Accordion" />
      </View>

      <Card>
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
      </Card>

{/* User Cards */}

      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <Subtitle text="User Cards" />
      </View>

      <Grid columns={1} gap={1}>
        <UserCardBio
          user={sampleUser}
          onClick={() => console.log("Usuário clicado:", sampleUser.id)}
        />
      </Grid>

      <Grid columns={1} gap={1}>
        <UserCardHorizontal
          user={sampleUser}
          onClick={() => console.log("Usuário clicado:", sampleUser.id)}
        />
      </Grid>

      <Grid columns={2} gap={1}>
        <UserCardVertical
          user={sampleUser}
          onClick={() => { }}
        />
      </Grid>

{/* Stepper */}

      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Subtitle text="Stepper" />
      </View>

      <Card>
        <Grid columns={1} gap={4}>
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
      </Card>
    
{/* Gallery */}

      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Subtitle text="Gallery" />
      </View>

      <Card>
        <Gallery
          images={images}
          onClick={(imageUrl: string, index: number) => {
            setCurrentImageIndex(index);
            setShowGalleryModal(true);
            console.log(`Clicked image ${index + 1}:`, imageUrl);
          }}
        />
      </Card>

{/* Message */}

      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Subtitle text="Message" />
      </View>

      <View style={{ backgroundColor: Constants.styles.backgroundColor.WHITE, borderRadius: 8 }}>
        <Message
          text="Blah?"
          onClick={() => console.log("Mensagem clicada!")}
          isOwn={false}
          senderName="Maria"
          timestamp="14:30"
          avatarUrl="https://picsum.photos/id/91/40/40"
        />
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

{/* Alert */}

      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Subtitle text="Alert" />
      </View>

      <Alert
        text="O pagamento deve ser efetuado antes da data de vencimento."
      />

{/* Lists */}

      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Subtitle text="List" />
      </View>

      <Card>
        <List title="Itens">
          <Text text="Item 1" />
          <Text text="Item 2" />
          <Text text="Item 3" />
        </List>
      </Card>

      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Subtitle text="Text List" />
      </View>

      <Card>
        <TextList
          texts={[
            "1x Calça Tiroliro",
            "2x Blusa xpto etc",
            "5x Camiseta de banda",
            "3x Pares de meia",
            "1x Edredom",
          ]}
        />
      </Card>

      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Subtitle text="UserInfo" />
      </View>

      <Card>
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
      </Card>

      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Subtitle text="UserList" />
      </View>

      <Card>
        <UserList
          users={[sampleUser, sampleUser, sampleUser]}
            onUserClick={() => console.log("Usuário clicado:", sampleUser.id)}
          />
      </Card>

{/* Order */}

      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Subtitle text="Order" />
      </View>

      <Order 
        title="Pedido 1" 
        createdAt={new Date()} 
        itemList={[{ quantity: 1, name: "Camiseta" }, { quantity: 2, name: "Calça" }, { quantity: 3, name: "Camiseta" }]} 
        images={["https://picsum.photos/id/1/200/200", "https://picsum.photos/id/2/200/200"]} 
      />

{/* Offer */}

      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Subtitle text="Offer" />
      </View>

      <Offer amount={100} distance={10} user={sampleUser} />

{/* Icons */}

      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Subtitle text="Icons" />
      </View>

      <Card title="Stars">
        <Stars rating={3.5} size={32} />
      </Card>

      <Card title="Icons">
        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          <IconHome fill="#4A90E2" width={32} height={32} />
          <IconArrowLeft fill="#4A90E2" width={32} height={32} />
          <IconArrowRight fill="#4A90E2" width={32} height={32} />
          <IconChevronLeft fill="#4A90E2" width={32} height={32} />
          <IconChevronRight fill="#4A90E2" width={32} height={32} />
          <IconSend fill="#34C759" width={32} height={32} />
          <IconPlus fill="#34C759" width={32} height={32} />
          <IconMinus fill="#FF9500" width={32} height={32} />
          <IconClose fill="#FF3B30" width={32} height={32} />
          <IconTrash fill="#FF3B30" width={32} height={32} />
          <IconSearch fill="#8E8E93" width={32} height={32} />
          <IconFilter fill="#8E8E93" width={32} height={32} />
          <IconProfile fill="#5856D6" width={32} height={32} />
          <IconEye fill="#5856D6" width={32} height={32} />
          <IconEyeClosed fill="#5856D6" width={32} height={32} />
          <IconMessage fill="#007AFF" width={32} height={32} />
          <IconHistory fill="#007AFF" width={32} height={32} />
          <IconImage fill="#AF52DE" width={32} height={32} />
          <IconExclamation fill="#FF9500" width={32} height={32} />
        </View>
      </Card>
    </ScrollView>
    {showModal && (
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
        <Modal
          title="Exemplo de Modal"
          onClose={() => setShowModal(false)}
          visible={showModal}
          modalStyle="confirm"
        >
          <Text
            size="small"
            text="Este é um exemplo de como usar o componente Modal com suas propriedades. Você pode personalizar o título, texto e botão."
            level="default"
            position="center"
          />
        </Modal>
      </View>
      )
    }
    {showGalleryModal && (
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
        <Modal
          title={`Imagem ${currentImageIndex + 1} de ${images.length}`}
          onClose={() => setShowGalleryModal(false)}
          visible={showGalleryModal}
          modalStyle="info"
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              src={images[currentImageIndex]}
              alt="Imagem da galeria"
              size="2xl"
              type="default"
            />
          </View>
        </Modal>
      </View>
      )
    }
    </>
  )
}

const validateInput = (value: string) => {
  return value.length < 7;
}
