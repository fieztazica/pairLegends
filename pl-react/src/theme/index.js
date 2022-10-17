import {
  blue,
  common,
} from "@mui/material/colors";

const palette = {
  light: {
    primary: {
      main: "#2196f3",
      light: "#1769aa",
      dark: "#4dabf5",
    },
    secondary: {
      main: "#2979ff",
      light: "#1c54b2",
      dark: "#5393ff",
    },
  },
  dark: {
    primary: {
      main: "#90caf9",
    },
  },
};

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: palette.light.primary.main,
            light: palette.light.primary.light,
            dark: palette.light.primary.dark,
          },
        }
      : {
          primary: blue,
        }),
  },
  typography: {
    fontFamily: [
      "Oswald",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    body1: {
      fontFamily: "Poppins, Arial, sans-serif",
    },
  },
});

export const getThemedComponents = (mode) => ({
  components: {
    ...(mode === "light"
      ? {
          MuiAppBar: {
            styleOverrides: {
              colorPrimary: {
                backgroundColor: palette.light.primary,
              },
            },
          },
          MuiLink: {
            variant: "h3",
          },
          MuiButton: {
            variants: [
              {
                props: { variant: "contained" },
                style: {
                  fontFamily:
                    "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                },
              },
              {
                props: { variant: "outlined" },
                style: {
                  color: palette.light.primary.main,
                },
              },
              {
                props: { variant: "primary", color: "primary" },
                style: {
                  border: "4px dashed blue",
                },
              },
            ],
          },
          MuiList: {
            styleOverrides: {
              root: {},
            },
          },
          MuiMenuItem: {
            styleOverrides: {
              root: {
                color: common.white,
                alignItems: "stretch",
                fontFamily:
                  "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
              },
            },
          },
          MuiAccordion: {
            styleOverrides: {
              root: {
                color: common.white,
                fontFamily:
                  "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
              },
            },
          },
        }
      : {
          MuiAppBar: {
            styleOverrides: {
              colorPrimary: {
                backgroundColor: palette.dark.primary,
              },
            },
          },
        }),
  },
});
