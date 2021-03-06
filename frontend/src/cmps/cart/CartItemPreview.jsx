import React from 'react';
import QuntityBar from '../../cmps/general/QuntityBar.jsx';
import { Link } from 'react-router-dom';
import PriceContainer from '../general/PriceContainer.jsx';

export default function CartItemPreview({ deleteItem, item, changeQuantity }) {

    const onDeleteItem = () => {
        deleteItem(item.product._id);
    }

    const { imagesUrl, title, price, salePrice, _id } = item.product;
    return (
        <div className="cart-item-preview flex">
            <img src={imagesUrl[0].thumbnail} alt="Cart item" />
            <div className="cart-item-info flex column justify-between">
                <Link to={`/product/${_id}`} replace><h5>{title}</h5></Link>
                <PriceContainer price={price} salePrice={salePrice} />
                <QuntityBar quantity={item.quantity} changeQuantity={changeQuantity} itemId={_id} />
            </div>
            {item.quantity > 1 ?
                < div className="total-amount">
                    <span>סה"כ עבור <span>{item.quantity}</span> יחידות: </span>
                    <span>{item.quantity * (salePrice || price)}<i className="fas fa-shekel-sign"></i></span>
                </div> : null}

            <i onClick={onDeleteItem} className="fas fa-trash-alt"></i>
        </div >
    )
}
