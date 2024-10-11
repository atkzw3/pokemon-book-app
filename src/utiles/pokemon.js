export const getAllPokemon = (url) => {
    // resolve は成功
    // reject は失敗
    // Promiseはデータを取得するまで待機するもの(約束)・非同期処理で使われる
    // 非同期処理は時間がかかるものが多いため。
    return new Promise((resolve, reject) => {
        fetch(url)
            // 成功した時のデータを取得
            .then(response => response.json())
            // 上記のjsonデータをレスポンスとして返す
            .then(data => resolve(data))
    })
}

export const getPokemonRecord = async (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            // 成功した時のデータを取得
            .then(response => response.json())
            // 上記のjsonデータをレスポンスとして返す
            .then(data => {
                console.log("pokemon 個別データ", data)
                resolve(data)
            })
    })
}