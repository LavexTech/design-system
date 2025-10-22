import React from "react"
import { List } from "../List/List"
import { TextBox } from "../Text/Text"

type TextListProps = {
  texts: string[]
}

export const TextList: React.FC<TextListProps> = ({ texts }: TextListProps) => {
  const textComponents = texts.map((text, index) => (
    <TextBox key={index} text={text} />
  ))

  return <List>{textComponents}</List>
}
