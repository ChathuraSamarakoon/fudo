import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/api';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Framer Motion components
import { motion, useInView } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// A reusable component to handle fade-in-on-scroll animation
const AnimatedSection = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.section>
    );
};

const HomePage = () => {
    const [latestProducts, setLatestProducts] = useState([]);

    const categories = [
        { name: 'Friedrice', image: 'fried-rice.png', label: 'Fried Rice' },
        { name: 'kottu', image: 'kotu.png', label: 'Kottu' },
        { name: 'burgres', image: 'burgur.png', label: 'Burgers' },
        { name: 'biriyani', image: 'biryani.png', label: 'Biriyani' },
        { name: 'deserts', image: 'desert.png', label: 'Deserts' },
        { name: 'drinks', image: 'drinks.png', label: 'Drinks' },
    ];

    useEffect(() => {
        const fetchLatestProducts = async () => {
            try {
                // This assumes you have a backend endpoint to get the latest products
                const response = await apiClient.get('/products/latest');
                setLatestProducts(response.data);
            } catch (error) {
                console.error("Failed to fetch latest products", error);
            }
        };
        fetchLatestProducts();
    }, []);

    return (
        <>
            {/* --- Main Slider Section --- */}
            <div className="home-bg">
                <section className="home">
                    <Swiper modules={[Pagination, Autoplay]} loop={true} pagination={{ clickable: true }} autoplay={{ delay: 3000, disableOnInteraction: false }}>
                        <SwiperSlide>
                            <div className="slide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '2rem', paddingBottom: '6rem' }}>
                                <motion.div className="image" style={{ flex: 1 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}><img src="/images/home-img-1.png" alt="" style={{ height: '40rem', width: '100%', objectFit: 'contain' }}/></motion.div>
                                <motion.div className="content" style={{ flex: 1 }}><span>20% Off</span><h3>New Dish</h3><Link to="/shop" className="btn">Shop Now</Link></motion.div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                             <div className="slide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '2rem', paddingBottom: '6rem' }}>
                                <div className="image" style={{ flex: 1 }}><img src="/images/home-img-2.png" alt="" style={{ height: '40rem', width: '100%', objectFit: 'contain' }}/></div>
                                <div className="content" style={{ flex: 1 }}><span>Most Selling 10% off</span><h3>Best Selling</h3><Link to="/shop" className="btn">Shop Now</Link></div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </section>
            </div>

            {/* --- Animated Category Slider Section --- */}
            <AnimatedSection>
                <div className="category">
                    <h1 className="heading">Shop by Category</h1>
                    <Swiper modules={[Pagination]} loop={true} spaceBetween={20} pagination={{ clickable: true }} breakpoints={{ 650: { slidesPerView: 3 }, 768: { slidesPerView: 4 }, 1024: { slidesPerView: 5 } }}>
                        {categories.map(cat => (
                            <SwiperSlide key={cat.name}>
                                <Link to={`/category/${cat.name}`} className="box" style={{ display: 'block', textAlign: 'center', padding: '2rem' }}>
                                    <img src={`/images/${cat.image}`} alt={cat.label} style={{ height: '7rem', width: '100%', objectFit: 'contain', marginBottom: '1rem' }} />
                                    <h3>{cat.label}</h3>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </AnimatedSection>
            
            {/* --- Animated Best Foods Section --- */}
            <AnimatedSection>
                <div className="home-products">
                    <h1 className="heading">Best Foods</h1>
                    <Swiper modules={[Pagination]} loop={true} spaceBetween={20} pagination={{ clickable: true }} breakpoints={{ 550: { slidesPerView: 2 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}>
                        {latestProducts.map(product => (
                            <SwiperSlide key={product.id}>
                                <div className="box" style={{padding: '2rem', border: 'var(--border)', borderRadius: '.5rem', position: 'relative'}}>
                                    <img src={`http://localhost:8080/uploaded_img/${product.image_01}`} alt={product.name} style={{ height: '20rem', width: '100%', objectFit: 'contain', marginBottom: '1rem' }}/>
                                    <div className="name" style={{textAlign: 'center'}}>{product.name}</div>
                                    <div className="flex" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <div className="price"><span> Rs </span>{product.price}<span>/-</span></div>
                                    </div>
                                    <button className="btn">Add to Cart</button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </AnimatedSection>
        </>
    );
};

export default HomePage;