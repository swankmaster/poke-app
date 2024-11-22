import { stringify } from "querystring";
import React, { FC } from "react";

interface Props {
  id: number;
  name: string;
  base_experience: number;
  moves: string[];
}

const Pokemon: FC<Props> = ({ id, name, base_experience, moves }) => {
  return (
    <div>
      <h2 id={id.toString()}>{name}</h2>
      <a>{base_experience}</a>
      <ul>
        {moves.map((move, index) => (
          <li key={index}> {move}</li>
        ))}
      </ul>
    </div>
  );
};

export default Pokemon;
