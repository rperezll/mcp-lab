import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  age: z.number().int().min(0).optional(),
  subscribedPlan: z.enum(["Basic", "Full", "Premium"]).optional(),
  hasPaid: z.boolean().optional(),
  fitnessGoal: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const UsersMock: User[] = [
  {
    name: "María Gómez",
    age: 28,
    subscribedPlan: "Full",
    hasPaid: true,
    fitnessGoal: "Tonificar piernas y glúteos",
  },
  {
    name: "Carlos Pérez",
    age: 35,
    subscribedPlan: "Basic",
    hasPaid: false,
    fitnessGoal: "Perder peso",
  },
  {
    name: "Lucía Martínez",
    age: 42,
    subscribedPlan: "Premium",
    hasPaid: true,
    fitnessGoal: "Mejorar la resistencia cardiovascular",
  },
  {
    name: "Andrés Rojas",
    age: 24,
    subscribedPlan: "Full",
    hasPaid: false,
    fitnessGoal: "Ganar masa muscular",
  },
  {
    name: "Sofía Navarro",
    age: 31,
    subscribedPlan: "Basic",
    hasPaid: true,
    fitnessGoal: "Reducir el estrés con yoga",
  },
  {
    name: "Jorge Fernández",
    age: 47,
    subscribedPlan: "Premium",
    hasPaid: true,
    fitnessGoal: "Prepararse para triatlón",
  },
  {
    name: "Valentina Ruiz",
    age: 22,
    subscribedPlan: "Full",
    hasPaid: true,
    fitnessGoal: "Tonificar abdomen",
  },
  {
    name: "Gabriel Mendoza",
    age: 38,
    subscribedPlan: "Basic",
    hasPaid: false,
    fitnessGoal: "Recuperación post-lesión",
  },
  {
    name: "Andrés Ramos",
    age: 20,
    subscribedPlan: "Basic",
    hasPaid: false,
    fitnessGoal: "Hacer amigos y socializar",
  },
];
