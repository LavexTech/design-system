import React from "react"
import { TouchableOpacity } from "react-native"
import { TextBox as Text } from "../Text/Text"
import { Grid, GridItem } from "../Grid/Grid"
import { Subtitle } from "../Subtitle/Subtitle"

type UserInfoProps = {
  user: { [key: string]: any },
  type: string,
  label?: string,
  onClick?: () => void,
}
export const UserInfo: React.FC<UserInfoProps> = ({ user, type, label, onClick }) => {
  const getLabel = (type: string): string => {
    const labels: { [key: string]: string } = { 
      name: "Nome",
      email: "E-mail",
      phone: "Telefone",
      address: "Endereço",
      bio: "Bio",
      age: "Idade",
      city: "Cidade",
      country: "País",
      website: "Website",
      company: "Empresa",
      position: "Cargo",
      department: "Departamento",
    }
    return labels[type] || type.charAt(0).toUpperCase() + type.slice(1)
  }

  const getValue = (user: any, type: string): string => {
    return user[type] || "";
  }

  const displayLabel = label || getLabel(type)
  const value = getValue(user, type)

  const Content = () => (
    <Grid columns={1} gapY={2}>
      <GridItem colSpan={1}>
        <Subtitle text={displayLabel} />
      </GridItem>
      <GridItem colSpan={1}>
        <Text text={value} />
      </GridItem>
    </Grid>
  )

  if (onClick) {
    return (
      <TouchableOpacity onPress={onClick}>
        <Content />
      </TouchableOpacity>
    )
  }

  return <Content />
}
