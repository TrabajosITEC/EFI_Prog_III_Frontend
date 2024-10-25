import NavBar from '../components/Navbar';
import PropTypes from 'prop-types';

export const MainLayOut = ({children})=>{

  return (
    <div className="flex flex-column min-h-screen">
        <NavBar />
        <main style={{ flexGrow: 1 }}>
            {children}
        </main>
    </div>
  )
}
MainLayOut.propTypes = {
    children: PropTypes.node.isRequired,
};