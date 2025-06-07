// HomeScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Linking,
  Alert,
  ActionSheetIOS,
} from "react-native";
import * as Location from "expo-location";
import {
  Card,
  Text,
  Button,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import getStyles from "../styles/HomeScreen.styles";

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [query, setQuery] = useState("");
  const [restaurantes, setRestaurantes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      } else {
        Alert.alert("Permissão de localização negada");
      }
    })();
  }, []);

  const searchRestaurantes = async () => {
    if (!query.trim()) {
      setError("Por favor, digite o nome da cidade para buscar.");
      setRestaurantes([]);
      return;
    }
    Keyboard.dismiss();
    setLoading(true);
    setError(null);
    setRestaurantes([]);

    try {
      const response = await axios.get(
        `http://192.168.0.7:3000/api/yelp/restaurantes?city=${query}&gap=0`
      );
      if (response.data && response.data.length > 0) {
        setRestaurantes(response.data);
      } else {
        setRestaurantes([]);
        setError("Nenhum restaurante encontrado para esta cidade.");
      }
    } catch (err) {
      console.error("Erro ao buscar restaurantes:", err);
      let message = "Ocorreu um erro ao buscar os restaurantes.";
      if (err.response) {
        message = `Erro do servidor (${err.response.status}). Verifique a cidade e tente novamente.`;
      } else if (err.request) {
        message =
          "Não foi possível conectar ao servidor. Verifique sua conexão.";
      }
      setError(message);
      setRestaurantes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressPress = async (address) => {
    if (!location) {
      Alert.alert(
        "Localização não encontrada",
        "Não foi possível obter sua localização atual para traçar a rota."
      );
      return;
    }

    const encodedAddress = encodeURIComponent(address);
    const { latitude, longitude } = location;

    if (Platform.OS === "ios") {
      const availableApps = [];
      availableApps.push({
        name: "Apple Maps",
        url: `http://maps.apple.com/?daddr=${encodedAddress}&saddr=${latitude},${longitude}`,
      });

      const googleMapsUrl = `comgooglemaps://?saddr=${latitude},${longitude}&daddr=${encodedAddress}&directionsmode=driving`;
      if (await Linking.canOpenURL(googleMapsUrl)) {
        availableApps.push({ name: "Google Maps", url: googleMapsUrl });
      }

      const wazeUrl = `waze://?q=${encodedAddress}&navigate=yes`;
      if (await Linking.canOpenURL(wazeUrl)) {
        availableApps.push({ name: "Waze", url: wazeUrl });
      }

      const appNames = availableApps.map((app) => app.name);
      appNames.push("Cancelar");

      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: "Levar até o local com",
          options: appNames,
          cancelButtonIndex: appNames.length - 1,
        },
        (buttonIndex) => {
          if (buttonIndex === appNames.length - 1) return; // Índice do botão cancelar
          const selectedApp = availableApps[buttonIndex];
          Linking.openURL(selectedApp.url).catch((err) =>
            Alert.alert("Erro", `Não foi possível abrir o ${selectedApp.name}.`)
          );
        }
      );
    } else {
      const url = `google.navigation:q=${encodedAddress}`;
      try {
        await Linking.openURL(url);
      } catch {
        Alert.alert(
          "Erro",
          "Não foi possível abrir a navegação. Verifique se o Google Maps está instalado."
        );
      }
    }
  };

  const renderRestaurantItem = ({ item }) => (
    <Card style={styles.card}>
      {item.imagem && (
        <Card.Cover source={{ uri: item.imagem }} style={styles.cardCover} />
      )}
      <Card.Title
        title={item.nome}
        titleStyle={styles.cardTitleText}
        left={(props) => (
          <Icon
            {...props}
            name="silverware-fork-knife"
            color={theme.colors.primary}
          />
        )}
      />
      <Card.Content>
        {item.endereco && (
          <TouchableOpacity onPress={() => handleAddressPress(item.endereco)}>
            <View style={styles.cardContentRow}>
              <Icon name="map-marker" size={16} style={styles.iconStyle} />
              <Text style={styles.addressText} variant="bodyMedium">
                {item.endereco}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {item.telefone && (
          <View style={styles.cardContentRow}>
            <Icon name="phone" size={16} style={styles.iconStyle} />
            <Text style={styles.textContent} variant="bodyMedium">
              {item.telefone}
            </Text>
          </View>
        )}
        {item.avaliacao !== undefined && (
          <View style={styles.cardContentRow}>
            <Icon name="star" size={16} style={styles.iconStyle} />
            <Text style={styles.textContent} variant="bodyMedium">
              Nota: {item.avaliacao}
            </Text>
          </View>
        )}
        {item.valor && (
          <View style={styles.cardContentRow}>
            <Icon name="cash-multiple" size={16} style={styles.iconStyle} />
            <Text style={styles.textContent} variant="bodyMedium">
              Preço: {item.valor}
            </Text>
          </View>
        )}
      </Card.Content>
      <Card.Actions>
        <Button
          icon="information-outline"
          onPress={() =>
            navigation.navigate("Details", { restauranteId: item.id })
          }
        >
          Ver Detalhes
        </Button>
      </Card.Actions>
    </Card>
  );

  const ListEmptyOrErrorComponent = () => {
    if (loading) {
      return (
        <View style={styles.centeredMessageContainer}>
          <ActivityIndicator
            animating={true}
            size="large"
            color={theme.colors.primary}
          />
          <Text style={styles.messageText}>Buscando restaurantes...</Text>
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.centeredMessageContainer}>
          <Icon
            name="alert-circle-outline"
            size={50}
            color={theme.colors.error}
          />
          <Text style={[styles.messageText, { color: theme.colors.error }]}>
            {error}
          </Text>
        </View>
      );
    }
    if (restaurantes.length === 0 && query !== "" && !loading) {
      return (
        <View style={styles.centeredMessageContainer}>
          <Icon
            name="magnify-remove-outline"
            size={50}
            color={theme.colors.onSurfaceDisabled}
          />
          <Text style={styles.messageText}>
            Nenhum restaurante encontrado para "{query}". Tente outra cidade.
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.centeredMessageContainer}>
        <Icon
          name="silverware-fork-knife"
          size={50}
          color={theme.colors.onSurfaceDisabled}
        />
        <Text style={styles.messageText}>
          Digite o nome de uma cidade e UF para encontrar restaurantes!
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View style={styles.outerContainer}>
        <View style={styles.listArea}>
          <FlatList
            data={restaurantes}
            renderItem={renderRestaurantItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContentContainer}
            ListEmptyComponent={<ListEmptyOrErrorComponent />}
            keyboardShouldPersistTaps="handled"
          />
        </View>

        <View style={styles.inputArea}>
          <TextInput
            placeholder="Ex: Recife, PE"
            value={query}
            onChangeText={setQuery}
            style={styles.input}
            placeholderTextColor={theme.colors.onSurfaceDisabled}
            onSubmitEditing={searchRestaurantes}
          />
          <Button
            mode="contained"
            onPress={searchRestaurantes}
            style={styles.button}
            icon="magnify"
            loading={loading}
            disabled={loading}
          >
            {loading ? "Buscando..." : "Buscar Restaurantes"}
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
