import React, { useState } from "react";
import { ScrollView, View, Alert } from "react-native";
import {
  Card,
  Text,
  TextInput,
  Button,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import axios from "axios";
import getStyles from "../styles/NewsLatter.styles";

const NewsLatter = ({ navigator }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Adicionado para tratar erros
  const styles = getStyles(useTheme());

  const enviaEmail = async () => {
    if (!email.trim()) {
      setError("Por favor, digite seu email.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://192.168.0.7:3000/api/email/cadastraNews",
        { email } // Enviando o email como objeto
      );

      if (response.status === 200) {
        Alert.alert(
          "Bem-vindo à nossa Newsletter!",
          "Confira sua caixa de email, já tem notícias lá."
        );
        setEmail("");
      } else {
        Alert.alert("Erro", `Erro: ${response.data}`);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar o email.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">Assine nossa Newsletter</Text>
          <TextInput
            label="Seu email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
            error={!!error}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {error && <Text style={{ color: "red" }}>{error}</Text>}
          <Button
            mode="contained"
            onPress={enviaEmail}
            style={styles.button}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator animating={true} color="#fff" />
            ) : (
              "Enviar"
            )}
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default NewsLatter;
