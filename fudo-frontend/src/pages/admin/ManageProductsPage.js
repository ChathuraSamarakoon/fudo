import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';

const ManageProductsPage = () => {
    const [products, setProducts] = useState([]);
    const imageBaseUrl = 'http://localhost:8080/uploaded_img/';

    // State for the "Add Product" form
    const [productDetails, setProductDetails] = useState({ name: '', price: '', details: '', category: '' });
    // State for the file inputs
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await adminService.getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleTextChange = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e, fileNumber) => {
        if (fileNumber === 1) setImage1(e.target.files[0]);
        if (fileNumber === 2) setImage2(e.target.files[0]);
        if (fileNumber === 3) setImage3(e.target.files[0]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', productDetails.name);
        formData.append('price', productDetails.price);
        formData.append('details', productDetails.details);
        formData.append('category', productDetails.category);
        formData.append('image_01', image1);
        formData.append('image_02', image2);
        formData.append('image_03', image3);

        try {
            await adminService.createProduct(formData);
            alert('Product added successfully!');
            // Clear form state
            setProductDetails({ name: '', price: '', details: '', category: '' });
            setImage1(null);
            setImage2(null);
            setImage3(null);
            e.target.reset(); // Reset file inputs
            fetchProducts(); // Refresh the product list
        } catch (error) {
            console.error("Failed to add product", error);
            alert('Failed to add product.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await adminService.deleteProduct(id);
                fetchProducts();
            } catch (error) {
                console.error("Failed to delete product", error);
            }
        }
    };

    return (
        <>
            <section className="add-products">
                <h1 className="heading">Add Product</h1>
                <form onSubmit={handleFormSubmit}>
                    <input type="text" name="name" placeholder="Product Name" value={productDetails.name} onChange={handleTextChange} className="box" required/>
                    <input type="number" name="price" placeholder="Product Price" value={productDetails.price} onChange={handleTextChange} className="box" required/>
                    <input type="text" name="category" placeholder="Product Category" value={productDetails.category} onChange={handleTextChange} className="box" required/>
                    <textarea name="details" placeholder="Product Details" value={productDetails.details} onChange={handleTextChange} className="box" required></textarea>
                    
                    <span>Image 01 (required):</span>
                    <input type="file" name="image_01" onChange={(e) => handleFileChange(e, 1)} accept="image/*" className="box" required/>
                    <span>Image 02 (required):</span>
                    <input type="file" name="image_02" onChange={(e) => handleFileChange(e, 2)} accept="image/*" className="box" required/>
                    <span>Image 03 (required):</span>
                    <input type="file" name="image_03" onChange={(e) => handleFileChange(e, 3)} accept="image/*" className="box" required/>

                    <input type="submit" value="Add Product" className="btn" />
                </form>
            </section>

            <section className="show-products">
                <h1 className="heading">Products Added</h1>
                <div className="box-container">
                    {products.map(product => (
                        <div className="box" key={product.id}>
                            <img src={`${imageBaseUrl}${product.image_01}`} alt={product.name} />
                            <div className="name">{product.name}</div>
                            <div className="price">Rs <span>{product.price}</span>/-</div>
                            <div className="details"><span>{product.details}</span></div>
                            <div className="flex-btn">
                                <button className="option-btn">Update</button>
                                <button onClick={() => handleDelete(product.id)} className="delete-btn">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default ManageProductsPage;