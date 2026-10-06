const Constants = {
  styles: {
    fontSize: {
      LARGEST: 36,
      LARGER: 24,
      LARGE: 20,
      MEDIUM: 18,
      SMALL: 14,
      DISPLAY: 28,
      TITLE: 22,
      ACTION: 17,
      BODY: 16,
      SUBTITLE: 15,
      LABEL: 14,
      CAPTION: 13,
    },
    lineHeight: {
      LARGEST: 30,
      LARGER: 26,
      LARGE: 22,
      MEDIUM: 18,
      SMALL: 14,
      DISPLAY: 34,
      TITLE: 28,
      ACTION: 22,
      BODY: 24,
      SUBTITLE: 22,
      LABEL: 20,
      CAPTION: 18,
    },
    fontWeight: {
      BOLD: "700" as any,
      NORMAL: "400" as any,
      THIN: "100" as any,
    },
    fontFamily: {
      REGULAR: "PlusJakartaSans-Regular",
      MEDIUM: "PlusJakartaSans-Medium",
      SEMIBOLD: "PlusJakartaSans-SemiBold",
      BOLD: "PlusJakartaSans-Bold",
    },
    textColor: {
      DEFAULT: "#2D3B42",
      PRIMARY: "#007AFF",
      SUCCESS: "#059669",
      DANGER: "#DC2626",
      INFO: "#8F98AD",
      WARNING: "#F59E0B",
    },
    backgroundColor: {
      WHITE: "#FFFFFF",
      LIGHT_GRAY: "#E5E1E6",
      GRAY: "#E5E1E6",
    },
    borderColor: {
      LIGHT: "#E5E1E6",
      MEDIUM: "#CED4DA",
    },
    spacing: {
      TINY: 4,
      SMALL: 8,
      MEDIUM: 16,
      LARGE: 24,
      EXTRA_LARGE: 32,
    },
    borderRadius: {
      SMALL: 4,
      MEDIUM: 8,
      LARGE: 12,
      XL: 14,
      "2XL": 16,
      "3XL": 20,
      PILL: 24,
      FULL: 999,
    },
    borderWidth: {
      THIN: 0.4,
      REGULAR: 0.8,
      THICK: 1.2,
      HAIRLINE: 1,
      INTERACTIVE: 1.5,
    },
    componentSize: {
      BUTTON_HEIGHT: 40,
      BUTTON_WIDTH: 40,
      BUTTON_HEIGHT_LG: 56,
      INPUT_HEIGHT: 52,
      TOUCH_TARGET: 44,
      INPUT_MIN_WIDTH: 50,
      NAVIGATION_BAR_HEIGHT: 76,
    },
    brand: {
      PRIMARY: "#3CDBC0",
      DARK: "#0B7566",
      DEEP: "#08706D",
      SURFACE: "#2D3B42",
    },
    surface: {
      DEFAULT: "#FFFFFF",
      MUTED: "#E5E1E6",
      SUBTLE: "#FAF9FA",
      INFO: "#EEFBF8",
      ACCENT: "#E2FAF6",
      ILLUSTRATION: "#E6F7F6",
    },
    text: {
      DEFAULT: "#2D3B42",
      MUTED: "#5A6A72",
      PLACEHOLDER: "#66757D",
      LINK: "#0B7566",
      DANGER: "#C62828",
    },
    border: {
      SOFT: "#E5E1E6",
      INTERACTIVE: "#869199",
      SUBTLE: "#D5DCDF",
    },
    feedback: {
      DANGER_SURFACE: "#FDECEC",
      WARNING_SURFACE: "#FFF4E5",
      WARNING_TEXT: "#8A5A00",
    },
    color: {
      WHITE: "#FFFFFF",
      BLACK: "#000000",
      GOLD: "#FFD700",
      GRAY: "#E5E1E6",
      BLUE: "#007AFF",
      MEDIUM_GRAY: "#6C757D",
      SOFT_BLUE: "#D7E7FA",
      PRIMARY_LIGHT: "#3CDBC0",
      PRIMARY_DARK: "#2D3B42",
      BACKGROUND_LIGHT: "#E5E1E6",
    },
    opacity: {
      LOW: 0.5,
      MEDIUM: 0.7,
      HIGH: 0.9,
    },
    icon: {
      SMALL: 16,
      MEDIUM: 20,
    },
    maxWidth: {
      messageBubble: "75%"
    },
    shadowColor: {
      DEFAULT: "#000",
    },
    theme: {
      light: {
        text: {
          default: "#2D3B42",
          muted: "#8F98AD",
          primary: "#007AFF",
        },
        background: {
          surface: "#FFFFFF",
          subtle: "#E5E1E6",
        },
        border: {
          default: "#E5E1E6",
        },
      },
      dark: {
        text: {
          default: "#F3F7FF",
          muted: "#B7C1D6",
          primary: "#4EA8FF",
        },
        background: {
          surface: "#121821",
          subtle: "#1A2432",
        },
        border: {
          default: "#2A364A",
        },
      },
    },
    stepper: {
      ICON_SIZE: 16,
    },
    gallery: {
      CONTAINER_GAP: 12
    }
  }
};

export default Constants;
