import React from "react"
import { TextBox as Text } from "../Text/Text"
import { View, StyleSheet, Dimensions } from "react-native"
import { IconExclamation } from "../Icons/IconExclamation"
import { Grid, GridItem } from "../Grid/Grid"
import Constants from "../../constants/constants"
import { Card } from "../Card/Card"

type AlertProps = {
    text: string
}

export const Alert: React.FC<AlertProps> = ({ text }) => {

    return (
        <Card>
            <Grid columns={1} gap={4}>
                <GridItem>
                    <View style={styles.iconContainer}>
                        <IconExclamation width={48} height={48} />
                    </View>
                </GridItem>
                <GridItem>
                    <View style={styles.textContainer}>
                        <Text text={text} size="medium" position="center" />
                    </View>
                </GridItem>
            </Grid>
        </Card>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})