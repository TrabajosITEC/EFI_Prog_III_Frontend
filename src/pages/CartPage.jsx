import numeral from 'numeral';
import { useState, useEffect} from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { MainLayOut } from '../layouts/Mainlayout';
import { authService } from '../services/token';
import {  useNavigate } from 'react-router-dom';

import photoEmptyCart from '../assets/day2-gaming-console-Photoroom.png';

const API = import.meta.env.VITE_API;
export default function Cart(){
    const [cart,setCart] = useState();
    const [totalCart, setTotalCart] = useState();
    const navigate = useNavigate()
    const [CartStatus, setCartStatus] = useState(true)
    
    const UserId = authService.getUserId()
    console.log("🚀 ~ Cart ~ UserId :", UserId)
    
    useEffect(() => {
        const fetchCart = async () => {      
            const token = authService.getToken();
            try {
                const response = await fetch(`${API}/cart/${UserId}`, {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    ...(token && { 'Authorization': `Bearer ${token}` })
            },
        });
            const data = await response.json();
            console.log("🚀 response.ok:", response.ok)
            if (response.status === 404) {
                console.log(data.message);
                setCartStatus(false)
            } else if (!response.ok) {
                authService.removeToken();
                    const data = await response.json();
                    throw new Error(data.message || JSON.stringify(data));
                }
            
            setCart(data);
            
        } catch (error) {
            console.error("Mensaje de error:", error.message || JSON.stringify(error));
        }
    };
        fetchCart();
    }, [UserId]);

    console.log(cart)
    useEffect(() => {
        if (cart?.CartItems) {
            totalizar(cart.CartItems);
        }
    }, [cart]);


    const incrementarCarrito = async (id) => {      
        const token = authService.getToken();
        const cartId = cart.id
        console.log("🚀 CartID del incrementar:", cartId)
        const game = cart.CartItems.find(game => game.id === id)
        const gameId = game.game_id
        console.log("🚀 gameId del incrementar:", gameId)
        
        try {
            const response = await fetch(`${API}/cart/addQuantity`, {
                method: "POST",
                headers: {
            "Content-Type": "application/json",
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
            body: JSON.stringify({ cartId, gameId })
    });
    
    if (!response.ok) {
        authService.removeToken();
            const data = await response.json();
            throw new Error(data.message || JSON.stringify(data));
        }
        
        setCart(prevCart => ({
            ...prevCart,
            CartItems: prevCart.CartItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        }));

    } catch (error) {
        console.error("Mensaje de error:", error.message || JSON.stringify(error));
    }
};

    const disminuirCarrito = async (id) => {      
        const token = authService.getToken();

        const cartId = cart.id

        const game = cart.CartItems.find(game => game.id === id)
        const gameId = game.game_id

        try {
            const response = await fetch(`${API}/cart/substractQuantity`, {
                method: "POST",
                headers: {
            "Content-Type": "application/json",
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
            body: JSON.stringify({ cartId, gameId })
    });

    if (!response.ok) {
        authService.removeToken();
            const data = await response.json();
            throw new Error(data.message || JSON.stringify(data));
        }
        
        setCart(prevCart => ({
            ...prevCart,
            CartItems: prevCart.CartItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
        }));

    } catch (error) {
        console.error("Mensaje de error:", error.message || JSON.stringify(error));
    }
    };
        
    const finalizarCompraCarrito = async () => {      
        const token = authService.getToken();
        const userId = cart.user_id
        console.log("🚀 userId del incrementar:", userId)

        try {
            const response = await fetch(`${API}/cart/checkout`, {
                method: "POST",
                headers: {
            "Content-Type": "application/json",
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
            body: JSON.stringify({ userId })
        });

        if (!response.ok) {
        authService.removeToken();
            const data = await response.json();
            throw new Error(data.message || JSON.stringify(data));
        }
        
        navigate("/myPurchases");
        
        } catch (error) {
        console.error("Mensaje de error:", error.message || JSON.stringify(error));
        }
    };

    const eliminarItemCarrito = async (id) => {      
        const token = authService.getToken();
        try {
            const response = await fetch(`${API}/cart/item/${id}`, {
                method: "DELETE",
                headers: {
            "Content-Type": "application/json",
            ...(token && { 'Authorization': `Bearer ${token}` })},
            });

            if (!response.ok) {
            authService.removeToken();
                const data = await response.json();
                throw new Error(data.message || JSON.stringify(data));
            }

            setCart(prevCart => ({
                ...prevCart,
                CartItems: prevCart.CartItems.filter(item => item.id !== id)
            }));
    
        } catch (error) {
        console.error("Mensaje de error:", error.message || JSON.stringify(error));
        }
    };

    function totalizar(cartItems) {
        let result = 0;
      
        cartItems.forEach(cartItem => {
            result += cartItem.quantity * cartItem.Game.price
          });
          setTotalCart(result)
        };

  return (
    <MainLayOut>
      <div className="flex row p-4">
        {
          cart?.CartItems?.length === 0 || CartStatus === false ? (
            <div className="col-12 mt-0 flex-column d-flex align-items-center justify-content-center">
              <div>
                <img className='m-0 p-0' src={photoEmptyCart} alt="" style={{ width: '550px', height: '600px', maxWidth: '100%' }} />
              </div>
              <div>
                <h4 className='text-white titles'><br />El carrito<br /> <b>está vacío.</b></h4>
              </div>
            </div>
          ) : (
            <>
              <ul className="col-8 d-flex flex-column" style={{marginTop: '100px'}}>
                {
                  cart?.CartItems?.map(product => (
                    <li key={product.id} className="list-none mb-2 d-flex align-items-stretch">
                      <Card className='text-white titles w-100' style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}} title={product.Game.title}
                        subTitle={'Precio: ARS$ ' + numeral(product.Game.price).format('0,0.00')}>
                        <div className="grid align-items-center">
                          <div className="col-3 d-flex align-items-center gap-3">
                            <Button
                              style={{height: '30px', width: '100px'}}
                              label='Eliminar'
                              className="p-2 p-button-outlined p-button-rounded"
                              onClick={product.quantity > 1 ? () => disminuirCarrito(product.id) : ""}
                            />
                            <span className="font-light text-2xl text-center">{product.quantity}</span> 
                            <Button
                              style={{height: '30px', width: '100px'}}
                              label='Agregar'
                              className="p-2 p-button-outlined p-button-rounded"
                              onClick={() => incrementarCarrito(product.id)}
                            />
                            
                       
                          </div>
                          <div className="col-6">
                          
                            <p className="text-l text-center w-10rem mt-3">Total: {numeral(product.quantity * product.Game.price).format("$0,0.00")}</p>
                          </div>
                          <div className="col-2 flex justify-content-end">
                            <Button 
                              label="Eliminar Juego"
                              icon="pi pi-trash" 
                              className='p-button-outlined'
                              onClick={() => eliminarItemCarrito(product.id)}
                            />
                          </div>
                        </div>
                      </Card>
                    </li>
                  ))}
              </ul>
              {cart?.CartItems?.length > 0 && (
                <div className="col-4" style={{marginTop: '100px'}}>
                  <Card className='titles text-white pb-3' title={'Resumen de Compra'} style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
                    <div className="d-flex mx-auto grid mb-1">
                      <div className="col-7">
                        <p>Productos comprados: {cart?.CartItems?.length || 0}</p>
                        <p>Total: {numeral(totalCart).format('$0,0.00')}</p>
                      </div>
                      <div className="col-5 pt-2">
                        <Button style={{ marginBottom: "10px" }}
                          label="Finalizar compra"
                          raised size="normal"
                          className='p-button-outlined'
                          onClick={() => finalizarCompraCarrito()}
                          disabled={cart?.CartItems?.length === 0 || CartStatus === false ? true : false}
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </>
          )
        }
      </div>
    </MainLayOut>
  );
  
};