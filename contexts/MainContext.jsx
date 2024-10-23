import { useState, useEffect } from "react"
import { createContext } from "react";
import PropTypes from 'prop-types';

export const ModeContext = createContext()

export const ModeProvider = ({children})=>{ 
    // const [recetas, setRecetas] = useState("")
    
    // useEffect(() => {
    //     setRecetas(JSON.parse(localStorage.getItem('listarecetas')) || []);
    // }, []);

    const [userActive, setUserActive] = useState("")

    const data = {  userActive, setUserActive };
    return(
        <ModeContext.Provider value={data}>
            {children}
        </ModeContext.Provider>
    )
}
ModeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};