# Lavex Design System Documentation

This documentation describes the Lavex Design System components and capabilities for AI usage.

## Setup

To use these components, ensure the `GluestackUIProvider` is wrapped around your application root (many components handle this internally, but it's good practice).
Also, `Constants` are used for styling tokens.

## Tokens (Constants)

Located in `src/constants/constants.ts`.

### Colors (`Constants.styles.textColor` / `backgroundColor`)
- **Text**: DEFAULT, PRIMARY, SUCCESS, DANGER, INFO, WARNING
- **Background**: WHITE, LIGHT_GRAY, GRAY
- **Main Palette**: BLUE, GOLD, MEDIUM_GRAY, SOFT_BLUE

### Spacing (`Constants.styles.spacing`)
- TINY (4), SMALL (8), MEDIUM (16), LARGE (24), EXTRA_LARGE (32)

### Typography (`Constants.styles.fontSize`)
- SMALL (14), MEDIUM (18), LARGE (20), LARGER (24), LARGEST (36)

## Components

### Layout

#### `Grid`
Layout container based on a 12-column grid system.
- **Props**:
  - `children`: ReactNode
  - `columns`: number (default: 12)
  - `gap`: number (gap between items)
  - `gapX`: number
  - `gapY`: number
- **Usage**:
  ```tsx
  <Grid columns={2} gap={4}>
    <GridItem colSpan={1}><Text text="Item 1" /></GridItem>
    <GridItem colSpan={1}><Text text="Item 2" /></GridItem>
  </Grid>
  ```

#### `Divider`
A simple horizontal line separator.
- **Props**: None.

#### `NavigationBar`
Bottom navigation bar.
- **Props**:
  - `pages`: string[] (List of page names)
  - `activePage`: string
  - `icons`: ((isActive: boolean) => ReactNode)[]
  - `onNavigate`: (page: string) => void

#### `Accordion`
Collapsible content sections.
- **Props**:
  - `children`: ReactNode (AccordionItem components)
- **Subcomponent**: `AccordionItem`
  - `id`: string
  - `title`: string
  - `children`: ReactNode

---

### Inputs

#### `Button`
Standard button component.
- **Props**:
  - `text`: string
  - `variant`: "default" | "default-outline" | "success" | "danger" | "success-outline" | "danger-outline"
  - `onClick`: () => void

#### `Input` (Base)
Generic text input field.
- **Props**:
  - `label`: string
  - `value`: string
  - `placeholder`: string
  - `onChange`: (value: string) => void
  - `validation`: (value: string) => boolean
  - `errorMessage`: string
  - `mask`: string
  - `mobileKeyboard`: "text" | "email" | "phone" | "number"
  - `secureTextEntry`: boolean
  - `isMultiline`: boolean

#### `InputName`
Input specialized for names with capitalization logic.
- **Props**: `label`, `value`, `placeholder`, `onChange`.

#### `InputEmail`
Input with email validation.
- **Props**: `value`, `onChange`, `label`, `placeholder`, `errorMessage`.

#### `InputPhone`
Input with phone masking `(00) 00000-0000`.
- **Props**: `value`, `onChange`, `label`, `placeholder`, `errorMessage`.

#### `InputCPF`
Input with Brazilian CPF masking `000.000.000-00` and validation.
- **Props**: `value`, `onChange`, `label`, `placeholder`, `errorMessage`.

#### `InputPassword`
Password input with visibility toggle.
- **Props**:
  - `label`: string
  - `value`: string
  - `onChange`: (value: string) => void
  - `showPasswordToggle`: boolean (default: true)

#### `InputChat`
Input field with a send button, designed for chat interfaces.
- **Props**:
  - `value`: string
  - `onChange`: (value: string) => void
  - `onSend`: () => void
  - `placeholder`: string

#### `TextArea`
Multiline text input with character counter.
- **Props**:
  - `label`: string
  - `value`: string
  - `onChange`: (value: string) => void
  - `maxLength`: number

#### `Stepper`
Number increment/decrement control.
- **Props**:
  - `text`: string (Label)
  - `value`: number
  - `min`: number
  - `max`: number
  - `onChange`: (value: number) => void
  - `onDelete`: () => void (Optional delete button)
  - `onEdit`: () => void (Optional edit button)

#### `Stars`
Star rating display (read-only/static based on implementation).
- **Props**:
  - `rating`: number (0-5)
  - `size`: number (default: 24)

---

### Data Display

#### `Text` (Exported as `TextBox` internally, usually imported as `Text`)
Standard text component.
- **Props**:
  - `text`: string
  - `size`: "small" | "medium" | "large"
  - `level`: "success" | "error" | "warning" | "default" | "primary"
  - `position`: "left" | "center" | "right"

#### `Title`
Large title text.
- **Props**: `text`: string

#### `MainTitle`
Largest title text.
- **Props**: `text`: string

#### `Subtitle`
Medium-large title text.
- **Props**: `text`: string

#### `Info`
Small, gray informational text.
- **Props**: `text`: string

#### `Image`
Image component with support for circle/rounded shapes.
- **Props**:
  - `src`: string (URL)
  - `alt`: string
  - `size`: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  - `type`: "default" | "circle"
  - `onClick`: () => void

#### `Gallery`
Horizontal scrollable list of images.
- **Props**:
  - `images`: string[] (URLs)
  - `onClick`: (imageUrl: string, index: number) => void

#### `List`
Vertical list container.
- **Props**:
  - `title`: string (Optional header)
  - `children`: ReactNode

#### `TextList`
Simple list of text items.
- **Props**: `texts`: string[]

---

### Feedback

#### `Alert`
Warning card with an exclamation icon.
- **Props**: `text`: string

#### `Message`
Chat message bubble.
- **Props**:
  - `text`: string
  - `isOwn`: boolean (true for sent, false for received)
  - `timestamp`: string
  - `senderName`: string
  - `avatarUrl`: string
  - `onClick`: () => void

#### `Modal`
Overlay dialog.
- **Props**:
  - `title`: string
  - `children`: ReactNode
  - `visible`: boolean
  - `onClose`: () => void
  - `modalStyle`: "info" | "confirm" | "save"
  - `onSave`: () => void
  - `onConfirm`: () => void

---

### Business / Complex Components

#### `Card`
Generic container with shadow and border.
- **Props**:
  - `title`: string
  - `children`: ReactNode
  - `onClick`: () => void

#### `UserCardHorizontal`
Displays user info (Avatar, Name, Orders, Rating) horizontally.
- **Props**:
  - `user`: User object ({ id, name, profileImage, ordersCount, rating })
  - `onClick`: () => void

#### `UserCardVertical`
Displays user info vertically (centered).
- **Props**:
  - `user`: User object
  - `onClick`: () => void

#### `UserCardBio`
Detailed user card with Bio section.
- **Props**:
  - `user`: User object (includes `bio`)
  - `onClick`: () => void

#### `UserInfo`
Displays a specific field of user information (Label + Value).
- **Props**:
  - `user`: Object
  - `type`: "name" | "email" | "phone" | "address" | "bio" | "age" | "city" | "country"
  - `label`: string (Optional override)
  - `onClick`: () => void

#### `UserList`
List of `UserCardHorizontal` items.
- **Props**:
  - `users`: User[]
  - `onUserClick`: (user: User) => void

#### `Offer`
Displays an offer (Amount, Distance, User info).
- **Props**:
  - `amount`: number
  - `distance`: number
  - `user`: User object
  - `onClick`: () => void

#### `OfferList`
List of `Offer` items.
- **Props**: `offers`: OfferProps[]

#### `Order`
Displays order details (Title, Date, Gallery, Items list).
- **Props**:
  - `order`: { id, title, createdAt: Date, itemList: { quantity, name }[], images?: string[] }

---

### Icons
Located in `src/components/Icons/`.
Available icons:
- `IconArrowLeft`, `IconArrowRight`
- `IconChevronLeft`, `IconChevronRight`
- `IconClose`, `IconEdit`, `IconTrash`, `IconPlus`, `IconMinus`
- `IconEye`, `IconEyeClosed`, `IconExclamation`
- `IconFilter`, `IconSearch`, `IconHistory`, `IconHome`
- `IconImage`, `IconMessage`, `IconProfile`, `IconSend`
- `IconStar`, `IconStarHalf`

Common Props: `width`, `height`, `fill`, `stroke`.

