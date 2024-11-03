import numeral from 'numeral';
import { useState, useEffect} from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { MainLayOut } from '../layouts/Mainlayout';
import { authService } from '../services/token';
import {  useNavigate } from 'react-router-dom';

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
        
        navigate("/misCompras")
        
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

    return(
        <MainLayOut>
            <div className="flex row">
                {
                 cart?.CartItems?.length === 0 || CartStatus === false ?
                 <div className="col-8 mt-0">
                     <h2>Carrito Vacio</h2>
                 </div>
                :
                <ul className="col-8 mt-0">
                {
                cart?.CartItems?.map(product => (
               
                <li key={product.id} className="list-none mb-2">
                    <Card title={product.Game.title}
                    subTitle={'Precio unitario: $' + numeral(product.Game.price).format('0,0.00')}
                    >
                        <div className="grid align-items-center">
                            <div className="col-3 flex align-items-center gap-3">
                                <Button
                                    icon="pi pi-minus"
                                    className="p-button-outlined p-button-rounded"
                                    onClick={product.quantity > 1 ? () => disminuirCarrito(product.id): ""}
                                ></Button>
                                <span className="font-light text-2xl w-2rem text-center">{product.quantity}</span>
                                <Button
                                    icon="pi pi-plus"
                                    className="p-button-outlined p-button-rounded p-button-success"
                                    onClick={()=>incrementarCarrito(product.id)}
                                ></Button>
                            </div>
                            <div className="col-6">
                            <p className="text-l text-center w-8rem">Subtotal pesos: {numeral(product.quantity * product.Game.price).format('$0,0.00')}</p>
                            </div>
                            <div className="col-2 flex justify-content-end">
                                <Button 
                                    label="Eliminar"
                                    icon="pi pi-trash" 
                                    severity="danger" 
                                    className="bg-red-500" 
                                    onClick={()=>eliminarItemCarrito(product.id)}
                                ></Button>
                            </div>
                        </div>
                    </Card>
                </li>
                ))}
            </ul>
                }


                <div className="col-4">
                    <Card title={'Resumen de Compra'}>
                        <div className="grid ">
                            <div className="col-7">
                                <p className="font-bold">Productos comprados: {cart?.CartItems?.length || 0}</p>
                                <p className="font-bold">Total Pesos: {numeral(totalCart).format('$0,0.00')}</p>
                            </div>
                            <div className="col-5 pt-2">
                            <Button style={{marginBottom:"10px"}}
                                label="Comprar"
                                raised size="normal"
                                onClick={()=>finalizarCompraCarrito()}
                                disabled={ cart?.CartItems?.length === 0 ||  CartStatus === false ? true:false}
                            />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </MainLayOut>
    )
}