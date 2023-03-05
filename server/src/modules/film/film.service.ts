import prisma from "../utils/prisma";

async function findByTitle(title: string) {
  const film = await prisma.film.findFirst({
    where: {
      title,
    },
  });
  if (film != null) return film;
  else return { Error: "There isn`t enough info about this film in our DB." };
}

export { findByTitle };
