import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const products = [
	{
		id: 1,
		name: "Apple BYZ S852I",
		price: "2927 Р",
		image: "/AppleBYZ.png",
		rating: "⭐ 4.7",
		category: "wired",
	},
	{
		id: 2,
		name: "Apple EarPods",
		price: "2327 Р",
		image: "/AppleEarPods.png",
		rating: "⭐ 4.5",
		category: "wired",
	},
	{
		id: 3,
		name: "Apple EarPods",
		price: "2327 Р",
		image: "/AppleEarContainer.png",
		rating: "⭐ 4.5",
		category: "wired",
	},
	{
		id: 4,
		name: "Apple BYZ S852I",
		price: "2927 Р",
		image: "/AppleBYZ.png",
		rating: "⭐ 4.7",
		category: "wired",
	},
	{
		id: 5,
		name: "Apple EarPods",
		price: "2327 Р",
		image: "/AppleEarPods.png",
		rating: "⭐ 4.5",
		category: "wired",
	},
	{
		id: 6,
		name: "Apple EarPods",
		price: "2327 Р",
		image: "/AppleEarContainer.png",
		rating: "⭐ 4.5",
		category: "wired",
	},
	{
		id: 7,
		name: "AppleAirPods",
		price: "9527 Р",
		image: "/AppleAirPods.png",
		rating: "⭐ 4.7",
		category: "wireless",
	},
	{
		id: 8,
		name: "GERLAX GH-04",
		price: "6527 Р",
		image: "/AppleBYZ.png",
		rating: "⭐ 4.7",
		category: "wireless",
	},
	{
		id: 9,
		name: "BOROFONE BO4",
		price: "7527 Р",
		image: "/BOFORONE.png",
		rating: "⭐ 4.7",
		category: "wireless",
	},
];

const App = () => {
	const [cartItems, setCartItems] = useState(() => {
		const sessionData = sessionStorage.getItem("cart");
		return sessionData ? JSON.parse(sessionData) : [];
	});

	useEffect(() => {
		sessionStorage.setItem("cart", JSON.stringify(cartItems));
	}, [cartItems]);

	const addProductToCart = (productToAdd) => {
		setCartItems((currentItems) => {
			const isProductInCart = currentItems.some(
				(item) => item.id === productToAdd.id
			);

			if (isProductInCart) {
				return currentItems.map((item) =>
					item.id === productToAdd.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			} else {
				return [...currentItems, { ...productToAdd, quantity: 1 }];
			}
		});
	};

	return (
		<div className="content-wrap">
			<div className="navbar">
				<Link to="/" className="logo">
					QPICK
				</Link>
				<Link to="/cart" className="cart-icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
						fill="currentColor"
						className="bi bi-cart3"
						viewBox="0 0 16 16"
					>
						<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
					</svg>
					<span className="cart-count">
						{cartItems.reduce((acc, item) => acc + item.quantity, 0)}
					</span>
				</Link>
			</div>

			<main className="main">
				<section className="product-section">
					<h1 className="section-title">Наушники</h1>
					<div className="product-grid">
						{products
							.filter((product) => product.category === "wired")
							.map((product) => (
								<div key={product.id} className="product-card">
									<img src={product.image} alt={product.name} />
									<div className="product-info">
										<h2>{product.name}</h2>
										<p className="price">{product.price}</p>
									</div>
									<div className="product-buy">
										<div className="rating">{product.rating}</div>
										<a
											href="#"
											onClick={(e) => {
												e.preventDefault();
												addProductToCart(product);
											}}
											className="buy-link"
										>
											Купить
										</a>
									</div>
								</div>
							))}
					</div>
				</section>
				<section className="product-section">
					<h2 className="section-title">Беспроводные наушники</h2>
					<div className="product-grid">
						{products
							.filter((product) => product.category === "wireless")
							.map((product) => (
								<div key={product.id} className="product-card">
									<img src={product.image} alt={product.name} />
									<div className="product-info">
										<h2>{product.name}</h2>
										<p className="price">{product.price}</p>
									</div>
									<div className="product-buy">
										<div className="rating">{product.rating}</div>
										<a
											href="#"
											onClick={(e) => {
												e.preventDefault();
												addProductToCart(product);
											}}
											className="buy-link"
										>
											Купить
										</a>
									</div>
								</div>
							))}
					</div>
				</section>
			</main>
			<footer className="site-footer">
				<div className="footer-content">
					<a href="#" className="footer-logo">
						QPICK
					</a>
					<ul className="list">
						<li>
							<Link href="#" className="footer-link">
								Избранное
							</Link>
						</li>
						<li>
							<Link href="#" className="footer-link">
								Корзина
							</Link>
						</li>
						<li>
							<Link href="#" className="footer-link">
								Контакты
							</Link>
						</li>
					</ul>
					<ul className="list">
						<li>
							<a href="#" className="footer-link">
								Условия сервиса
							</a>
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

export default App;
