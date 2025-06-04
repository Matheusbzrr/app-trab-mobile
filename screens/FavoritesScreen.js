import React, { useState, useCallback } from "react";
import { View, FlatList } from "react-native";
import {
  Card,
  Button,
  useTheme,
  Text,
  ActivityIndicator,
  Snackbar,
  Icon,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import getStyles from "../styles/FavoritesScreen.styles";

const ASYNC_STORAGE_FAVORITES_KEY = "restaurant_favorites";

const FavoriteItem = ({
  item,
  removeFavorite,
  navigateToDetails,
  styles,
  theme,
}) => {
  return (
    <Card style={styles.card}>
      {item.imagem ? (
        <Card.Cover source={{ uri: item.imagem }} style={styles.cardCover} />
      ) : (
        <View
          style={[
            styles.cardCover,
            {
              height: 150,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.colors.surfaceDisabled,
            },
          ]}
        >
          <Icon
            source="image-off-outline"
            size={40}
            color={theme.colors.onSurfaceVariant}
          />
        </View>
      )}
      <Card.Content>
        <Card.Title
          style={styles.cardTitle}
          title={item.nome || "Restaurante sem nome"}
        />
        {item.endereco ? (
          <Text style={styles.cardParagraph}>{item.endereco}</Text>
        ) : item.avaliacao !== undefined ? (
          <Text style={styles.cardParagraph}>Nota: {item.avaliacao}</Text>
        ) : null}
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <Button
          icon="heart-remove-outline"
          onPress={() => removeFavorite(item.id)}
          textColor={theme.colors.error}
          compact
        >
          Remover
        </Button>
      </Card.Actions>
    </Card>
  );
};

const FavoritesScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const storedFavorites = await AsyncStorage.getItem(
        ASYNC_STORAGE_FAVORITES_KEY
      );
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
      setSnackbarMessage("Erro ao carregar favoritos.");
      setSnackbarVisible(true);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, []);
  useFocusEffect(loadFavorites);

  const removeFavorite = async (restaurantId) => {
    try {
      const updatedFavorites = favorites.filter(
        (restaurant) => restaurant.id !== restaurantId
      );
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem(
        ASYNC_STORAGE_FAVORITES_KEY,
        JSON.stringify(updatedFavorites)
      );
      setSnackbarMessage("Restaurante removido dos favoritos!");
      setSnackbarVisible(true);
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      setSnackbarMessage("Erro ao remover favorito.");
      setSnackbarVisible(true);
    }
  };

  const navigateToDetails = (restaurantId) => {
    navigation.navigate("Details", { restauranteId: restaurantId });
  };

  const ListEmptyState = () => {
    if (loading) {
      return (
        <View style={styles.centeredMessageContainer}>
          <ActivityIndicator
            animating={true}
            size="large"
            color={theme.colors.primary}
          />
          <Text style={styles.messageText}>Carregando favoritos...</Text>
        </View>
      );
    }
    return (
      <View style={styles.centeredMessageContainer}>
        <Icon
          source="heart-broken"
          size={50}
          color={theme.colors.onSurfaceDisabled}
        />
        <Text style={styles.messageText}>
          Você ainda não adicionou restaurantes aos favoritos.
        </Text>
      </View>
    );
  };
  const ITEM_HEIGHT = 320;

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FavoriteItem
              item={item}
              removeFavorite={removeFavorite}
              navigateToDetails={navigateToDetails}
              styles={styles}
              theme={theme}
            />
          )}
          ListEmptyComponent={<ListEmptyState />}
          contentContainerStyle={
            favorites.length > 0
              ? styles.flatListContentContainer
              : { flexGrow: 1 }
          }
          initialNumToRender={5}
          getItemLayout={
            favorites.length > 0
              ? (data, index) => ({
                  length: ITEM_HEIGHT,
                  offset: ITEM_HEIGHT * index,
                  index,
                })
              : undefined
          }
          windowSize={10}
          maxToRenderPerBatch={5}
        />
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={Snackbar.DURATION_SHORT}
        action={{
          label: "Fechar",
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </>
  );
};

export default FavoritesScreen;
