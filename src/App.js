import './App.css';
import React, {useEffect, useState} from 'react';
import {getAllPokemon, getPokemonRecord} from "./utiles/pokemon";

function App() {
  const pokemonEndpoint =  "https://pokeapi.co/api/v2/pokemon"
  // 読み込み中はローディングする処理
  const [loading, setLoading] = useState(true)
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  const [pokemonData, setPokemonData] = useState([])

  useEffect(() => {
    // promiseの際は async/awaitを使う
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(pokemonEndpoint)
      await sleep(5000)
      // 各ポケモンデータ取得
      loadPokemon(res.results)

      setLoading(false)
      console.log(res)
    }

    // 上記関数を呼び出して発火させる
    fetchPokemonData()
  }, [
  ])

  const loadPokemon = async (pokemonData) => {
    // promise.allを使って、配列のPromiseを一括して実行する
    // 今回は個別のポケモンデータにアクセスするので複数ある。全てに対してのall
    let _pokemonData = await Promise.all(
        pokemonData.map(async (pokemon) => {
          console.log("pokemon", pokemon)
          return getPokemonRecord(pokemon.url)
        })
    )
    setPokemonData(_pokemonData)
  }

  console.log("pokemonData", pokemonData)

  return <div className="App">
    {loading? "Loading..." : (<h1>ポケモンデータを取得しました</h1>)}
  </div>
}

// 導入したプラグイン
// https://duckly.com/blog/best-webstorm-plugins-for-2022/

export default App;
