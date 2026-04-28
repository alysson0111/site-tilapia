import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

const WHATSAPP = "5579998485516";

const styles = {
  container: {
    maxWidth: 1100,
    margin: "auto",
    padding: 20,
  },
  hero: {
    background: "linear-gradient(135deg, #0a2540, #00a859)",
    color: "#fff",
    padding: 40,
    borderRadius: 12,
    textAlign: "center",
  },
  button: {
    background: "#25D366",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: 8,
    textDecoration: "none",
    display: "inline-block",
    marginTop: 15,
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20,
    marginTop: 30,
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
};

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1>Tilápia Premium 🐟</h1>
        <p>
          Tilápia fresca direto do produtor 🐟 | Sem atravessador | Entrega rápida em Aracaju
        </p>

        <a
          href={`https://wa.me/${WHATSAPP}?text=Olá! Quero comprar tilápia hoje. Você entrega em Aracaju?`}
          target="_blank"
          style={styles.button}
        >
          Comprar Tilápia no WhatsApp
        </a>

      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Pedidos e Entregas</h3>
          <p>Pedidos de segunda a quinta;</p>
          <p>Entregas sexta;</p>
        </div>

        <div style={styles.card}>
          <h3>Qualidade Premium</h3>
          <p>Direto do tanque, sem intermediários e alimentadas com ração premium.</p>
        </div>

        <div style={styles.card}>
          <h3>Pedido Fácil</h3>
          <p>Compre pelo WhatsApp em segundos</p>
        </div>

        <div style={styles.card}>
          <h3>Clientes satisfeitos</h3>
          <p>⭐⭐⭐⭐⭐ +200 clientes atendidos em Aracaju</p>
        </div>
      </div>
    </div>
  );
}

function Produtos() {
  const lista = [
    { nome: "Tilápia Inteira", preco: 18 },
    { nome: "Filé de Tilápia", preco: 38 },
    { nome: "Tilápia Viva", preco: 15 },
  ];

  const [quantidades, setQuantidades] = useState([1, 1, 1]);

  const alterarQtd = (index, valor) => {
    const novas = [...quantidades];
    novas[index] = valor;
    setQuantidades(novas);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Produtos</h2>

      {lista.map((item, i) => {
        const qtd = quantidades[i];
        const total = qtd * item.preco;

        return (
          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              padding: 15,
              borderRadius: 8,
              marginBottom: 15,
            }}
          >
            <h3>{item.nome}</h3>
            <p>Preço: R$ {item.preco}/kg</p>

            <label>Quantidade (kg): </label>
            <input
              type="number"
              min="1"
              value={qtd}
              onChange={(e) => alterarQtd(i, Number(e.target.value))}
              style={{ width: 60, marginLeft: 10 }}
            />

            <p><strong>Total: R$ {total}</strong></p>

            <button
              onClick={() => {
                const mensagem = `Quero comprar ${qtd}kg de ${item.nome}. Você entrega hoje? (Total: R$ ${total})`;

                window.open(
                  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`
                );
              }}
              style={{
                background: "#25D366",
                color: "#fff",
                padding: 10,
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Comprar
            </button>
          </div>
        );
      })}
    </div>
  );
}

function Contato() {
  return (
    <div style={styles.container}>
      <h2>Contato</h2>
      <p>📍 Entregamos em Aracaju, Itabaiana, Campo do Brito, Macambira, Nossa Senhora do Socorro e região</p>
      <p>📞 (79) 99848-5516</p>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Router>
        <nav
          style={{
            padding: 15,
            background: "#0a2540",
            display: "flex",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <Link to="/" style={{ color: "#fff" }}>Home</Link>
          <Link to="/produtos" style={{ color: "#fff" }}>Produtos</Link>
          <Link to="/contato" style={{ color: "#fff" }}>Contato</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </Router>

      <footer
        style={{
          marginTop: 40,
          padding: 20,
          textAlign: "center",
          background: "#0a2540",
          color: "#fff",
        }}
      >
        © {new Date().getFullYear()} Tilápia Premium - Todos os direitos reservados
      </footer>

      <a
        href={`https://wa.me/${WHATSAPP}?text=Olá! Quero comprar tilápia`}
        target="_blank"
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "#25D366",
          color: "#fff",
          padding: "16px 18px",
          borderRadius: "50%",
          fontSize: 22,
          textDecoration: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        💬
      </a>
    </>
  );
}