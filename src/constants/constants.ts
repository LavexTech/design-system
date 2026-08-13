const Constants = {
  styles: {
    fontSize: {
      LARGEST: 36,
      LARGER: 24,
      LARGE: 20,
      MEDIUM: 18,
      SMALL: 14,
    },
    lineHeight: {
      LARGEST: 30,
      LARGER: 26,
      LARGE: 22,
      MEDIUM: 18,
      SMALL: 14,
    },
    fontWeight: {
      BOLD: "700" as any,
      NORMAL: "400" as any,
      THIN: "100" as any,
    },
    fontFamily: {
      REGULAR: "Roboto-Regular",
      REGULAR_ITALIC: "Roboto-Italic",
      EXTRA_LIGHT: "Roboto-ExtraLight",
      EXTRA_LIGHT_ITALIC: "Roboto-ExtraLightItalic",
      BOLD: "Roboto-Bold",
      BOLD_ITALIC: "Roboto-BoldItalic",
    },
    textColor: {
      DEFAULT: "#262627",
      PRIMARY: "#007AFF",
      SUCCESS: "#059669",
      DANGER: "#DC2626",
      INFO: "#8F98AD",
      WARNING: "#F59E0B",
    },
    backgroundColor: {
      WHITE: "#FFFFFF",
      LIGHT_GRAY: "#F8F9FA",
      GRAY: "#E9ECEF",
    },
    borderColor: {
      LIGHT: "#DEE2E6",
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
    },
    borderWidth: {
      THIN: 0.4,
      REGULAR: 0.8,
      THICK: 1.2,
    },
    componentSize: {
      BUTTON_HEIGHT: 40,
      BUTTON_WIDTH: 40,
      INPUT_MIN_WIDTH: 50,
      // icon (~24) + margin + label + paddingVertical*2 — matches NavigationBar
      NAVIGATION_BAR_HEIGHT: 64,
    },
    color: {
      WHITE: "#FFFFFF",
      BLACK: "#000000",
      GOLD: "#FFD700",
      GRAY: "#E0E0E0",
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
      messageBubble: "70%"
    },
    shadowColor: {
      DEFAULT: "#000",
    },
    theme: {
      light: {
        text: {
          default: "#262627",
          muted: "#8F98AD",
          primary: "#007AFF",
        },
        background: {
          surface: "#FFFFFF",
          subtle: "#F8F9FA",
        },
        border: {
          default: "#DEE2E6",
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
