// export async function getMovieDetail(episode_id, id) {
//   try {
//     const response = await fetch(`https://swapi.dev/api/films/${episode_id}`);
//     const data = await response.json();
//     const characters = data.characters;
//     if (characters) {
//       const dataCharacters = await
//       fetch(`https://swapi.dev/api/people/${id}`);
//       return dataCharacters
//     }
//     console.log(dataCharacters);
//     // console.log(response);
//     if (!response.ok) {
//       throw new Error(`API request failed with status ${response.status}`);
//     }

//     const film = await response.json();
//     // console.log(film);
//     return Response.json({
//       MovieDetail: film,
//       Characters: characters,
//       ok: true,
//     });
//   } catch (error) {
//     console.error("Error fetching films:", error);
//     return { ok: false };
//   }
// }

export async function getMovieDetail(episode_id) {
  try {
    const response = await fetch(`https://swapi.dev/api/films/${episode_id}`);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const film = await response.json();
    const characters = film.characters;

    if (characters && characters.length > 0) {
      // Hacer una petición para obtener detalles de los personajes
      const characterPromises = characters.map(async (characterUrl) => {
        const characterId = characterUrl.split("/").slice(-2, -1)[0]; // Extraer ID del personaje
        const characterResponse = await fetch(characterUrl);
        if (!characterResponse.ok) {
          throw new Error(
            `API request failed with status ${characterResponse.status}`
          );
        }
        return characterResponse.json();
      });

      const characterDetails = await Promise.all(characterPromises);
      return {
        MovieDetail: film,
        Characters: characterDetails,
        ok: true,
      };
    }

    // Si no hay personajes, simplemente devolver los detalles de la película
    return {
      MovieDetail: film,
      Characters: [],
      ok: true,
    };
  } catch (error) {
    console.error("Error fetching films:", error);
    return { ok: false };
  }
}
