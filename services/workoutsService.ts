import { apiGet } from "@/services/openapiClient";

export interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  role?: "ADMIN" | "USER" | "TRAINER" | "STUDENT" | string;
}

export interface Workout {
  id: string;
  title?: string;
  description?: string;
  totalDurationSeconds?: number;
  trainerName?: string;
  studentName?: string;
  createdAt?: string;
}

export async function fetchCurrentUser(): Promise<UserProfile> {
  const { data } = await apiGet<UserProfile>("/api/users/me");
  return data as UserProfile;
}

export async function fetchWorkoutsForCurrentUser(): Promise<Workout[]> {
  const me = await fetchCurrentUser();

  if (me.role === "TRAINER") {
    // Find trainer entity by userId
    const { data: trainers } = await apiGet<Array<{ id: string; userId: string }>>("/api/trainers");
    const trainer = (trainers || []).find((t) => t.userId === me.id);
    if (!trainer) return [];
    const { data } = await apiGet<Workout[]>(`/api/workouts/trainer/${trainer.id}`);
    return data || [];
  }

  if (me.role === "STUDENT") {
    // Find student entity by userId
    const { data: students } = await apiGet<Array<{ id: string; userId: string }>>("/api/students");
    const student = (students || []).find((s) => s.userId === me.id);
    if (!student) return [];
    const { data } = await apiGet<Workout[]>(`/api/workouts/student/${student.id}`);
    return data || [];
  }

  // Other roles: return empty for now
  return [];
}
