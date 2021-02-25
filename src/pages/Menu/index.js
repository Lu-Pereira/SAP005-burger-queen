import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

export const Menu = () => {
  const token = localStorage.getItem("token");
  const [hamburgers, setHamburgers] = useState([]);
  const [order, setOrder] = useState([]);
  const [cafeMenu, setCafeMenu] = useState([]);
  const [accompaniment, setAaccompaniment] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [excludedProduct, setExcludeProduct] = useState([]);
  const [amount, setAmount] = useState([]);
  const [productPrice, setProductPrice] = useState([]);

  useEffect(() => {
    fetch("https://lab-api-bq.herokuapp.com/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const itens = data;
        const coffeeItems = itens.filter((products) =>
          products.type.includes("breakfast")
        );
        const burgers = itens.filter((products) =>
          products.sub_type.includes("hamburguer")
        );
        const sideDish = itens.filter((products) =>
          products.sub_type.includes("side")
        );
        const drink = itens.filter((products) =>
          products.sub_type.includes("drinks")
        );
        setDrinks(drink);
        setAaccompaniment(sideDish);
        setHamburgers(burgers);
        setCafeMenu(coffeeItems);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const addItems = (product) => {
    setOrderItems([...orderItems, product]);
    setProductPrice([...productPrice, product.price]);
    const requestedProduct = orderItems.map((product) => {
      return {
        id: product.id,
        qtd: 1,
      };
    });
    const quantity = requestedProduct.reduce(function (a, b) {
      a[b.id] = a[b.id] || [];
      a[b.id].push(b);
      return a;
    }, Object.create(null));

    const productList = [];
    for (const [key, value] of Object.entries(quantity)) {
      productList.push({
        id: key,
        qtd: value.length,
      });
    }

    setOrder({ ...order, products: productList });
    console.log(order);
  };

  const totalSum = () => {
    setAmount(productPrice.reduce((total, num) => total + num));
  };

  const deleteItems = (product) => {
    setAmount(productPrice.splice(orderItems.indexOf(product), 1));
    setExcludeProduct(orderItems.splice(orderItems.indexOf(product), 1));
    totalSum();
  };

  const submitOrder = () => {
    fetch("https://lab-api-bq.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(order),
    })
      .then((response) => {
        response.json()
        .then((data) => console.log(data));
        setOrder({});
        setOrderItems([]);
        setAmount([]);
        setProductPrice([]);
        setExcludeProduct([]);
        alert('Pedido criado com sucesso!')
      })
      .catch((error) => console.log("error", error));
    };

  return (
    <div>
      <header>
        <label>Nome:</label>
        <input
          name="name"
          type="text"
          onChange={(e) => setOrder({ ...order, client: e.target.value })}
        />
        <label>Numero da mesa:</label>
        <input
          name="table"
          type="text"
          onChange={(e) => setOrder({ ...order, table: e.target.value })}
        />
      </header>
      <div>
        <h1>Café da manhã</h1>
        {cafeMenu.map((product) => {
          return (
            <div className="container">
              <div className="card">
                <div className="card-container">
                  <li key={product.id}>
                    <div className="hamburgers-thumb">
                      <img src={product.image} alt={`${product.name} Thumb`} />
                    </div>
                    <p>{product.name}</p>
                    <p>R${product.price}</p>
                    <button onClick={() => addItems(product)}>Adicionar</button>
                  </li>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h1>Hamburgueres</h1>
        {hamburgers.map((product) => {
          return (
            <div className="container">
              <div className="card">
                <div className="card-container">
                  <li key={product.id}>
                    <div className="hamburgers-thumb">
                      <img src={product.image} alt={`${product.name} Thumb`} />
                    </div>
                    <p>{product.name}</p>
                    <p>{product.complement}</p>
                    <p>R${product.price}</p>
                    <button onClick={() => addItems(product)}>Adicionar</button>
                  </li>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h1>Acompanhamentos</h1>
        {accompaniment.map((product) => {
          return (
            <div className="container">
              <div className="card">
                <div className="card-container">
                  <li key={product.id}>
                    <div className="hamburgers-thumb">
                      <img src={product.image} alt={`${product.name} Thumb`} />
                    </div>
                    <p>{product.name}</p>
                    <p>R${product.price}</p>
                    <button onClick={() => addItems(product)}>Adicionar</button>
                  </li>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h1>Bebidas</h1>
        {drinks.map((product) => {
          return (
            <div className="container">
              <div className="card">
                <div className="card-container">
                  <li key={product.id}>
                    <div className="hamburgers-thumb">
                      <img src={product.image} alt={`${product.name} Thumb`} />
                    </div>
                    <p>{product.name}</p>
                    <p>R${product.price}</p>
                    <button onClick={() => addItems(product)}>Adicionar</button>
                  </li>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h1>Produtos adicionados</h1>
        {orderItems.map((product, index) => {
          return (
            <div className="container">
              <div className="card">
                <div className="card-container">
                  <li key={index}>
                    <div className="hamburgers-thumb">
                      <img src={product.image} alt={`${product.name} Thumb`} />
                    </div>
                    <p>{product.name}</p>
                    <p>
                      {product.complement === "null" ? "" : product.complement}
                    </p>
                    <p>R${product.price}</p>
                    <button onClick={() => deleteItems(product)}>
                      Excluir
                    </button>
                  </li>
                </div>
              </div>
            </div>
          );
        })}
        <div>
          <h3>Total</h3>
          <h3>R${amount}</h3>
          <button onClick={() => totalSum()}>Totalizar itens</button>
          <button onClick={() => submitOrder()}>Finalizar pedido</button>
        </div>
        <div>
          <Link className="link-home" to="/">
            Sair
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
