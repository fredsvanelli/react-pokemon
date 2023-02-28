export type PokemonGraphQLDataType = {
  id: number;
  name: string;
  height?: number;
  weight?: number;
  specy: {
    color: { name: string };
    gender_rate?: number;
    has_gender_differences?: boolean;
    descriptions?: { text: string }[];
  };
  images: { sprites: string }[];
  types: { data: { type: { name: string } }[] };
  moves?: { move: { name: string } }[];
  stats?: { stat: { name: string }; value: number }[];
};

export type PokemonGraphQLResultDataType = {
  results: PokemonGraphQLDataType[];
};

export type PokemonType = {
  id: number;
  pokedexIndex: string;
  name: string;
  color: string;
  image: string | null;
  height?: number;
  weight?: number;
  types: string[];
  gender: { m: number; f: number };
  descriptions?: string[];
  move?: string;
  stats?: { name: string; value: number }[];
};
