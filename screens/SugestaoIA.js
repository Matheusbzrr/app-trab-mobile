// SugestaoIA.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Keyboard,
  Platform,
  ScrollView,
  KeyboardAvoidingView, // Importado
} from "react-native";
import {
  Text,
  Button,
  Card,
  ActivityIndicator,
  useTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import getStyles from "../styles/SugestaoIA.styles"; 

const SugestaoIA = ({ navigation }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [query, setQuery] = useState("");
  const [sugestao, setSugestao] = useState("");
  const [loading, setLoading] = useState(false);

  const ChamaIA = async () => {
    if (!query.trim()) {
      setSugestao("Por favor, digite algo para obter uma sugestão.");
      return;
    }
    Keyboard.dismiss();
    setLoading(true);
    setSugestao("");

    try {
      const response = await axios.post(
        "http://192.168.0.7:3000/api/llm/prompt",
        { prompt: query }
      );
      if (response && response.data && response.data.message) {
        setSugestao(response.data.message);
      } else if (
        response &&
        response.data &&
        typeof response.data === "string"
      ) {
        setSugestao(response.data);
      } else {
        setSugestao(
          "Nenhuma sugestão recebida ou formato de resposta inesperado."
        );
      }
    } catch (error) {
      console.error("Erro ao chamar a IA:", error);
      if (error.response) {
        setSugestao(
          `Erro do servidor: ${error.response.status} - ${
            error.response.data?.message || "Tente novamente."
          }`
        );
      } else if (error.request) {
        setSugestao(
          "Não foi possível conectar ao servidor. Verifique sua conexão e o endereço IP."
        );
      } else {
        setSugestao("Ocorreu um erro ao processar sua solicitação.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
    >
      <View style={styles.outerContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContentContainer}
          keyboardShouldPersistTaps="handled"
        >
          {loading && (
            <ActivityIndicator
              animating={true}
              size="large"
              style={styles.loader}
              color={theme.colors.primary}
            />
          )}
          {!loading && sugestao ? (
            <Card style={styles.caixaSugestao}>
              <Card.Content>
                <Text variant="titleMedium" style={styles.sugestaoTitulo}>
                  Sugestão da IA:
                </Text>
                <Text variant="bodyLarge" style={styles.sugestaoTexto}>
                  {sugestao}
                </Text>
              </Card.Content>
            </Card>
          ) : (
            !loading &&
            !sugestao && (
              <View style={styles.placeholderContainer}>
                <Icon
                  name="lightbulb-question-outline"
                  size={60}
                  color={theme.colors.onSurfaceDisabled}
                />
                <Text style={styles.placeholderText}>
                  Digite sua pergunta abaixo para ver a sugestão da IA aqui.
                </Text>
              </View>
            )
          )}
        </ScrollView>
        <View style={styles.inputArea}>
          <TextInput
            placeholder="Digite sua pergunta ou tópico"
            value={query}
            onChangeText={setQuery}
            style={styles.input}
            placeholderTextColor={theme.colors.onSurfaceDisabled}
          />
          <Button
            mode="contained"
            onPress={ChamaIA}
            style={styles.button}
            loading={loading}
            disabled={loading}
            icon={() => (
              <Icon
                name="send-check-outline"
                size={20}
                color={theme.colors.onPrimary}
              />
            )}
          >
            {loading ? "Buscando..." : "Buscar Sugestão"}
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SugestaoIA;
