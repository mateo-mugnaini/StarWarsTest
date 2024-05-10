export async function getAllCharacters() {
  try {
    const pagesNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const responses = await Promise.all(
      pagesNumber.map(async (num) => {
        const res = await fetch(`https://swapi.dev/api/people/?page=${num}`);
        if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`);
        }
        return res.json();
      })
    );

    const allCharacters = responses.flatMap((response) => response.results);

    return { AllCharacters: allCharacters, ok: true };
  } catch (error) {
    console.error("Error fetching characters:", error);
    return { ok: false };
  }
}
