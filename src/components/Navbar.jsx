import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';


export default function NavBar() {
  

    const navigate = useNavigate();

    const startItems = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => {
                navigate("/")
            }
        },
        {
            label: 'Users',
            icon: 'pi pi-list',
            command: () => {
                navigate("/users")
            }
        },
        {
            label: 'Contacto',
            icon: 'pi pi-envelope',
            command: () => {
                navigate("/about")
            }
        },
    ];

    const endItems =
    <div className='flex flex-row' >
        
            <Avatar 
            icon="pi pi-user" 
            size="large" 
            style={{ backgroundColor: '#FFFFFF', color: '#FF4500' }} 
            shape="circle" 
            />

        <Button 
        label="Cerrar Sesion" 
        icon="pi pi-power-off"
        style={{background:'None', border:'None', color:'blue'}}
        />
    </div>
    
        
    
    return (
        <div className="card" style={{marginTop:0}}>
            <Menubar className='custom-menubar' model={startItems} end={endItems} />
        </div>
    )
}
