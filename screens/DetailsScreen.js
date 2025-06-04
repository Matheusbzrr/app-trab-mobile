// DetailsScreen.js
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Card,
  Button,
  useTheme,
  ActivityIndicator,
  Snackbar,
  Text,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getStyles from "../styles/DetailsScreen.styles";

const ASYNC_STORAGE_FAVORITES_KEY = "restaurant_favorites";

const DetailsScreen = ({ route }) => {
  const { restauranteId } = route.params;
  const theme = useTheme();
  const styles = getStyles(theme);

  const [restaurante, setRestaurante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const checkIfFavorite = async (currentRestaurantId) => {
    try {
      const existingFavorites = await AsyncStorage.getItem(
        ASYNC_STORAGE_FAVORITES_KEY
      );
      if (existingFavorites) {
        const favorites = JSON.parse(existingFavorites);
        const found = favorites.some((fav) => fav.id === currentRestaurantId);
        setIsFavorite(found);
      } else {
        setIsFavorite(false);
      }
    } catch (e) {
      console.error("Erro ao verificar favoritos:", e);
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      if (!restauranteId) {
        setError("ID do restaurante não fornecido.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://192.168.0.7:3000/api/yelp/restaurantes`,
          {
            params: { id: restauranteId },
          }
        );
        if (response.data) {
          setRestaurante(response.data);
          await checkIfFavorite(response.data.id);
        } else {
          setError("Restaurante não encontrado.");
        }
      } catch (err) {
        console.error("Erro ao buscar detalhes do restaurante:", err);
        setError(
          "Não foi possível carregar os detalhes do restaurante. Tente novamente."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurantDetails();
  }, [restauranteId]);

  const toggleFavorite = async () => {
    if (!restaurante) return;

    try {
      const existingFavoritesJson = await AsyncStorage.getItem(
        ASYNC_STORAGE_FAVORITES_KEY
      );
      let favorites = existingFavoritesJson
        ? JSON.parse(existingFavoritesJson)
        : [];

      if (isFavorite) {
        favorites = favorites.filter((fav) => fav.id !== restaurante.id);
        setSnackbarMessage("Removido dos favoritos!");
      } else {
        const alreadyExists = favorites.some(
          (fav) => fav.id === restaurante.id
        );
        if (!alreadyExists) {
          favorites.push(restaurante);
        }
        setSnackbarMessage("Adicionado aos favoritos!");
      }

      await AsyncStorage.setItem(
        ASYNC_STORAGE_FAVORITES_KEY,
        JSON.stringify(favorites)
      );
      setIsFavorite(!isFavorite); // Alterna o estado local
      setSnackbarVisible(true);
    } catch (e) {
      console.error("Erro ao atualizar favoritos:", e);
      setSnackbarMessage("Erro ao atualizar favoritos.");
      setSnackbarVisible(true);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          animating={true}
          size="large"
          color={theme.colors.primary}
        />
        <Text style={[styles.infoText, { marginTop: 10 }]}>
          Carregando detalhes...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Icon
          name="alert-circle-outline"
          size={50}
          color={theme.colors.error}
        />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!restaurante) {
    return (
      <View style={styles.loaderContainer}>
        <Icon
          name="information-outline"
          size={50}
          color={theme.colors.onSurfaceDisabled}
        />
        <Text style={styles.infoText}>
          Nenhum detalhe de restaurante para exibir.
        </Text>
      </View>
    );
  }
  return (
    <>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Card style={styles.card}>
            {restaurante.imagem ? (
              <Card.Cover
                source={{ uri: restaurante.imagem }}
                style={styles.cover}
              />
            ) : (
              <View
                style={[
                  styles.cover,
                  { justifyContent: "center", alignItems: "center" },
                ]}
              >
                <Icon
                  name="image-off-outline"
                  size={50}
                  color={theme.colors.surfaceDisabled}
                />
              </View>
            )}
            <Card.Content style={styles.content}>
              <Card.Title
                style={styles.title}
                title={restaurante.nome || "Nome Indisponível"}
              />

              {restaurante.descricao && ( // Usando 'descricao' como exemplo para o 'Plot'
                <Text style={styles.paragraph}>{restaurante.descricao}</Text>
              )}

              {restaurante.endereco && (
                <View style={styles.detailRow}>
                  <Icon
                    name="map-marker-outline"
                    size={20}
                    style={styles.icon}
                  />
                  <Text style={styles.paragraph}>{restaurante.endereco}</Text>
                </View>
              )}
              {restaurante.telefone && (
                <View style={styles.detailRow}>
                  <Icon name="phone-outline" size={20} style={styles.icon} />
                  <Text style={styles.paragraph}>{restaurante.telefone}</Text>
                </View>
              )}
              {restaurante.avaliacao !== undefined && (
                <View style={styles.detailRow}>
                  <Icon name="star-outline" size={20} style={styles.icon} />
                  <Text style={styles.paragraph}>
                    Nota: {restaurante.avaliacao}
                  </Text>
                </View>
              )}
              {restaurante.valor && (
                <View style={styles.detailRow}>
                  <Icon name="cash-multiple" size={20} style={styles.icon} />
                  <Text style={styles.paragraph}>
                    Preço: {restaurante.valor}
                  </Text>
                </View>
              )}
            </Card.Content>
            <Card.Actions style={styles.actions}>
              <Button
                icon={isFavorite ? "heart" : "heart-outline"}
                onPress={toggleFavorite}
                mode="contained"
                style={styles.favoriteButton}
                labelStyle={{
                  color: isFavorite
                    ? theme.colors.onError
                    : theme.colors.onPrimary,
                }}
                buttonColor={
                  isFavorite
                    ? theme.colors.errorContainer
                    : theme.colors.primary
                }
              >
                {isFavorite ? "Remover Favorito" : "Adicionar Favorito"}
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </ScrollView>
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

export default DetailsScreen;
