import React, { useEffect, useState } from 'react';
import PriceFilter from './pricefilter';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from './redux/actions';



const ProductModal = ({ product, onClose }) => {

  if (!product) return null;

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-black">Close</button>
        <img className="w-full mb-2 h-60" src={product.image} alt={product.title} />
        <h3 className="text-lg font-bold mb-2">{product.title}</h3>
        <p className="text-md mb-2">{product.description}</p>
        <p className="text-md font-bold mb-2">Price: ${product.price}</p>

        {
          product.id in cart ?
            <button className="hover:bg-black bg-[#35383b] text-white font-serif py-1 px-2 ml-2 mt-4 rounded-xl" onClick={() => handleRemoveFromCart(product.id)}>
              Remove Item
            </button>
            :
            <button className="hover:bg-black bg-[#35383b] text-white font-serif py-1 px-2 ml-2 mt-4 rounded-xl" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>

        }
      </div>
    </div>
  );
};

function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const fetchProducts = async (category = null, title = "") => {
    try {
      setIsLoading(true);
      let url = 'https://fakestoreapi.com/products';
      if (category) {
        url = `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;
      } else if (title) {
        url = `https://fakestoreapi.com/products?title=${title}`;
      }
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) => prevCategory === category ? null : category);
  };

  const handleSearch = (title) => {
    fetchProducts(null, title);
  };

  const handlePriceFilter = (minPrice, maxPrice) => {
    const filtered = products.filter(product => {
      const price = product.price;
      return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
    });
    setFilteredProducts(filtered);
  };

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  }

  const handleRemoveFromCart = (productId) => {
    dispatch(removeItemFromCart(productId));
  }

  return (
    <div className="min-h-screen flex flex-col mt-6">
      <div className="flex-1 md:flex m-4">
        <div className="block md:w-1/5">
          <div className="text-black p-4">
            <nav className="mb-4">
              <h1 className="text-lg font-bold text-center h-10 py-1 bg-blue-700 mb-4">Categories</h1>
              <div>
                {categories.map((category, index) => (
                  <div key={index} className="w-full">
                    <div className="p-4">
                      <p
                        className={category === selectedCategory ?
                          "text-lg font-bold cursor-pointer border bg-[#526b7d] text-white p-4"
                          : "text-lg font-bold mb-2 cursor-pointer"
                        }
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </nav>
            <PriceFilter onFilter={handlePriceFilter} />
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 lg:pr-0 overflow-y-auto">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="w-full">
                <div className="border bg-[#526b7d] text-white rounded-lg p-4">
                  <img
                    className="w-full mb-2 bg-[#2e373e] h-60 cursor-pointer"
                    src={product.image}
                    alt={product.title}
                    onClick={() => handleImageClick(product)}
                  />
                  <h3 className="text-sm font-cambria text-black mb-2">{product.title}</h3>
                  <p className="text-md font-bold text-black mb-2">
                    Price: ${product.price}
                    {
                      product.id in cart ?
                        <button className="hover:bg-black bg-[#35383b] text-white font-serif py-1 px-2 ml-2 mt-4 rounded-xl" onClick={() => handleRemoveFromCart(product.id)}>
                          Remove Item
                        </button>
                        :
                        <button className="hover:bg-black bg-[#35383b] text-white font-serif py-1 px-2 ml-2 mt-4 rounded-xl" onClick={() => handleAddToCart(product)}>
                          Add to Cart
                        </button>

                    }
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {isModalOpen && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
    </div>
  );
}

export default Product;
