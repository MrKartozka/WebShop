import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
	const [cartItems, setCartItems] = useState(() => {
		const sessionData = sessionStorage.getItem("cart");
		return sessionData ? JSON.parse(sessionData) : [];
	});

	useEffect(() => {
		sessionStorage.setItem("cart", JSON.stringify(cartItems));
	}, [cartItems]);

	const removeFromCart = (productId) => {
		const remainingItems = cartItems.filter((item) => item.id !== productId);
		setCartItems(remainingItems);
	};

	const changeQuantity = (product, newQuantity) => {
		const updatedItems = cartItems.map((item) =>
			item.id === product.id
				? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }
				: item
		);
		setCartItems(updatedItems);
	};

	const calculateTotalPrice = () => {
		return cartItems
			.reduce(
				(total, currentItem) =>
					total + parseFloat(currentItem.price) * currentItem.quantity,
				0
			)
			.toFixed(2);
	};

	return (
		<div className="cart-content-wrap">
			<nav className="cart-navbar">
				<Link to="/" className="cart-logo">
					QPICK
				</Link>
			</nav>
			<main className="cart-main">
				<div className="cart-items-container">
					<h1 className="cart-section-title">Корзина</h1>
					{cartItems.length > 0 ? (
						<div className="cart-product-grid">
							{cartItems.map((item, index) => (
								<div key={index} className="cart-product-card">
									<img src={item.image} alt={item.name} />
									<div className="cart-product-info">
										<h2>{item.name}</h2>
										<p className="cart-price">{item.price}</p>
										<div className="cart-quantity-changer">
											<button
												onClick={() => changeQuantity(item, item.quantity - 1)}
											>
												-
											</button>
											<span>{item.quantity}</span>
											<button
												onClick={() => changeQuantity(item, item.quantity + 1)}
											>
												+
											</button>
										</div>
										<button
											onClick={() => removeFromCart(item.id)}
											className="cart-delete-btn"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												fill="currentColor"
												className="bi bi-trash"
												viewBox="0 0 16 16"
											>
												<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
												<path
													fillRule="evenodd"
													d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
												/>
											</svg>
										</button>
									</div>
								</div>
							))}
						</div>
					) : (
						<p>Ваша корзина пуста!</p>
					)}
				</div>
				{cartItems.length > 0 && (
					<aside className="cart-checkout-panel">
						<div className="cart-total-section">
							<span className="cart-total-label">Итого:</span>
							<span className="cart-total-amount">
								{calculateTotalPrice()} Р
							</span>
						</div>
						<Link to="#" className="cart-checkout-btn">
							Перейти к оформлению
						</Link>
					</aside>
				)}
			</main>
			<footer className="cart-footer">
				<div className="cart-footer-content">
					<Link to="/" className="cart-footer-logo">
						QPICK
					</Link>
					<ul className="list">
						<li>
							<Link to="#" className="footer-link">
								Избранное
							</Link>
						</li>
						<li>
							<Link to="/cart" className="footer-link">
								Корзина
							</Link>
						</li>
						<li>
							<Link to="#" className="footer-link">
								Контакты
							</Link>
						</li>
					</ul>
					<ul className="list">
						<li>
							<Link to="#" className="footer-link">
								Условия сервиса
							</Link>
						</li>
						<li>
							<font>a</font>
						</li>
						<li>
							<div className="language-switcher">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									fill="currentColor"
									className="bi bi-globe"
									viewBox="0 0 16 16"
								>
									<path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
								</svg>
								<a href="#" className="language-link mainlink">
									Рус
								</a>
								<a href="#" className="language-link">
									Eng
								</a>
							</div>
						</li>
					</ul>
					<div className="social-icons">
						<a href="https://vk.com">
							<img src="/VK.png" className="vkont" />
						</a>
						<a href="https://www.whatsapp.com/">
							<img src="/Whatsapp.png" />
						</a>
						<a href="https://telegram.org">
							<img src="/Telegram.png" />
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Cart;
