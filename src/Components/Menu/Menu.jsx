/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary *//* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import styles from './Menu.module.css';
import ButtonAdd from '../Forms/ButtonAdd';
import ButtonDelet from '../Forms/ButtonDelet';
import Head from '../Helper/Head';
import '../Global.css';
import Header from '../Header/Header';

export const Menu = () => {
  const token = localStorage.getItem('token');
  const [modal, setModal] = useState('');
  const [hamburgers, setHamburgers] = useState([]);
  const [order, setOrder] = useState([]);
  const [cafeMenu, setCafeMenu] = useState([]);
  const [accompaniment, setAaccompaniment] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [, setExcludeProduct] = useState([]);
  const [amount, setAmount] = useState([0]);
  const [productPrice, setProductPrice] = useState([0]);

  useEffect(() => {
    fetch('https://lab-api-bq.herokuapp.com/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const itens = data;
        const coffeeItems = itens.filter((products) => products.type.includes('breakfast'));
        const burgers = itens.filter((products) => products.sub_type.includes('hamburguer'));
        const sideDish = itens.filter((products) => products.sub_type.includes('side'));
        const drink = itens.filter((products) => products.sub_type.includes('drinks'));
        setDrinks(drink);
        setAaccompaniment(sideDish);
        setHamburgers(burgers);
        setCafeMenu(coffeeItems);
      })
      .catch((error) => console.log('error', error));
  }, []);

  const handleAddItems = (product) => {
    setOrderItems([...orderItems, product]);
    setProductPrice([...productPrice, product.price]);
  };

  useEffect(() => {
    const requestedProduct = orderItems.map((product) => ({
      id: product.id,
      qtd: 1,
    }));

    const quantity = requestedProduct.reduce((a, b) => {
      // eslint-disable-next-line no-param-reassign
      a[b.id] = a[b.id] || [];
      a[b.id].push(b);
      return a;
    }, Object.create(null));
    // eslint-disable-next-line no-console
    console.log(orderItems);

    const productList = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(quantity)) {
      productList.push({ id: key, qtd: value.length });
    }
    setOrder({ ...order, products: productList });
  }, [orderItems]);

  const totalSum = () => {
    setAmount(productPrice.reduce((total, num) => total + num, 0));
  };

  const deleteItems = (product) => {
    setAmount(productPrice.splice(orderItems.indexOf(product), 1));
    setExcludeProduct(orderItems.splice(orderItems.indexOf(product), 1));
    totalSum();
  };

  const submitOrder = () => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        client: `${order.client}`,
        table: `${order.table}`,
        products:
        orderItems.map((product) => (
          {
            id: Number(product.id),
            qtd: 1,
          }
        )),
      }),
    })
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          setOrder({});
          setOrderItems([]);
          setAmount([]);
          setProductPrice([]);
          setExcludeProduct([]);
          alert('Pedido criado com sucesso!');
        });
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <div className={styles.container_menu}>
      <Head title="🍔🍴 Menu" />
      <Header />
      <div className={styles.containerButton}>
        <Button onClickBtn={() => setModal('Lanche')}>Lanches 🍔</Button>
        <Button onClickBtn={() => setModal('Café')}>Café da Manhã ☕</Button>
        <Button onClickBtn={() => setModal('Bebida')}>Bebidas 🥤🍹</Button>
        <Button onClickBtn={() => setModal('Acompanhamento')}>Acompanhamentos 🍟🥨</Button>
      </div>
      <div className={styles.container_list}>
        {(modal === 'Café') ? (
          <div className={styles.list}>
            <div className={styles.container_grid}>
              <div>
                <h3 className={styles.titleOrder}>Café da manhã ☕</h3>
                {cafeMenu.map((product) => (
                  <div className={styles.container}>
                    <div className={styles.card}>
                      <div className={styles.card_container}>
                        <li key={product.id} className={styles.order}>
                          <div className={styles.hamburgers_thumb}>
                            <h2>
                              {(product.name === 'Café americano') ? '☕'
                                : (product.name === 'Café com leite') ? '☕ + 🥛'
                                  : (product.name === 'Misto quente') ? '🥪'
                                    : '🧃'}
                            </h2>
                          </div>
                          <p><b>{product.name}</b></p>
                          <p>
                            R$
                            {product.price}
                          </p>
                          <ButtonAdd onClickBtn={() => handleAddItems(product)} />
                        </li>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (modal === 'Lanche') ? (
          <div>
            <h3 className={styles.titleOrder}>Hamburgueres</h3>
            {hamburgers.map((product) => (
              <div className={styles.container}>
                <div className={styles.card}>
                  <div className={styles.card_container}>
                    <li key={product.id} className={styles.order}>
                      <div className={styles.hamburgers_thumb}>
                        <h1 className={styles.icons}>🍔</h1>
                      </div>
                      <p>
                        <b>{`${product.name}`}</b>
                      </p>
                      <p>
                        <b>
                          {`${product.flavor}`}
                        </b>
                      </p>
                      <p>
                        { product.complement}
                      </p>
                      <p>
                        R$
                        {product.price}
                      </p>
                      <ButtonAdd onClickBtn={() => handleAddItems(product)} />
                    </li>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (modal === 'Acompanhamento') ? (
          <div>
            <h3 className={styles.titleOrder}>Acompanhamentos</h3>
            {accompaniment.map((product) => (
              <div className={styles.container}>
                <div className={styles.card}>
                  <div className={styles.card_container}>
                    <li key={product.id} className={styles.order}>
                      <div className={styles.hamburgers_thumb}>
                        <h1 className={styles.icons}>
                          {product.name === 'Batata frita' ? '🍟' : '🥨' }
                        </h1>
                      </div>
                      <p><b>{product.name}</b></p>
                      <p>
                        R$
                        {product.price}
                      </p>
                      <ButtonAdd onClickBtn={() => handleAddItems(product)} />
                    </li>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h3 className={styles.titleOrder}>Bebidas</h3>
            {drinks.map((product) => (
              <div className={styles.container}>
                <div className={styles.card}>
                  <div className={styles.card_container}>
                    <li key={product.id} className={styles.order}>
                      <div className={styles.hamburgers_thumb}>
                        <h1 className={styles.icons}>
                          {(product.name === 'Água 500mL') ? '🥤'
                            : (product.name === 'Água 750mL') ? '🥤'
                              : (product.name === 'Refrigerante 500mL') ? '🥃'
                                : '🥃'}
                        </h1>
                      </div>
                      <p><b>{product.name}</b></p>
                      <p>
                        R$
                        {product.price}
                      </p>
                      <ButtonAdd onClickBtn={() => handleAddItems(product)} />
                    </li>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.orderList}>
          <header>
            <Input
              labelText="Nome:"
              nameInput="name"
              typeInput="text"
              onChangeInput={(e) => setOrder({ ...order, client: e.target.value })}
            />
            <br />
            <Input
              labelText="Numero da mesa:"
              nameInput="table"
              typeInput="text"
              onChangeInput={(e) => setOrder({ ...order, table: e.target.value })}
            />
            <br />
          </header>
          <div>
            <h3 className={styles.titleOrder}>Produtos adicionados:</h3>
            {orderItems.map((product) => (
              <div className={styles.container}>
                <div className={styles.card}>
                  <div className={styles.card_container}>
                    <li key={product.id} className={styles.order}>
                      <div className={styles.hamburgers_thumb}>
                        <h1 className={styles.icons}>
                          {(product.name === 'Batata frita') ? '🍟'
                            : (product.name === 'Anéis de cebola') ? '🥨'
                              : (product.name === 'Água 500mL') ? '🥤'
                                : (product.name === 'Água 750mL') ? '🥤'
                                  : (product.name === 'Refrigerante 500mL') ? '🥃'
                                    : (product.name === 'Refrigerante 750mL') ? '🥃'
                                      : (product.name === 'Hambúrguer simples') ? '🍔'
                                        : (product.name === 'Hambúrguer duplo') ? '🍔'
                                          : (product.name === 'Café americano') ? '☕'
                                            : (product.name === 'Café com leite') ? '☕ + 🥛'
                                              : (product.name === 'Misto quente') ? '🥪'
                                                : '🧃'}
                        </h1>
                      </div>
                      <p><b>{product.name}</b></p>
                      <p>
                        <b>
                          {`${product.flavor == null ? '' : ''}`}
                        </b>
                      </p>
                      <p>
                        { product.complement}
                      </p>
                      <p>
                        R$
                        {product.price}
                      </p>
                      <ButtonDelet onClickBtn={() => deleteItems(product)} />
                    </li>
                  </div>
                </div>
              </div>
            ))}

            <div>
              <h3 className={styles.titleOrder}>
                <b>
                  Total:  R$
                  {amount}
                </b>
              </h3>
              <Button onClickBtn={() => totalSum()}>💲Totalizar itens💲</Button>
              <Button onClickBtn={() => submitOrder()}>Enviar pedido 📤</Button>
            </div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
