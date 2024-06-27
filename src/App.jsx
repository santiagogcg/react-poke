import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';





function App() {

  const [pokemon, setPokemon] = useState('');
  const [result, setResult] = useState([]);
  const [load, setLoad] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    const getPokemon = async () => {

      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const newResult = response.data;
        setResult([newResult.name, newResult.sprites.front_default]);
        setError('')
        setLoad('')
        console.log(newResult)


      } catch (error) {
        if (pokemon == "") {
          setError('Error trying to load pokemon as input is blank')
          setLoad('')
          setResult('')
        }
        else if (pokemon != "") {
          setError('Error trying to load pokemon as input is not within API database')
          setLoad('loading...')
          setResult('')
        }
        else {
          setError('Error in server')
          setLoad('')
          setResult('')
        }

      }

    }






    getPokemon()
  }, [pokemon])





  return (

    <>

      <form >
        <p>{load}</p>
        <label>Name:</label>
        <input type="text" name="name" value={pokemon} onChange={(e) => setPokemon(e.target.value)} />
      </form>


      <div>
        <p>{result[0]}</p>
        <img src={result[1]}></img>
        <p>{error}</p>

      </div>





    </>

  )
};

export default App;
