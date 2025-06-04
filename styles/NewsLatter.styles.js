import { StyleSheet } from "react-native";

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      justifyContent: "center",
      backgroundColor: theme.colors.background,
    },
    card: {
      borderRadius: 12,
      elevation: 2,
      padding: 16,
      backgroundColor: theme.colors.surfaceVariant,
    },
    input: {
      marginTop: 16,
      marginBottom: 8,
      backgroundColor: theme.colors.background,
    },
    button: {
      marginTop: 8,
      borderRadius: 8,
      paddingVertical: 6,
    },
    errorText: {
      color: theme.colors.error,
      marginTop: 4,
      fontSize: 14,
    },
  });

export default getStyles;
