import { createTheme } from "@mui/material/styles";
import { COLORS, SHADOWS, FONT_FAMILY, BORDER_RADIUS } from "@/util";

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary,
      contrastText: COLORS.contrastText,
    },
    secondary: {
      main: COLORS.secondary,
      contrastText: COLORS.foreground,
    },
    background: {
      default: COLORS.background,
      paper: COLORS.card,
    },
    text: {
      primary: COLORS.foreground,
      secondary: COLORS.muted,
    },
    divider: COLORS.border,
    error: {
      main: COLORS.statusDanger,
    },
  },
  typography: {
    fontFamily: FONT_FAMILY,
    h1: { fontFamily: FONT_FAMILY, letterSpacing: "0.01em" },
    h2: { fontFamily: FONT_FAMILY, letterSpacing: "0.01em" },
    h3: { fontFamily: FONT_FAMILY, letterSpacing: "0.01em" },
    h4: { fontFamily: FONT_FAMILY, letterSpacing: "0.01em" },
    h5: { fontFamily: FONT_FAMILY, letterSpacing: "0.01em" },
    h6: { fontFamily: FONT_FAMILY, letterSpacing: "0.01em" },
  },
  shape: {
    borderRadius: BORDER_RADIUS,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: FONT_FAMILY,
          backgroundColor: COLORS.background,
          color: COLORS.foreground,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: FONT_FAMILY,
          fontWeight: 500,
          letterSpacing: "0.02em",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            color: COLORS.muted,
            fontWeight: 500,
            fontSize: "0.875rem",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${COLORS.border}`,
          fontFamily: FONT_FAMILY,
          fontSize: "0.875rem",
          padding: "10px 8px",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: `${COLORS.secondary}30`,
          },
          "&:last-child td": {
            borderBottom: 0,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: SHADOWS.card,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          fontFamily: FONT_FAMILY,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: FONT_FAMILY,
          fontSize: "0.875rem",
          backgroundColor: COLORS.card,
          "& fieldset": {
            borderColor: COLORS.border,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: FONT_FAMILY,
          fontSize: "0.875rem",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: FONT_FAMILY,
          fontWeight: 600,
          fontSize: "0.75rem",
          height: 24,
        },
      },
    },
  },
});

export default theme;
