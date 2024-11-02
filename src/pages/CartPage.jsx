import numeral from 'numeral';
import { useState, useEffect} from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { MainLayOut } from '../layouts/Mainlayout';
import { authService } from '../services/token';

const API = import.meta.env.VITE_API;
export default function Cart(){
    const [cart,setCart] = useState();
    const [totalCart, setTotalCart] = useState();
    
    const UserId = authService.getUserId()
    console.log("🚀 ~ Cart ~ UserId :", UserId)
    
    useEffect(() => {
        console.log("UseEffect se está ejecutando");
        console.log("UserId:", UserId);
        console.log("API:", API);
        
        
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
        
        if (!response.ok) {
            authService.removeToken();
                const data = await response.json();
                throw new Error(data.message || JSON.stringify(data));
            }
            
            const data = await response.json();
            setCart(data);
            console.log("🚀 Data despues del await:", data)
            
        } catch (error) {
            console.error("Mensaje de error:", error.message || JSON.stringify(error));
        }
    };
    
        fetchCart();
    }, [UserId]);

    useEffect(() => {
        if (cart?.CartItems) {
            totalizar(cart.CartItems);
        }
    }, [cart]);
    
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
                                    ></Button>
                                    <span className="font-light text-2xl w-2rem text-center">{product.quantity}</span>
                                    <Button
                                        icon="pi pi-plus"
                                        className="p-button-outlined p-button-rounded p-button-success"
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
                                    ></Button>
                                </div>
                            </div>
                        </Card>
                    </li>
                    ))}
                </ul>
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
                                // disabled={totalCarritoCont || totalCarrito===0 ?true:false}
                            />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </MainLayOut>
    )
}