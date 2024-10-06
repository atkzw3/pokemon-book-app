import './App.css';
import React, { useEffect } from'react';
import {getAllPokemon} from "./utiles/pokemon";

function App() {
  const pokemonEndpoint =  "https://pokeapi.co/api/v2/pokemon"

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(pokemonEndpoint)
      console.log(res)
    }

    // 上記関数を呼び出して発火させる
    fetchPokemonData()
  }, [
  ])

  return <div className="App"></div>
}

// 導入したプラグイン
// https://duckly.com/blog/best-webstorm-plugins-for-2022/

export default App;
