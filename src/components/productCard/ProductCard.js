import React from "react";
import "./ProductCard.css";
import { deleteObject, ref } from "firebase/storage";
import { Storage, db } from "../../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ products, editOrDelete }) => {
const navigate = useNavigate();
    const handleDelete = (product) => {
        const imageRef = ref(Storage, product.imageUrl);
       // Delete the file
        deleteObject(imageRef).then(() => {
          // File deleted successfully
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });

try {
     deleteDoc(doc(db, "products", product.id));
     toast.success(`${product.name} deleted successfully`, {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });

} catch (error) {
    
}

    };
    const handleEdit = (product) => {
        
            navigate(`/admin/Add-product/${product.id}`);

        };
  return (
    <>
      {products?.map((product) => {
        const { id, name, price, imageUrl, type, vat } = product;
        const incVat =
          (parseFloat(price) * parseFloat(vat)) / 100 + parseFloat(price);
          
        return (
          <div key={id} className="all-products-item">
            <div className="image-container">
              <img src={imageUrl} alt={name} className="product-image" />
            </div>
            <div className="product-details">
              <p className={ type === `physical software` ? `product-type` : `product-type yellow` }>{type}</p>
              <h3 className="product-name">{name}</h3>
              <p className="product-price">
                <span style={{color:'blue',fontWeight:'bold'}}>Excl.</span> VAT € <span className="theprice">{parseFloat(price).toFixed(2)}</span> (Price Per Unit)
              </p>
              <p className="product-price">
              <span style={{color:'red',fontWeight:'bold'}}>Incl.</span> VAT € <span className="theprice">{incVat.toFixed(2)}</span>  (Price Per Unit)
              </p>
            </div>
            {editOrDelete ? (
              <div className="edit-delete-buttons">
                <button className="edit-button" onClick={()=>handleEdit(product)}>Edit</button>
                <button className="delete-button" onClick={()=>handleDelete(product)}>Delete</button>
              </div>
            ) : (
              <button className="add-to-cart-button">View</button>
            )}
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
