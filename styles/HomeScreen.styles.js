import { StyleSheet, Platform } from 'react-native';

const getStyles = (theme) => StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  outerContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
 
  listArea: {
    flex: 1,
  },
  flatListContentContainer: {
    padding: 15, 
  },
  inputArea: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20, 
    borderTopWidth: 1,
    borderTopColor: theme.colors.outline,
    backgroundColor: theme.colors.elevation.level2, 
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.outline,
    color: theme.colors.onSurface,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  button: { 
    borderRadius: 8,
    paddingVertical: 5,
  },

  card: {
    marginBottom: 20,
    backgroundColor: theme.colors.surfaceVariant,
    elevation: 2,
  },
  cardCover: {
    // height: 180, // Você pode definir uma altura fixa se desejar
  },
  cardTitleText: { // Para estilizar o texto do título se necessário
    // color: theme.colors.primary, // Exemplo
  },
  cardContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconStyle: {
    marginRight: 10,
    color: theme.colors.onSurfaceVariant,
  },
  textContent: {
    flex: 1,
    color: theme.colors.onSurfaceVariant,
    fontSize: 14,
  },
  centeredMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 200,
  },
  messageText: {
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
    color: theme.colors.onSurfaceDisabled,
  },
});

export default getStyles;