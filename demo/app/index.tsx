import { ScrollView, View } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Info } from "@src/components/Info/Info";
import { Grid } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { IconStar } from "@src/components/Icons/IconStar";
import { IconStarHalf } from "@src/components/Icons/IconStarHalf";
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

export default function Index() {
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
      
      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Title text="Icons" />
      </View>
      
      <Card title="Stars & Rating">
        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          <IconStar fill="#FFD700" width={32} height={32} />
          <IconStarHalf fill="#FFD700" width={32} height={32} />
        </View>
      </Card>

      <Card title="Navigation">
        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          <IconHome fill="#4A90E2" width={32} height={32} />
          <IconArrowLeft fill="#4A90E2" width={32} height={32} />
          <IconArrowRight fill="#4A90E2" width={32} height={32} />
          <IconChevronLeft fill="#4A90E2" width={32} height={32} />
          <IconChevronRight fill="#4A90E2" width={32} height={32} />
        </View>
      </Card>

      <Card title="Actions">
        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          <IconSend fill="#34C759" width={32} height={32} />
          <IconPlus fill="#34C759" width={32} height={32} />
          <IconMinus fill="#FF9500" width={32} height={32} />
          <IconClose fill="#FF3B30" width={32} height={32} />
          <IconTrash fill="#FF3B30" width={32} height={32} />
        </View>
      </Card>

      <Card title="Search & Filter">
        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          <IconSearch fill="#8E8E93" width={32} height={32} />
          <IconFilter fill="#8E8E93" width={32} height={32} />
        </View>
      </Card>

      <Card title="User & Profile">
        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          <IconProfile fill="#5856D6" width={32} height={32} />
          <IconEye fill="#5856D6" width={32} height={32} />
          <IconEyeClosed fill="#5856D6" width={32} height={32} />
        </View>
      </Card>

      <Card title="Communication">
        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          <IconMessage fill="#007AFF" width={32} height={32} />
          <IconHistory fill="#007AFF" width={32} height={32} />
        </View>
      </Card>

      <Card title="Media & Alerts">
        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          <IconImage fill="#AF52DE" width={32} height={32} />
          <IconExclamation fill="#FF9500" width={32} height={32} />
        </View>
      </Card>
    </ScrollView>
  )
}