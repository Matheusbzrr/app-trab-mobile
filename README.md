# 🍽️ FoodFinder App

Bem-vindo ao FoodFinder, o seu assistente pessoal para descobrir restaurantes! Com ele, você pode encontrar os melhores lugares para comer em qualquer cidade, salvar seus favoritos, receber sugestões personalizadas de uma inteligência artificial e ficar por dentro das novidades gastronômicas com a nossa newsletter.

Este projeto foi desenvolvido com **React Native** e **Expo**, proporcionando uma experiência de desenvolvimento ágil e uma aplicação multiplataforma (iOS e Android) a partir de uma única base de código.

-   **🔎 Busca por Cidade:** Encontre restaurantes simplesmente digitando o nome da cidade desejada.
-   **⭐ Favoritos:** Salve seus restaurantes preferidos para acessá-los facilmente quando quiser.
-   **🤖 Sugestão com IA:** Não sabe onde comer? Peça uma recomendação à nossa inteligência artificial.
-   **📰 Newsletter:** Inscreva-se para receber notícias e destaques do mundo dos restaurantes.

## 🚀 Tecnologias Utilizadas

-   **React Native:** Framework para desenvolvimento de aplicativos móveis nativos com JavaScript e React.
-   **Expo:** Plataforma e conjunto de ferramentas que simplificam o desenvolvimento e a implantação de apps React Native.
-   **JavaScript:** Linguagem de programação principal do projeto.

## 🏁 Começando

Siga as instruções abaixo para configurar e executar o projeto em sua máquina local para desenvolvimento e teste.

### **Pré-requisitos**

Antes de começar, certifique-se de que você tem o seguinte software instalado em sua máquina:
-   [Node.js](https://nodejs.org/) (versão LTS recomendada)
-   [Yarn](https://yarnpkg.com/) (opcional, mas recomendado) ou npm (que vem com o Node.js)
-   **Expo CLI**: Instale globalmente executando o comando abaixo no seu terminal.
    ```bash
    npm install -g expo-cli
    ```

### **Instalação**

1.  **Clone o repositório do frontend:**
    ```bash
    git clone https://URL_DO_SEU_REPOSITORIO_FRONTEND.git
    cd nome-do-diretorio-do-projeto
    ```

2.  **Instale as dependências do projeto:**
    Utilize o gerenciador de pacotes de sua preferência.
    ```bash
    # Usando npm
    npm install

    # Ou usando Yarn
    yarn install
    ```
3.  **Configure o Backend:**
    Este aplicativo consome uma API externa para buscar os dados dos restaurantes. Certifique-se de que o servidor backend esteja em execução antes de iniciar o app. Para mais detalhes sobre como configurar o backend, acesse o repositório:
    -   **Repositório Backend:** [https://github.com/Matheusbzrr/trab-aps-mobile.git](https://github.com/Matheusbzrr/trab-aps-mobile.git)

### **Executando a Aplicação**

Após a instalação das dependências, você pode iniciar o servidor de desenvolvimento do Expo:

```bash
# Usando npm
npm start

# Ou usando Yarn
yarn start
```
Isso iniciará o Metro Bundler e abrirá uma página no seu navegador com um QR Code.

#### **Para rodar no seu celular (Android ou iOS):**
1.  Baixe o aplicativo **Expo Go** na [App Store](https://apps.apple.com/us/app/expo-go/id982107779) (iOS) ou [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android).
2.  Abra o app Expo Go e escaneie o QR Code exibido no terminal ou na página do navegador.

#### **Para rodar em um emulador Android:**
1.  Certifique-se de ter o [Android Studio](https://developer.android.com/studio) instalado e um emulador Android configurado.
2.  Com o emulador em execução, pressione a tecla `a` no terminal onde o Metro Bundler está rodando.

#### **Para rodar em um simulador iOS (somente macOS):**
1.  Certifique-se de ter o [Xcode](https://developer.apple.com/xcode/) instalado.
2.  Pressione a tecla `i` no terminal onde o Metro Bundler está rodando.

---

