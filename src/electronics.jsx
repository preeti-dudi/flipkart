import React,{useState,useEffect} from "react";


function Electronics() {
    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([]);
    
  
    useEffect(() => {
      fetch('https://fakestoreapi.com/products/category/women%27s%20clothing?limit=4')
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

     
    useEffect(() => {
        fetch('https://fakestoreapi.com/products/category/men%27s%20clothing?limit=4')
          .then(res => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          })
          .then(json => {
            setItems(json);
            setLoading(false);
          })
          .catch(err => {
            setError(err);
            setLoading(false);
          });
      }, []);


    return (
    
    <div className="container mx-auto p-4">
   

    <h2 className="text-3xl font-bold text-left p-2 text-green-900 underline">trending gadget and appliances</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  gap-8">
        
        <div className=" p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 rounded-lg shadow-md">
        {products.map(product => (
        <div key={product.id} className="border p-4 rounded shadow">
          <img src={product.image} alt={product.title} className="w-full h-32 object-cover mb-4" />
          <h2 className="text-md ">{product.title}</h2>
          
          <p className="text-xl font-semibold mt-2">${product.price}</p>
        </div>
      ))} 
        </div>
        
    <div className=''>
        <div className="  p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 rounded-lg shadow-md">
        {items.map(item=> (
        <div key={item.id} className="border p-4 rounded  shadow">
          <img src={item.image} alt={item.title} className="w-full h-44 object-cover mb-4" />
          <h2 className="text-md">{item.title}</h2>
          
          <p className="text-xl font-semibold mt-2">${item.price}</p>
        </div>
      ))} 
    </div>
    </div>
    {/* <div className=''>
        <img src="./src/assets/f.webp" alt="error"  />
    </div> */}
    </div>
</div>


);
}

export default Electronics; 