import { useState, useEffect } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { authService } from "../services/token";

const API = import.meta.env.VITE_API;

export default function Tabla() {
    const [products, setProducts] = useState([]);
    const UserId = authService.getUserId()
    console.log("🚀 ~ Tabla ~ UserId:", UserId)
    
    useEffect(()=>{
        const fetchCompras = async () => {
            const token = authService.getToken();
            console.log("🚀 ~ fetchCompras ~ token:", token)
            try {
              const response = await fetch(`${API}/purchases/${UserId}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  ...(token && { 'Authorization': `Bearer ${token}` })
                },
              });
              
              const data = await response.json()
              console.log("🚀 ~ fetchCompras ~ data:", data)
              
              if (!response.ok) {
                authService.removeToken();
                throw new Error(data.message || JSON.stringify(data));
              }
              
              setProducts(obtenerProductosCompras(data));
              
            } catch (error) {
              const errorMessage = error.message || JSON.stringify(error);
              console.error("Mensaje de error:", errorMessage);
            }finally {
              console.log("Llegue al finally")
            }
          };
          fetchCompras()
    },[UserId]);

    
    console.log("🚀 ~ antes de la funcion products:", products)
    function obtenerProductosCompras(products) {
        const result = [];
      
        products.forEach(purchase => {
          purchase.PurchaseDetails.forEach(detail => {
            result.push({
              date: purchase.date,
              title: detail.Game.title,
              price: detail.Game.price,
              quantity: detail.quantity
            });
          });
        });
      
        return result;
      }

    
    
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'ARS' });
    };

    const priceBodyTemplate = (products) => {
        return formatCurrency(products.price);
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Mis Compras</span>
        </div>
    );

    const footer = `Compras realizadas: ${products ? products.length : 0}.`;

    return (
        <div className="card">
            <DataTable value={products} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column field="date" header="Fecha"></Column>
                <Column field="title" header="Producto"></Column>
                <Column field="price" header="Precio" body={priceBodyTemplate}></Column>
                <Column field="quantity" header="Cantidad"></Column>

                {/* <p>{products}</p> */}
                {/* <Column field="TotalPagado" header="Total Pagado" body={priceBodyTemplate}></Column> */}
            </DataTable>
        </div>
    );
}
        

