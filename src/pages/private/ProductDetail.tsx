import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getProductById } from '../../redux/slices/productsSlice';
import '../../styles/productDetail.scss';

const ProductDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const product = useSelector(
		(state: RootState) => state.products.productDetail
	);

	useEffect(() => {
		if (id) {
			dispatch(getProductById(id));
		}
	}, [dispatch, id]);

	if (!product) return <p>No se encontró el producto.</p>;
	return (
		<div className="product-details">
			<h1 className='text-center'>{product.title}</h1>
			<img
				src={product.image}
				alt={product.title}
				style={{ width: '200px' }}
			/>
			<p className="price">Precio: ${product.price}</p>
			<p>Descripción: {product.description}</p>
			<p>Categoría: {product.category}</p>
			<p className="rating">
				Rating: {product.rating.rate} ({product.rating.count} reviews)
			</p>
		</div>
	);
};

export default ProductDetail;
