import './App.css';
import React, {useEffect, useState} from 'react';
import {getAllPokemon, getPokemonRecord} from "./utiles/pokemon";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const pokemonEndpoint =  "https://pokeapi.co/api/v2/pokemon"
  // 読み込み中はローディングする処理
  const [loading, setLoading] = useState(true)
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  const [pokemonData, setPokemonData] = useState([])
  const [nextURL, setNextURL] = useState("")
  const [prevURL, setPrevURL] = useState("")

  useEffect(() => {
    // promiseの際は async/awaitを使う
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(pokemonEndpoint)
      await sleep(5000)
      // 各ポケモンデータ取得
      await loadPokemon(res.results)

      setNextURL(res.next)
      setPrevURL(res.previous)
      setLoading(false)
      console.log("ポケモン全データ", res)
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

  const handlePrevPage = async () => {
    setLoading(true)
    console.log("前のURL", prevURL)

    if (!prevURL){
      console.log("前のURLが存在しない")
      setLoading(false)
      return;
    }

    let data = await getAllPokemon(prevURL)

    await loadPokemon(data.results)
    setPrevURL(data.previous)
    setNextURL(data.next)
    setLoading(false)
  }

  const handleNextPage = async () => {
    setLoading(true)
    console.log("次のURL", nextURL)
    let data = await getAllPokemon(nextURL)
    console.log("次のデータ", data)

    await loadPokemon(data.results)
    setNextURL(data.next)
    setPrevURL(data.previous)
    setLoading(false)
  }

  return (
      <>
        <Navbar />
        <div className="App">
          {loading? "Loading..." : (
            <>
              <div className="pokemonCardContainer">
                {pokemonData.map((pokemon, i) => {
                      return (
                        <Card key={i} className="pokemonCard" pokemon={pokemon}>
                        </Card>
                      )
                    })}
              </div>
              <div className="btn">
                <button onClick={handlePrevPage}>前へ</button>
                <button onClick={handleNextPage}>次へ</button>
              </div>
            </>
          )}
        </div>
      </>
  )
}

// 導入したプラグイン
// https://duckly.com/blog/best-webstorm-plugins-for-2022/

export default App;
