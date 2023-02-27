import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './Pages/Root/Root';
import HomePage from './Pages/HomePage/HomePage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import FavoritesPage from './Pages/FavoritesPage/FavoritesPage';
import CurrentLocationRequire from './HOCs/CurrentLocationRequire/CurrentLocationRequire';
import LocationPage from './Pages/LocationPage/LocationPage';

const queryClient = new QueryClient();
const router = createBrowserRouter([
	{
		path: '/', 
		element: <Root />, 
		errorElement: <NotFoundPage />,
		children: [
			{
				path: '/', 
				element: (
					<CurrentLocationRequire>
						<HomePage />
					</CurrentLocationRequire>
				), 
			}, 
			{
				path: '/favorites', 
				element: <FavoritesPage />
			}, 
			{
				path: '/location', 
				element: <LocationPage />
			}, 
		]
	}, 
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				{/* <ReactQueryDevtools initialIsOpen={false} /> */}
				<RouterProvider router={router}>
					<App />
				</RouterProvider>
			</QueryClientProvider>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
