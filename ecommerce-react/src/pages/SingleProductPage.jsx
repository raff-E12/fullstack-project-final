import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function SingleProductPage() {

    const { slug } = useParams();

    const endPoint = `http://127.0.0.1:3000/products/${slug}`;

    const [productSlug, setProductSlug] = useState([]);

    const { addToCart } = useCart();

    function getProductsSlug() {
        axios.get(endPoint)
            .then((res) => {
                setProductSlug(res.data.products[0]);
                // console.log("Prodotto recuperato:", res.data.products[0]);
            })
            .catch((error) => {
                console.error("Errore nel recupero del prodotto:", error);
            });
    };

    useEffect(() => {
        getProductsSlug();
    }, []);

    const { name, description, price, image_url, fabric, discount, category_name, start_discount, end_discount, sku_order_code, brand } = productSlug;

    return(<>
      <div className='container-xxl prod-sc d-flex'>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">Products</li>
                <li class="breadcrumb-item" aria-current="page">{category_name}</li>
            </ol>
        </nav>
       {productSlug.length !== 0 ?  <div className='container-lg p-2 d-flex sections-prod'>
             <div className='prod-review'>
                <p className='sale-prod'>{discount} %</p>
                <div className='img-prod-add'>
                    <img  src={image_url} alt={name} />
                </div>
             </div>
            <div className='prod-descriptions'>
               <div className='text-prod'>
                  <p id='text-dec'>- Descrizione Prodotti</p>
                    <h1>{name}</h1>
                    <h4 id='price'>€{price}</h4>
               </div>
               <div className='extra-prod'>
                    <h5>Descrizione:</h5>
                    <p>{description}</p>
               </div>
                <button className='btn-prod' onClick={() => addToCart(productSlug)}> Aggiungi al carrello </button>
            </div>
        </div> :  <div className='container-lg p-2 d-flex sections-prod'> <b>Loading...</b> </div>}
        <div className='desc-prod'>
            <div className='box-desc review'>
               <div className='review-number rv-number'>
                    <h2 id='percents-rv'>4.3</h2>
                    <a id='links-hovering'><p>Vedi le recensioni <i class="bi bi-arrow-right-short"></i></p></a>
               </div>
               <div className='review-number rv-parph'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et commodo ex. 
                        In consequat ac lacus ut semper, interdum ac orci.</p>
               </div>
            </div>
              <div className='box-desc desc'>
                <div className='list-desc'>
                    <ul>
                        <li><p><b>Sku:</b> {sku_order_code}</p></li>
                        <li><p><b>Material: </b>{fabric}</p></li>
                        <li><p><b>Brand:</b> {brand}</p></li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </>)

};