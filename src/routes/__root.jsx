import { useState } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import  PizzaOfTheDay from '../PizzaOfTheDay';
import  Header from '../Header';
import { cartContext } from '../context';

export const  Route = createRootRoute({
    component : () => {
        const thing = [ 1, 5];
        const cartHook = useState([]);
        return (
            <>
            <cartContext.Provider value={cartHook}>
                <div>
                    <Header />
                    <Outlet />
                    <PizzaOfTheDay />
                </div>
            </cartContext.Provider>
            <TanStackRouterDevtools />
            <ReactQueryDevtools />
            </>
        );
    }
});
