import React from 'react';
import { useNavigate } from 'react-router-dom';
import InitialProducts from '../../components/InitialProducts/InitialProducts';
import Loading from '../../components/Loading/Loading';
import styles from './Home.module.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <section className={styles.homeContainer}>
          <h1>The bests makeups for you!</h1>
          <h3>Take a look in some products.</h3>
          <InitialProducts/>
          <button onClick={() => navigate('/products')} className={styles.homeBtn}>See more</button>         
        </section>
    )
}

export default Home;
