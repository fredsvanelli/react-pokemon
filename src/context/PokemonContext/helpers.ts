import { PokemonGraphQLDataType, PokemonType } from 'Types/PokemonType';

const getPokemonImage = (sprites: string): string | null =>
  JSON.parse(sprites)?.other['official-artwork']?.front_default ?? null;

export const calcFemaleGenderRatePercent = (value: number): number => {
  let result = (value / 8) * 100;
  if (result > 100) result = 100;
  if (result < 0) result = 0;
  return result;
};

export const calcMaleGenderRatePercent = (value: number): number => {
  let result = 100 - (value / 8) * 100;
  if (result > 100) result = 100;
  if (result < 0) result = 0;
  return result;
};

export const normalizePokemonData = (
  dataArray: PokemonGraphQLDataType[],
): PokemonType[] =>
  [...dataArray].map((item) => ({
    id: item.id,
    pokedexIndex: `#${String(item.id).padStart(3, '0')}`,
    name: item.name,
    height: item.height ? parseFloat((item.height / 10).toFixed(1)) : undefined,
    weight: item.weight ? parseFloat((item.weight / 10).toFixed(1)) : undefined,
    color: item.specy.color.name,
    types: item.types.data.map((type) => type.type.name),
    image:
      Array.isArray(item.images) &&
      item.images.length > 0 &&
      item.images[0]?.sprites
        ? getPokemonImage(item.images[0]?.sprites)
        : null,
    descriptions: Array.isArray(item.specy?.descriptions)
      ? item.specy.descriptions?.map((description) => description.text)
      : [],
    move:
      Array.isArray(item.moves) && item.moves.length > 0
        ? item.moves[0].move.name
        : undefined,
    gender: {
      m: item.specy.has_gender_differences
        ? calcMaleGenderRatePercent(Number(item.specy.gender_rate))
        : 100,
      f: item.specy.has_gender_differences
        ? calcFemaleGenderRatePercent(Number(item.specy.gender_rate))
        : 0,
    },
    stats: Array.isArray(item.stats)
      ? item.stats.map((stat) => ({ name: stat.stat.name, value: stat.value }))
      : [],
  }));
