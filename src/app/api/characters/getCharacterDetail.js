export async function getCharacterDetail(idCharacter) {
  try {
    const response = await fetch(`https://swapi.dev/api/people/${idCharacter}`);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const character = await response.json();

    return Response.json({
      CharacterInfo: character,
      ok: true,
    });
  } catch (error) {
    console.error("Error fetching characters:", error);
    return { ok: false };
  }
}
