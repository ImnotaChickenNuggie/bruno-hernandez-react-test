import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProducts, clearProducts } from '../../redux/slices/productsSlice';
import { RootState, AppDispatch } from '../../redux/store';
import '../../styles/products.scss';

const Products: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const products = useSelector((state: RootState) => state.products.products);
	const [searchProduct, setSearchProduct] = useState('');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 4;

	useEffect(() => {
		if (products.length === 0) {
			dispatch(getProducts());
		}
	}, [dispatch, products.length]);

	const filteredProducts = products.filter((product) =>
		product.title.toLowerCase().includes(searchProduct.toLowerCase())
	);

	const sortedProducts = filteredProducts.sort((a, b) => {
		const comparison = a.title.localeCompare(b.title);
		return sortOrder === 'asc' ? comparison : -comparison;
	});

	const indexOfLastProduct = currentPage * itemsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
	const currentProducts = sortedProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);
	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	const handleItemClick = (id: number) => {
		navigate(`/products/${id}`);
	};

	const handleReset = () => {
		dispatch(clearProducts());
		alert('Todos los productos han sido eliminados.');
	};
	return (
		<div className='container-products'>
			<h1>Productos</h1>
			<a
				className='buttonCreateProduct'
				href='/#/products/create'
			>
				+ Crear nuevo producto
			</a>
			<div className='container-utils'>
				<input
					className='inputSearch'
					type='text'
					placeholder='Buscar por título'
					value={searchProduct}
					onChange={(e) => setSearchProduct(e.target.value)}
				/>
				<button
					onClick={() =>
						setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
					}
				>
					{sortOrder === 'asc' ? '⬇ Descendente' : '⬆ Ascendente'}
				</button>
				<button
					className='buttonDelete'
					onClick={handleReset}
				>
					Eliminar Todos los Productos
				</button>
			</div>

			{currentProducts.length > 0 ? (
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Título</th>
							<th>Precio</th>
						</tr>
					</thead>
					<tbody>
						{currentProducts.map((product) => (
							<tr
								key={product.id}
								onClick={() => handleItemClick(product.id)}
							>
								<td>{product.id}</td>
								<td>{product.title}</td>
								<td>${product.price}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className='textNotFound'>❌ No existe el artículo</p>
			)}
			<div className="pagination">
				{Array.from({ length: totalPages }, (_, index) => (
					<button
						key={index + 1}
						onClick={() => setCurrentPage(index + 1)}
						disabled={currentPage === index + 1}
					>
						{index + 1}
					</button>
				))}
			</div>
		</div>
	);
};

export default Products;
