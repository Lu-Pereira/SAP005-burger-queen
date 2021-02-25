import React from 'react';
import Head from './Helper/Head';
import Login from './Login/Login';

const Home = () => {
  return (
    <section className="container mainContainer">
      <Head
        title='Home'
        description="Home do burger-game."
      />
      <Login />
    </section>
  );
};

export default Home;
