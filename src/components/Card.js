import React from 'react';

const Card = ({pokemon}) => {
    return <div className="card">
        <div className="cardimage">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        <h3 className="cardName">
            {pokemon.name}
        </h3>
        <div className="cardTypes">
            <div>タイプ</div>
            {pokemon.types.map((type, i) => {
                return <div>
                    <span
                        key={i}
                        className="typeName">
                    {type.type.name}
                </span>
                </div>
            })}
        </div>
        <div className="cardInfo">
            <div className="cardData">
                <p>重さ： {pokemon.weight} kg</p>
                <p>高さ： {pokemon.height / 10} m </p>
                <p>能力：{pokemon.abilities[0].ability.name}</p>
            </div>
        </div>
    </div>;
}

export default Card;