import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Alerta from './Alerta';
import Spinner from './Spinner';

const Formulario = ({ cliente, cargando }) => {
	const navigate = useNavigate();

	const nuevoClienteSchema = Yup.object().shape({
		nombre: Yup.string()
			.min(3, 'El nombre es muy corto')
			.max(30, 'El nombre es muy largo')
			.required('El nombre del cliente es obligatorio'),
		empresa: Yup.string().required('El nombre de la empresa es obligatorio'),
		email: Yup.string()
			.email('Ingrese un email valido')
			.required('El email es obligatorio'),
		telefono: Yup.number()
			.positive('Número no valido')
			.typeError('El número de teléfono no es valido ')
			.integer('Número no valido'),
	});

	const handleSubmit = async valores => {
		let respuesta;

		const paramsFetch = {
			body: JSON.stringify(valores),
			headers: { 'Content-Type': ' application/json' },
		};

		try {
			if (cliente.id) {
				// Editando un registro
				const url = `http://localhost:4000/clientes/${cliente.id}`;
				paramsFetch.method = 'PUT';
				respuesta = await fetch(url, paramsFetch);
			} else {
				// Nuevo registro
				const url = 'http://localhost:4000/clientes';
				paramsFetch.method = 'POST';
				respuesta = await fetch(url, paramsFetch);
			}

			await respuesta.json();

			navigate('/clientes');
		} catch (error) {
			console.log(error);
		}
	};

	return cargando ? (
		<Spinner />
	) : (
		<div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
			<h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
				{cliente?.nombre ? 'Editar' : 'Agregar'} Cliente
			</h1>

			<Formik
				initialValues={{
					nombre: cliente.nombre ?? '',
					empresa: cliente.empresa ?? '',
					email: cliente.email ?? '',
					telefono: cliente.telefono ?? '',
					notas: cliente.notas ?? '',
				}}
				enableReinitialize={true}
				onSubmit={async (values, { resetForm }) => {
					await handleSubmit(values);
					resetForm();
				}}
				validationSchema={nuevoClienteSchema}
			>
				{({ errors, touched }) => {
					console.log(errors);
					return (
						<Form className='mt-10'>
							<div className='mb-4'>
								<label className='text-gray-800' htmlFor='nombre'>
									Nombre:
								</label>
								<Field
									id='nombre'
									type='text'
									className='mt-2 block w-full p-3 bg-blue-100 rounded-md'
									placeholder='Nombre del cliente'
									name='nombre'
								/>
								{errors.nombre && touched.nombre ? (
									<Alerta>{errors.nombre}</Alerta>
								) : (
									''
								)}
							</div>
							<div className='mb-4'>
								<label className='text-gray-800' htmlFor='empresa'>
									Empresa:
								</label>
								<Field
									id='empresa'
									type='text'
									className='mt-2 block w-full p-3 bg-blue-100 rounded-md '
									placeholder='Empresa del cliente'
									name='empresa'
								/>
								{errors.empresa && touched.empresa ? (
									<Alerta>{errors.empresa}</Alerta>
								) : (
									''
								)}
							</div>
							<div className='mb-4'>
								<label className='text-gray-800' htmlFor='email'>
									Email:
								</label>
								<Field
									id='email'
									type='email'
									className='mt-2 block w-full p-3 bg-blue-100 rounded-md'
									placeholder='Email del cliente'
									name='email'
								/>
								{errors.email && touched.email ? (
									<Alerta>{errors.email}</Alerta>
								) : (
									''
								)}
							</div>
							<div className='mb-4'>
								<label className='text-gray-800' htmlFor='telefono'>
									Teléfono:
								</label>
								<Field
									id='telefono'
									type='text'
									className='mt-2 block w-full p-3 bg-blue-100 rounded-md'
									placeholder='Teléfono del cliente'
									name='telefono'
								/>
								{errors.telefono && touched.telefono ? (
									<Alerta>{errors.telefono}</Alerta>
								) : (
									''
								)}
							</div>
							<div className='mb-4'>
								<label className='text-gray-800' htmlFor='notas'>
									Notas:
								</label>
								<Field
									as='textarea'
									id='notas'
									type='text'
									className='mt-2 block w-full p-3 bg-blue-100 h-40 rounded-md'
									placeholder='Notas del cliente'
									name='notas'
								/>
								{errors.notas && touched.notas ? (
									<Alerta>{errors.notas}</Alerta>
								) : (
									''
								)}
							</div>
							<input
								type='submit'
								value={`${cliente?.nombre ? 'Editar' : 'Agregar'} Cliente`}
								className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg hover:cursor-pointer'
							/>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

Formulario.defaultProps = {
	cliente: {},
	cargando: false,
};

export default Formulario;
