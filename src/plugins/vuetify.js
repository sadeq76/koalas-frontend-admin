// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

//import directives and components
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const theme = {
  defaultTheme: "light",
  themes: {
    light: {
      dark: false,
      colors: {
        background: "#f4fdff",
        primary: "#083830",
        secondary: "#e4f6f8",
        error: "#ff4444",
        info: "#33b5e5",
        success: "#00c851",
        warning: "#ffbb33",
      },
    },
  },
};

export default createVuetify({ components, directives, theme });
