import React from 'react';
import styles from './Products.module.css';
import { BiSearchAlt2 } from 'react-icons/bi';
import Loading from '../../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const [text,setText] = React.useState('');
    const [search,setSearch] = React.useState('');
    const [allProducts,setAllProducts] = React.useState([]);
    const [loading,setLoading] = React.useState(true);
    const [productsFilter,setProductsFilter] = React.useState([]);
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        if(text){
            const value = text.toLowerCase();
            setSearch(value);
            setLoading(true);
        }
    }

    async function handleClick(){
        setSearch('');
        setText('');
        setLoading(true);
        const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json?');
        const data = await response.json();
        if(response.ok){
            setAllProducts(data);
            setLoading(false);
        }
    }
    
    React.useEffect(() => {
        if(!search){
           async function getItems(){
            const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json?');
            const data = await response.json();
            if(response.ok){
                setAllProducts(data);
                setLoading(false);
            }
        }
        getItems();  
        }          
    },[search]);

    React.useEffect(() => {
        if(search){
            setAllProducts([]);
            async function getItems2(){
                const response = await fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${search}`);
                const data = await response.json();
                if(response.ok){
                    setProductsFilter(data);
                    setLoading(false);
                }
            }
            getItems2();
        }
    },[search]);

    return (
        <section className={styles.container}>
            <h1>Welcome to our products page!</h1>
            <h3>See all products or search for a especific brand.</h3>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
               <input onChange={({target}) => setText(target.value)} value={text} placeholder='Maybelline' type='text'/>
               <button><BiSearchAlt2/> Search</button>
               <button onClick={handleClick}>All</button>
            </form>
            <div className={styles.productsContainer}>
               {loading && <Loading/>}
               {allProducts && !loading && allProducts.map((product) => {
                   const {api_featured_image,name,brand,id,price,price_sign} = product;
                   return (
                    <div key={id} className={styles.product}>
                        <img className={styles.productImg} src={api_featured_image} alt={name}/>
                        <h3 className={styles.productName}>{`${name.substring(0,10)}...`}</h3>
                        <h4 className={styles.productBrand}>{brand}</h4>
                        <h3 className={styles.productPrice}>Price: {price_sign}{price === '0.0' ? '10.0' : price}</h3>
                        <button onClick={() => navigate(`/product/${id}`)} className={styles.productBtn}>Buy</button>
                    </div>
                   )
               })}
               {productsFilter && !loading && productsFilter.map((product) => {
                    const {api_featured_image,name,brand,id,price,price_sign} = product;
                    return (
                     <div key={id} className={styles.product}>
                         <img className={styles.productImg} src={api_featured_image} alt={name}/>
                         <h3 className={styles.productName}>{`${name.substring(0,10)}...`}</h3>
                         <h4 className={styles.productBrand}>{brand}</h4>
                         <h3 className={styles.productPrice}>Price: {price_sign}{price === '0.0' ? '10.0' : price}</h3>
                         <button onClick={() => navigate(`/product/${id}`)} className={styles.productBtn}>Buy</button>
                     </div>
                    )
               })}
            </div>
        </section>
    )
}

export default Products;
