import React from "react"; // Importa a biblioteca React
import ReactDOM from "react-dom"; // Importa o ReactDOM para manipulação do DOM
import App from "./App"; // Importa o componente App que contém a lógica da aplicação

ReactDOM.render(
  <React.StrictMode> {/* Habilita o modo estrito para ajudar no desenvolvimento */}
    <App /> {/* Renderiza o componente App */}
  </React.StrictMode>,
  document.getElementById("root") // O componente App é montado no elemento com id "root" no HTML
);
