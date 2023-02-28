import { PokemonGraphQLDataType, PokemonType } from 'Types/PokemonType';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const importPNG = (id: number): Promise<any> =>
  import(
    /* @vite-ignore */
    `/node_modules/pokemon-sprites/sprites/pokemon/other/official-artwork/${id}.png`
  );

export const getPokemonImage = async (
  id: number,
  tryGif = false,
): Promise<string | null> => {
  if (tryGif) {
    try {
      const image = await import(
        /* @vite-ignore */
        `/node_modules/pokemon-sprites/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`
      );

      if (image) return image.default;
    } catch (_) {
      try {
        const image = await importPNG(id);

        if (image) return image.default;
      } catch (__) {
        return null;
      }
    }
  }

  try {
    const image = await importPNG(id);

    if (image) return image.default;
  } catch (_) {
    return null;
  }

  return null;
};

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
