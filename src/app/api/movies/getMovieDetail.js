export async function getMovieDetail(episode_id) {
  console.log(`https://swapi.dev/api/films/${episode_id}`);
  try {
    const response = await fetch(`https://swapi.dev/api/films/${episode_id}`);
    console.log(response);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const film = await response.json();
    console.log(film);
    return Response.json({ MovieDetail: film, ok: true });
  } catch (error) {
    console.error("Error fetching films:", error);
    return { ok: false };
  }
}
