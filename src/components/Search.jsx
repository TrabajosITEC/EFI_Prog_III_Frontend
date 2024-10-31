import { useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function SearchBar({ onSearch = () => { } }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const searchItems = async (event) => {
    const inputValue = event.query;
    try {
      const response = await fetch(`http://localhost:3001/games/search?query=${encodeURIComponent(inputValue)}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        console.error("Error al obtener los resultados de búsqueda");
      }
    } catch (error) {
      console.error("Error en la solicitud de búsqueda:", error);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <AutoComplete
        placeholder="Buscar..."
        value={query}
        suggestions={results}
        completeMethod={searchItems}
        field="title"
        onChange={(e) => setQuery(e.value)}
        onSelect={(e) => onSearch(e.value)}
        style={{ width: '100%' }}
      />
    </div>
  );
}
