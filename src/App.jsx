import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Inicio from './pages/Inicio';
import NuevoCliente from './pages/NuevoCliente';
import EditarClientes from './pages/EditarClientes';
import VerCliente from './pages/VerCliente';

function App() {
	return (
		<BrowserRouter>
			<Routes>

				<Route path='/clientes' element={<Layout />}>
					<Route index element={<Inicio />} />
					<Route path='nuevo' element={<NuevoCliente />} />
					<Route path=':id' element={<VerCliente />} />

					<Route path='editar/:id' element={<EditarClientes />} />
				</Route>
				{/*  */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
