import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import styles from './InitialProducts.module.css';

const InitialProducts = () => {
    const [otherProducts,setOtherProducts] = React.useState([]);
    const [loading,setLoading] = React.useState(true);
    const navigate = useNavigate();

    React.useEffect(() => {
        async function getItem(){
            const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json?brand=colourpop');
            const data = await response.json();
            if(response.ok){
                setOtherProducts(data);
                setLoading(false);
            }
        }
        getItem();
    },[]);

    return (
       <div className={styles.productsContainer}>
            {loading && <Loading/>}
            {otherProducts && !loading && otherProducts.map((product1) => {
             const {id,api_featured_image,brand,name,price,price_sign} = product1;
             return (
                <div key={id} className={styles.product}>
                    <img className={styles.productImg} src={api_featured_image} alt={name}/>
                    <h3 className={styles.productName}>{name}</h3>
                    <h4 className={styles.productBrand}>{brand}</h4>
                    <h3 className={styles.productPrice}>Price: {price_sign}{price}</h3>
                    <button onClick={() => navigate(`/product/${id}`)} className={styles.productBtn}>Buy</button>
                </div>
             )
            })}
        </div>
    )
}

export default InitialProducts;
