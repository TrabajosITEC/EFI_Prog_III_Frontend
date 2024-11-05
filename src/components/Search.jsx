import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)({
  width: '300px',
  '& label': {
    color: 'white',
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInputBase-root': {
    color: 'white',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'white',
    opacity: 1,
  },
});

export default function SearchBar({ onSearch = (selectedGame) => { } }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchItems = async (inputValue) => {
    if (inputValue.trim() === '') return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/games/search?query=${encodeURIComponent(inputValue)}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data.length > 0 ? data.slice(0, 5) : [{ title: "No se encontraron juegos", nonSelectable: true }]);
      } else {
        const errorData = await response.json();
        setResults([{ title: errorData.message, nonSelectable: true }]);
      }
    } catch (error) {
      console.error("Error de búsqueda:", error);
      setResults([{ title: "Error de búsqueda.", nonSelectable: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="search-bar"
        freeSolo
        options={results}
        getOptionLabel={(option) => option.title || ''}
        filterOptions={(x) => x}
        loading={loading}
        onInputChange={(event, newValue) => {
          setQuery(newValue);
          searchItems(newValue);
        }}
        onChange={(event, selectedOption) => {
          if (!selectedOption?.nonSelectable) {
            onSearch(selectedOption); // Ejecuta la función cuando seleccionas un resultado
          }
        }}
        renderInput={(params) => (
          <CustomTextField
            {...params}
            label="Buscar juegos"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <span>Cargando...</span> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <li
            {...props}
            style={{
              pointerEvents: option.nonSelectable ? 'none' : 'auto',
              color: option.nonSelectable ? 'gray' : 'inherit',
            }}
          >
            {option.title}
          </li>
        )}
        disableClearable
      />
    </Stack>
  );
}
