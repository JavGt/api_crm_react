import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';

const VerCliente = () => {
	const [cliente, setCliente] = useState({});
	const [cargando, setCargando] = useState(true);

	const { id } = useParams();

	useEffect(() => {
		const obtenerClienteApi = async () => {
			try {
				const url = `http://localhost:4000/clientes/${id}`;

				const respuesta = await fetch(url);
				const resultado = await respuesta.json();

				setCliente(resultado);
			} catch (error) {
				console.log(error);
			}
			setCargando(false);
		};

		obtenerClienteApi();
	}, []);

	return cargando ? (
		<Spinner />
	) : Object.keys(cliente).length === 0 ? (
		<h1 className='font-black text-4xl text-blue-900'>No hay resultados</h1>
	) : (
		<div>
			<>
				<h1 className='font-black text-4xl text-blue-900'>
					Ver Cliente: {cliente.nombre}
				</h1>
				<p className='mt-3'>Información del cliente</p>

				<p className='text-4xl mt-4 text-gray-600 mt-10'>
					<span className='text-gray-800 uppercase font-bold'>Cliente: </span>
					{cliente.nombre}
				</p>

				<p className='text-2xl mt-4 text-gray-600'>
					<span className='text-gray-800 uppercase font-bold'>Email: </span>
					{cliente.email}
				</p>
				<p className='text-2xl mt-4 text-gray-600'>
					<span className='text-gray-800 uppercase font-bold'>Teléfono: </span>
					{cliente.telefono ? cliente.telefono : 'No hay Teléfono'}
				</p>
				<p className='text-2xl mt-4 text-gray-600'>
					<span className='text-gray-800 uppercase font-bold'>Empresa: </span>
					{cliente.empresa}
				</p>
				<p className='text-2xl mt-4 text-gray-600'>
					<span className='text-gray-800 uppercase font-bold'>Notas: </span>
					{cliente.notas ? cliente.notas : 'No hay notas'}
				</p>
			</>
		</div>
	);
};

export default VerCliente;
