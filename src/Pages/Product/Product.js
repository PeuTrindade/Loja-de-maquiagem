import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Product.module.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Loading from '../../components/Loading/Loading';

const Product = () => {
    const [allProducts,setAllProducts] = React.useState([]);
    const [especific,setEspecific] = React.useState([]);
    const [loading,setLoading] = React.useState(true);
    const [colors,setColors] = React.useState();
    const { id } = useParams();

    React.useEffect(() => {
        async function getItems(){
            const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json?');
            const data = await response.json();
            if(response.ok){
                setAllProducts(data);
                setLoading(false);
            }
        }
        getItems();
    },[]);

    React.useEffect(() => {
        if(allProducts){
          setEspecific(allProducts[1048 - id]);
        }
    },[allProducts]);

    React.useEffect(() => {
        if(especific){
            setColors(especific.product_colors);
        }
    },[especific])

    return (
        <>
        {loading && <Loading/>}
        {!loading && <section className={styles.container}>
            {especific && <div className={styles.product}>
              <img src={especific.api_featured_image} alt={especific.name}/> 
              <div className={styles.allInfo}>
              <div className={styles.info}>
                <h3 className={styles.name}>{especific.name}</h3>
                <h3 className={styles.brand}>{especific.brand}</h3>
                {especific.category !== null && <h3 className={styles.category}>{especific.category}</h3>}
                <h3 className={styles.description}>{especific.description}</h3>
              </div>
              <div className={styles.buyInfo}>
                <h3 className={styles.price}>Price: {especific.price_sign}{especific.price === '0.0' ? '10.0' : especific.price}</h3>
                <h3 className={styles.choose}>Choose a colour:</h3>
                <ul className={styles.colors}>
                   {colors && colors.map((color) => {
                       const { hex_value,colour_name } = color;
                       return (
                           <li style={{backgroundColor:hex_value}} key={hex_value}>{hex_value} - {colour_name}</li>
                       )
                   })}
                </ul>
                <div className={styles.btns}>
                <button className={styles.btn1}>Buy</button>
                <button className={styles.btn2}><AiOutlineShoppingCart style={{fontSize:'1rem',marginRight:'0.3rem'}}/> Add to cart</button>
                </div>
              </div>
            </div>
            </div>}
        </section>}
        </>
    )
}

export default Product;
