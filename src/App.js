import './App.css';
import React, {useEffect, useState} from 'react';
import {getAllPokemon} from "./utiles/pokemon";

function App() {
  const pokemonEndpoint =  "https://pokeapi.co/api/v2/pokemon"
  // 読み込み中はローディングする処理
  const [loading, setLoading] = useState(true)
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  useEffect(() => {
    // promiseの際は async/awaitを使う
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(pokemonEndpoint)
      await sleep(5000)
      setLoading(false)
      console.log(res)
    }

    // 上記関数を呼び出して発火させる
    fetchPokemonData()
  }, [
  ])

  return <div className="App">
    {loading? "Loading..." : (<h1>ポケモンデータを取得しました</h1>)}
  </div>
}

// 導入したプラグイン
// https://duckly.com/blog/best-webstorm-plugins-for-2022/

export default App;
