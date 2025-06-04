import { StyleSheet } from 'react-native';

const getStyles = (theme) => StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    padding: 15,
  },
  card: {
    backgroundColor: theme.colors.surfaceVariant,
    elevation: 2,
  },
  cover: {
    height: 250,
    backgroundColor: theme.colors.onSurfaceDisabled,
  },
  content: {
    paddingVertical: 15,
  },
  title: {
    marginBottom: 10,
    color: theme.colors.onSurface,
  },
  paragraph: {
    marginBottom: 8,
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.onSurfaceVariant,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 12,
    color: theme.colors.primary,
  },
  actions: {
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingRight: 10,
  },
  favoriteButton: {

  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: theme.colors.error,
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    color: theme.colors.onSurfaceDisabled,
  }
});

export default getStyles;