import { useEffect, useState } from 'react';
import Cliente from '../components/Cliente';
import Spinner from '../components/Spinner';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Inicio = () => {
	const [clientes, setClientes] = useState([]);
	const [cargando, setCargando] = useState(true);

	useEffect(() => {
		const obtenerClientesApi = async () => {
			try {
				const url = 'http://localhost:4000/clientes';
				const respuesta = await fetch(url);
				const resultado = await respuesta.json();
				setClientes(resultado);
			} catch (error) {
				console.log(error);
			}
		};

		setCargando(false);

		obtenerClientesApi();
	}, [clientes]);

	const handleEliminar = async id => {
		
		Swal.fire({
			title: '¿Desea reiniciar la app?',
			text: 'Se perderán todas sus cuentas ',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3B82F6',
			cancelButtonColor: '#DD3333',
			confirmButtonText: 'Si, Eliminar',
		}).then(result => {
			if (result.isConfirmed) {
				Swal.fire(
					'¡Completado!',
					'Se ha eliminado de manera correcta',
					'success'
				);
				const url = `http://localhost:4000/clientes/${id}`;

				const respuesta = fetch(url, {
					method: 'DELETE',
				});
			}
		});
	};

	return (
		<>
			<h1 className='font-black text-4xl text-blue-900'>Cliente</h1>
			<p className='mt-3'>Administra tus clientes</p>
			{cargando ? (
				<Spinner />
			) : (
				<table className='w-full mt-5 table-auto shadow bg-white'>
					<thead className='bg-blue-800 text-white'>
						<tr>
							<th className='p-2'>Nombre</th>
							<th className='p-2'>Contacto</th>
							<th className='p-2'>Empresa</th>
							<th className='p-2'>Acciones</th>
						</tr>
					</thead>

					<tbody>
						{clientes.map(cliente => (
							<Cliente
								key={cliente.id}
								cliente={cliente}
								handleEliminar={handleEliminar}
							/>
						))}
					</tbody>
				</table>
			)}
		</>
	);
};

export default Inicio;
