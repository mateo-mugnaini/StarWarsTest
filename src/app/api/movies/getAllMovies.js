export async function getAllMovies() {
  try {
    const response = await fetch("https://swapi.dev/api/films");
    console.log(response);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const films = await response.json();
    console.log(films);
    return Response.json({ AllMovies: films.results, ok: true });
  } catch (error) {
    console.error("Error fetching films:", error);
    return { ok: false };
  }
}
