import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Grid } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Info } from "@src/components/Info/Info";

export const GridDemo: React.FC = () => {
    return (
        <ScrollView style={styles.container}>
            <MainTitle text="Grid Demo" />

            <View style={styles.section}>
                <Subtitle text="Grid com 1 Coluna" />
                <Info text="Layout básico com 1 coluna" />

                <Grid columns={1}>
                    <View style={styles.cardWithBorder}>
                        <Card title="Item 1">
                            <Info text="Conteúdo do primeiro item" />
                        </Card>
                    </View>
                    <View style={styles.cardWithBorder}>
                        <Card title="Item 2">
                            <Info text="Conteúdo do segundo item" />
                        </Card>
                    </View>
                    <View style={styles.cardWithBorder}>
                        <Card title="Item 3">
                            <Info text="Conteúdo do terceiro item" />
                        </Card>
                    </View>
                    <View style={styles.cardWithBorder}>
                        <Card title="Item 4">
                            <Info text="Conteúdo do quarto item" />
                        </Card>
                    </View>
                </Grid>
            </View>

            <View style={styles.section}>
                <Subtitle text="Grid com 2 Colunas" />
                <Info text="Layout com 2 colunas" />

                <Grid columns={2} gap={0}>
                    <View style={styles.cardWithBorder}>
                        <Card title="A">
                            <Info text="Item A" />
                        </Card>
                    </View>
                    <View style={styles.cardWithBorder}>
                        <Card title="B">
                            <Info text="Item B" />
                        </Card>
                    </View>
                    <View style={styles.cardWithBorder}>
                        <Card title="C">
                            <Info text="Item C" />
                        </Card>
                    </View>
                    <View style={styles.cardWithBorder}>
                        <Card title="D">
                            <Info text="Item D" />
                        </Card>
                    </View>
                    <View style={styles.cardWithBorder}>
                        <Card title="E">
                            <Info text="Item E" />
                        </Card>
                    </View>
                    <View style={styles.cardWithBorder}>
                        <Card title="F">
                            <Info text="Item F" />
                        </Card>
                    </View>
                </Grid>
            </View>

            <View style={styles.section}>
                <Subtitle text="Grid com 3 Colunas" />
                <Info text="Layout compacto com 3 colunas" />

                <Grid columns={3} gap={1}>
                    <View style={styles.cardWithBorder}>
                        <Card title="1">
                            <Info text="Item 1" />
                        </Card>
                    </View>
                    <View style={styles.cardWithBorder}>
                        <Card title="2">
                            <Info text="Item 2" />
                        </Card>
                    </View>
                    <View style={styles.cardWithBorder}>
                        <Card title="3">
                            <Info text="Item 3" />
                        </Card>
                    </View>
                    <View style={styles.cardWithBorder}>
                        <Card title="4">
                            <Info text="Item 4" />
                        </Card>
                    </View>
                    <View style={styles.cardWithBorder}>
                        <Card title="5">
                            <Info text="Item 5" />
                        </Card>
                    </View>
                    <View style={styles.cardWithBorder}>
                        <Card title="6">
                            <Info text="Item 6" />
                        </Card>
                    </View>
                    <View style={styles.cardWithBorder}>
                        <Card title="7">
                            <Info text="Item 7" />
                        </Card>
                    </View>
                    <View style={styles.cardWithBorder}>
                        <Card title="8">
                            <Info text="Item 8" />
                        </Card>
                    </View>
                </Grid>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    section: {
        marginBottom: 30,
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardWithBorder: {
        borderWidth: 2,
        borderColor: "#000000",
        borderRadius: 8,
    },
});