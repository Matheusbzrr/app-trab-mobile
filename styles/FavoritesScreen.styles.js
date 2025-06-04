import { StyleSheet } from "react-native";

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    flatListContentContainer: {
      padding: 15,
    },
    card: {
      marginBottom: 20,
      backgroundColor: theme.colors.surfaceVariant,
      elevation: 2,
    },
    cardCover: {
      // height: 180, // Ajuste a altura se desejar uma altura fixa para as imagens
    },
    cardTitle: {
      // color: theme.colors.primary, // Exemplo de personalização
    },
    cardParagraph: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 14,
    },
    cardActions: {
      justifyContent: "flex-end",
      paddingHorizontal: 8,
    },

    centeredMessageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      marginTop: 50,
    },
    messageText: {
      marginTop: 15,
      fontSize: 16,
      textAlign: "center",
      color: theme.colors.onSurfaceDisabled,
    },
  });

export default getStyles;
