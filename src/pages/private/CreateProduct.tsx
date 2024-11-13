import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { addProduct, addLocalProduct } from '../../redux/slices/productsSlice';

const CreateProduct: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { loading, error } = useSelector(
		(state: RootState) => state.products
	);
	const products = useSelector((state: RootState) => state.products.products);

	const [title, setTitle] = useState('');
	const [price, setPrice] = useState<number>(0);
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [image, setImage] = useState('');

	const highestId = Math.max(...products.map((product) => product.id), 0);
	const newId = highestId + 1;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newProduct = {
			id: newId,
			title,
			price,
			description,
			category,
			image,
			rating: {
				rate: 0,
				count: 0,
			},
		};

		try {
			const createdProduct = await dispatch(
				addProduct(newProduct)
			).unwrap();
			dispatch(addLocalProduct(createdProduct));
			console.log(createdProduct);

			setTitle('');
			setPrice(0);
			setDescription('');
			setCategory('');
			setImage('');
			alert('Producto creado con éxito');
			navigate('/products');
		} catch (err) {
			alert('Error al crear el producto');
		}
	};

	return (
		<div>
			<h2 className='text-center'>Crear Producto</h2>
			<form onSubmit={handleSubmit}>
				<div className='input-container'>
					<label>Título</label>
					<input
						className='input-data'
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</div>
				<div className='input-container'>
					<label>Precio</label>
					<input
						className='input-data'
						type='number'
						value={price}
						onChange={(e) => setPrice(Number(e.target.value))}
						required
					/>
				</div>
				<div className='input-container'>
					<label>Descripción</label>
					<textarea
						className='input-data'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</div>
				<div className='input-container'>
					<label>Categoría</label>
					<input
						className='input-data'
						type='text'
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						required
					/>
				</div>
				<div className='input-container'>
					<label>URL de la Imagen</label>
					<input
						className='input-data'
						type='text'
						value={image}
						onChange={(e) => setImage(e.target.value)}
					/>
				</div>
				<button
					className='buttonLogin'
					type='submit'
					disabled={loading}
				>
					{loading ? 'Creando...' : 'Crear Producto'}
				</button>
				{error && <p>Error: {error}</p>}
			</form>
		</div>
	);
};

export default CreateProduct;
