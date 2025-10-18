import { ScrollView } from "react-native"
import { MainTitle } from "@src/components/MainTitle/MainTitle"
import { Subtitle } from "@src/components/Subtitle/Subtitle"
import { Title } from "@src/components/Title/Title"
import { TextBox as Text } from "@src/components/Text/Text"
import { Image } from "@src/components/Image/Image"
import { Info } from "@src/components/Info/Info"
import { Grid, GridItem } from "@src/components/Grid/Grid"
import { Card } from "@src/components/Card/Card"

export default function Index() {
    return (
        <ScrollView style={{ flex: 1, padding: 20 }} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={true}>
            <Grid columns={1} gap={2}>
                <MainTitle text="Main Title" />
                <Subtitle text="Subtitle" />
                <Title text="Title" />
                <Text text="TextBox" />
                <Info text="Info" />
                <Title text="Grid Components" />
                <Grid columns={3} gap={0}>
                    <>
                        <Text text="Column 1" />
                        <MainTitle text="Hello World" />
                        <Image
                            src="https://picsum.photos/id/11/100/100"
                            alt="Placeholder image"
                            size="lg"
                            type="circle"
                            onClick={() => console.log("Image clicked!")}
                        />
                    </>
                    <>
                        <Text text="Column 2" />
                        <Title text="Hello World" />
                        <Image src="https://picsum.photos/id/1/100" alt="Logo placeholder" size="md" type="default" />
                    </>
                    <>
                        <Text text="Column 3" />
                        <Subtitle text="Hello World" />
                        <Image
                            src="https://picsum.photos/id/10/100/100"
                            alt="Icon placeholder"
                            size="xl"
                            type="circle"
                            onClick={() => alert("Icon clicked!")}
                        />
                    </>
                    <Text text="Column 1" size="small" />
                    <Text text="Column 2" level="success" />
                    <Text text="Column 3" size="large" />
                </Grid>
                <Card>
                    <Text text="Card" level="warning" />
                </Card>
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
        </ScrollView>
    )
}
