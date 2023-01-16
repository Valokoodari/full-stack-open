import { Platform } from "react-native";

const theme = {
  colors: {
    background: "#e1e4e8",
    primary: "#2d2d2d",
    accent: "#0366d6",
    border: "#d3d3d3",
    error: "#d73a4a",
    card: "#ffffff",
  },
  fontSizes: {
    heading: 18,
    subheading: 16,
    rating: 16,
    body: 14,
  },
  imageSizes: {
    author: 45,
    rating: 45,
  },
  fonts: {
    main: Platform.select({
      ios: "Arial",
      android: "Roboto",
      default: "System",
    }),
  },
};

export default theme;
