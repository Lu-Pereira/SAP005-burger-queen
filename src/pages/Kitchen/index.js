import React, { useEffect, useState } from 'react';

export const Kitchen = () => {
  const token = localStorage.getItem('token');
  const [order, setOrder] = useState([]); 
  const [orderId, setOrderId] = useState([]); 
  const [excludedOrder, setExcludeOrder] = useState([]);
  const [amount, setAmount] = useState([]); 
  const [productPrice, setProductPrice] = useState([]); //preco do produto

 useEffect(() => {
   fetch('https://lab-api-bq.herokuapp.com/orders', {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `${token}`
     },
   })
     .then(response => response.json())
     .then((response) => {
       setOrder(response);
     })
     .catch(error => console.log('error', error));
    }, [])

    const deleteOrder = (product) => {
      fetch('https://lab-api-bq.herokuapp.com/orders/'`${orderId}`, {
        method: 'DELETE',
        path: `${orderId}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      }, [])
      .then(response => response.json())
      .then(data => {
        const itens = data;
        //const item = itens.filter(product => product.id.includes('itensOrdem'));
        //setOrderId(item)
        }, [])
        .catch(error => console.log('error', error));
    }

    
  

  return (
    <>
    <h1>Pedidos solicitados</h1>
    {order.map((product, index) => {
        return(
            <div className='container'>
                <div className='card'>
                    <div className="card-container">
                        <li key={ index }>
                            <p>{ product.client_name }</p>
                            <p>{ product.id }</p>
                            <p>{ product.Products.name}</p>
                            <button onClick={() => deleteOrder(product)}>x</button>
                        </li>
                    </div>
                </div>
            </div>
        );
    })}
    </>
    );
  }
  
  export default Kitchen;
