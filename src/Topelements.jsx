import React, { useState, useEffect } from 'react';

const ElectronicProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/category/electronics?limit=4')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(json => {
        setProducts(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
    <h1 className='text-3xl font-semibold p-4 underline text-green-900'>top electronic products</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
  
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded shadow">
          <img src={product.image} alt={product.title} className="w-full h-36 object-cover mb-4" />
          <h2 className="text-sm ">{product.title}</h2>
          
          <p className="text-xl flex font-semibold mt-2">${product.price}</p>
          <button className="hover:bg-black bg-[#35383b] text-white font-serif py-1 px-2 ml-2 mt-4 text-right rounded-xl">
                      Add to Cart
                    </button>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ElectronicProducts;
