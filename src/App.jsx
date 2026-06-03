import { useMemo, useState } from "react";
import { HashRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import heroImage from "./assets/hero-tilapia.png";
import "./App.css";

const WHATSAPP = "5579998485516";
const ORDER_TEXT =
  "Olá! Quero comprar tilápia premium. Pode me passar disponibilidade, valores e entrega?";

const products = [
  {
    name: "Tilápia Inteira",
    price: 18,
    badge: "Mais pedida",
    description: "Peixe fresco, limpo sob encomenda e ideal para assar, fritar ou cozinhar.",
  },
  {
    name: "Filé de Tilápia",
    price: 38,
    badge: "Pronto para preparo",
    description: "Corte prático, sem espinha aparente, ótimo para restaurantes e famílias.",
  },
  {
    name: "Tilápia Viva",
    price: 15,
    badge: "Direto do tanque",
    description: "Opção para clientes que preferem receber o peixe vivo e selecionar o preparo.",
  },
];

const deliveryCities = [
  "Aracaju",
  "Itabaiana",
  "Campo do Brito",
  "Macambira",
  "Nossa Senhora do Socorro",
];

function whatsappLink(message = ORDER_TEXT) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function Currency({ value }) {
  return (
    <span>
      {value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}
    </span>
  );
}

function Header() {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Tilápia Premium">
        <img className="brand-mark" src="/favicon.svg" alt="" aria-hidden="true" />
        <span>
          <strong>Tilápia Premium</strong>
          <small>direto do produtor</small>
        </span>
      </Link>

      <nav className="main-nav" aria-label="Navegação principal">
        <NavLink to="/">Início</NavLink>
        <NavLink to="/produtos">Produtos</NavLink>
        <NavLink to="/contato">Contato</NavLink>
      </nav>

      <a className="header-cta" href={whatsappLink()} target="_blank" rel="noreferrer">
        Pedir agora
      </a>
    </header>
  );
}

function Home() {
  return (
    <main>
      <section
        className="hero-section"
        style={{ "--hero-image": `url(${heroImage})` }}
        aria-label="Tilápia fresca sobre gelo"
      >
        <div className="hero-copy">
          <p className="eyebrow">Entrega semanal em Sergipe</p>
          <h1>Tilápia fresca, compre direto de quem produz.</h1>
          <p className="hero-text">
            Peça tilápia inteira, filé ou viva com atendimento rápido no WhatsApp,
            preço por kg e entrega programada para sua cidade.
          </p>

          <div className="hero-actions">
            <a className="button primary" href={whatsappLink()} target="_blank" rel="noreferrer">
              Comprar pelo WhatsApp
            </a>
            <Link className="button secondary" to="/produtos">
              Ver produtos
            </Link>
          </div>

          <div className="trust-row" aria-label="Destaques">
            <span>+200 clientes atendidos</span>
            <span>Sem atravessador</span>
            <span>Pedidos de segunda a quinta</span>
          </div>

          <div className="price-note">
            <strong>A partir de R$ 15/kg</strong>
            <span>consulte disponibilidade</span>
          </div>
        </div>
      </section>

      <section className="section product-strip" aria-labelledby="produtos-destaque">
        <div className="section-heading">
          <p className="eyebrow">Produtos</p>
          <h2 id="produtos-destaque">Escolha o formato ideal para seu pedido</h2>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <span className="badge">{product.badge}</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <strong>
                <Currency value={product.price} /> / kg
              </strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section info-band">
        <div>
          <p className="eyebrow">Como funciona</p>
          <h2>Pedido simples, entrega organizada.</h2>
        </div>
        <div className="steps">
          <div>
            <span>1</span>
            <p>Você chama no WhatsApp e informa produto, quantidade e cidade.</p>
          </div>
          <div>
            <span>2</span>
            <p>Confirmamos disponibilidade, valor total e janela de entrega.</p>
          </div>
          <div>
            <span>3</span>
            <p>O pedido segue fresco, direto do produtor, no dia combinado.</p>
          </div>
        </div>
      </section>

      <section className="section split-section">
        <div>
          <p className="eyebrow">Entrega</p>
          <h2>Atendimento em Aracaju e região.</h2>
          <p>
            Entregas às sextas, com pedidos recebidos de segunda a quinta. Para
            volumes maiores, consulte condições especiais.
          </p>
        </div>
        <ul className="city-list">
          {deliveryCities.map((city) => (
            <li key={city}>{city}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function Produtos() {
  const [quantities, setQuantities] = useState(products.map(() => 1));

  const totals = useMemo(
    () => products.map((product, index) => product.price * quantities[index]),
    [quantities],
  );

  function changeQuantity(index, value) {
    const numericValue = Math.max(1, Number(value) || 1);
    setQuantities((current) =>
      current.map((quantity, quantityIndex) =>
        quantityIndex === index ? numericValue : quantity,
      ),
    );
  }

  return (
    <main className="page">
      <section className="page-heading">
        <p className="eyebrow">Tabela por kg</p>
        <h1>Produtos frescos para comprar hoje</h1>
        <p>
          Ajuste a quantidade, veja uma estimativa e envie o pedido pronto pelo
          WhatsApp.
        </p>
      </section>

      <div className="order-list">
        {products.map((product, index) => {
          const total = totals[index];
          const quantity = quantities[index];
          const message = `Quero comprar ${quantity}kg de ${product.name}. Entrega em minha cidade? Total estimado: R$ ${total.toFixed(2).replace(".", ",")}.`;

          return (
            <article className="order-card" key={product.name}>
              <div>
                <span className="badge">{product.badge}</span>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
              </div>

              <div className="order-controls">
                <label>
                  Quantidade (kg)
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) => changeQuantity(index, event.target.value)}
                  />
                </label>

                <div className="total-box">
                  <small>Total estimado</small>
                  <strong>
                    <Currency value={total} />
                  </strong>
                </div>

                <a
                  className="button primary"
                  href={whatsappLink(message)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Comprar
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

function Contato() {
  return (
    <main className="page contact-page">
      <section className="page-heading">
        <p className="eyebrow">Contato</p>
        <h1>Fale direto com o produtor</h1>
        <p>
          Tire dúvidas, confirme a rota da semana e feche seu pedido pelo WhatsApp.
        </p>
      </section>

      <section className="contact-grid">
        <article>
          <h2>WhatsApp</h2>
          <p>(79) 99848-5516</p>
          <a className="button primary" href={whatsappLink()} target="_blank" rel="noreferrer">
            Chamar agora
          </a>
        </article>
        <article>
          <h2>Entregas</h2>
          <p>{deliveryCities.join(", ")}.</p>
        </article>
        <article>
          <h2>Agenda</h2>
          <p>Pedidos de segunda a quinta. Entregas programadas às sextas.</p>
        </article>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <strong>Tilápia Premium</strong>
      <span>© {new Date().getFullYear()} - Todos os direitos reservados</span>
    </footer>
  );
}

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
      <Footer />
      <a
        className="floating-whatsapp"
        href={whatsappLink("Olá! Quero comprar tilápia. Pode me atender?")}
        target="_blank"
        rel="noreferrer"
        aria-label="Comprar pelo WhatsApp"
      >
        ☎
      </a>
    </Router>
  );
}
