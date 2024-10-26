import { useEffect } from "react";
import { authService } from "../services/token";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Protected({children}) {
  const navigate = useNavigate();
  const token = authService.isAuthenticated()
  
  useEffect(() => {
      if (!token) {
        navigate("/login" );
      }
    }, [navigate, token]);
  
    return token !== "" ? children : null;
}
Protected.propTypes = {
    children: PropTypes.node.isRequired,
};