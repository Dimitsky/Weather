import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './Pages/Root/Root';
import Home from './Pages/Home/Home';

const queryClient = new QueryClient();
const router = createBrowserRouter([
	{
		path: '/', 
		element: <Root />, 
		children: [
			{
				path: '/', 
				element: <Home />, 
			}, 
		]
	}, 
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<RouterProvider router={router}>
				<App />
			</RouterProvider>
		</QueryClientProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();