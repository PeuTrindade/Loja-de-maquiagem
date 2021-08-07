import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { GiShoppingBag,GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
    const [mobile,setMobile] = React.useState(false);
    const [show,setShow] = React.useState(false);
    const screenSize = window.innerWidth;

    React.useEffect(() => {
        if(screenSize <= 600){
            setMobile(true);
        }
        else {
            setMobile(false);
        }
    });

    return (
        <header className={styles.headerContainer}>
            <nav className={styles.navbarContainer}>
                <h3><GiShoppingBag/> Makeup Market</h3>
                <div className={styles.menuContainer}>
                   {mobile ? 
                   <GiHamburgerMenu onClick={() => setShow(!show)} style={{color:'white',fontSize:'2rem',marginTop:'0.3rem',cursor:'pointer'}}/>
                   :            
                    <ul className={styles.desktopMenu}>
                      <li><Link className={styles.desktopMenuLink} to='/'>Home</Link></li>
                      <li><Link className={styles.desktopMenuLink} to='/products'>Products</Link></li>
                      <li><Link className={styles.desktopMenuLink} to='/about'>About us</Link></li>
                   </ul>}
                </div>
            </nav>
            {show && 
            <div className={styles.mobileContainer}>
                <ul className={styles.mobileMenu}>
                    <li><Link onClick={() => setShow(false)} className={styles.mobileMenuLink} to='/'>Home</Link></li>
                    <li><Link onClick={() => setShow(false)} className={styles.mobileMenuLink} to='/products'>Products</Link></li>
                    <li><Link onClick={() => setShow(false)} className={styles.mobileMenuLink} to='/about'>About us</Link></li>
                </ul>
            </div>}
        </header>
    )
}

export default Navbar;
