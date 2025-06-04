import { StyleSheet, Platform } from "react-native";

const getStyles = (theme) =>
  StyleSheet.create({
    keyboardAvoidingContainer: {
      flex: 1,
    },
    outerContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContentContainer: {
      flexGrow: 1,
      padding: 20,
      justifyContent: "center",
    },
    placeholderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      minHeight: 200,
    },
    placeholderText: {
      color: theme.colors.onSurfaceDisabled,
      marginTop: 10,
      textAlign: "center",
    },
    inputArea: {
      paddingHorizontal: 20,
      paddingBottom: Platform.OS === "ios" ? 25 : 15,
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: theme.colors.outline,
      backgroundColor: theme.colors.surface,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.outline,
      backgroundColor: theme.colors.background,
      color: theme.colors.onSurface,
      paddingHorizontal: 15,
      paddingVertical: 12,
      marginBottom: 15,
      borderRadius: 8,
      fontSize: 16,
    },
    button: {
      paddingVertical: 8,
      borderRadius: 8,
    },
    loader: {
      alignSelf: "center",
      marginVertical: 30,
    },
    caixaSugestao: {
      borderRadius: 12,
      elevation: 3,
      backgroundColor: theme.colors.surfaceVariant,
    },
    sugestaoTitulo: {
      marginBottom: 10,
      fontWeight: "bold",
      color: theme.colors.primary,
    },
    sugestaoTexto: {
      color: theme.colors.onSurfaceVariant,
    },
  });

export default getStyles;
