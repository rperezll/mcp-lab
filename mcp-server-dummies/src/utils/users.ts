import { User, UsersMock } from "./fake-db";

interface UpdateUserResponse {
  success: boolean;
  user?: User;
  message: string;
}

const normalizeString = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .trim()
    .toLowerCase();
};

export function findAllUsersName(): string[] {
  return UsersMock.map((user) => normalizeString(user.name));
}

export function findUsersByName(search: string | string[]): User[] {
  const searchTerms = Array.isArray(search) ? search : [search];

  const result = UsersMock.filter((user) =>
    searchTerms.some((term) =>
      normalizeString(user.name).includes(
        normalizeString(decodeURIComponent(term))
      )
    )
  );

  return result;
}

export function updateFitnessGoalByUser(user: User): UpdateUserResponse {
  const userTarget = findUsersByName(user.name);

  if (!userTarget || userTarget.length === 0) {
    return {
      success: false,
      message: `No se encontró un usuario parecido a ${user.name} en el sistema.`,
    };
  }

  if (userTarget.length > 1) {
    return {
      success: false,
      message:
        `Se han encontrado múltiples concidencias para '${user.name}': \n` +
        userTarget
          .map(
            (user) =>
              `- Nombre: ${user.name}, Edad: ${user.age}, Plan: ${user.subscribedPlan}`
          )
          .join("\n") +
        ` \nRecuerda que el nombre es el identificador principal del usuario. Usa el nombre completo cuando existen varias coinicidencias.`,
    };
  }

  const match = UsersMock.find((user) => user.name === userTarget[0].name);

  if (match) {
    match.fitnessGoal = user.fitnessGoal;

    return {
      success: true,
      user: match,
      message: `El nuevo objetivo de ${match.name} es: ${match?.fitnessGoal}.`,
    };
  } else {
    return {
      success: false,
      message: `No se pudo actualizar el objetivo de ${user.name}.`,
    };
  }
}
