import React, { createContext, useContext, useState, ReactNode } from "react";
import { api } from "@/services/api";
import { saveTokens } from "@/utils/secureStore";

export type AuthProviderType = "email" | "google" | "apple";
export type RoleType = "STUDENT" | "TRAINER" | null;

export interface BasicInfo {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ProfileDetails {
    phoneNumber: string;
    birthDate: string;
    cpf: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    height: number;
    weight: number;
    role: RoleType;
}

export interface StudentInfo {
    goal: string;
    level: string;
    medicalRestrictions?: string;
}

export interface TrainerInfo {
    cref: string;
    speciality: string;
    yearsOfExperience: number;
    bio?: string;
}

interface RegisterData {
    userId?: string;
    authProvider: AuthProviderType;
    basic?: BasicInfo;
    details?: ProfileDetails;
    student?: StudentInfo;
    trainer?: TrainerInfo;
}

interface RegisterContextType {
    data: RegisterData;
    setBasic: (info: BasicInfo) => Promise<void>;
    setDetails: (info: ProfileDetails) => Promise<void>;
    setStudent: (info: StudentInfo) => void;
    setTrainer: (info: TrainerInfo) => void;
    setUserId: (id: string) => void;
    setAuthProvider: (provider: AuthProviderType) => void;
    reset: () => void;
    registerUser: (
        payload: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            phoneNumber: string;
            birthDate: string;
            cpf?: string;
            gender: "MALE" | "FEMALE" | "OTHER";
            height: number;
            weight: number;
            role: "STUDENT" | "TRAINER";
            status: "ACTIVE";
        },
        trainerCref?: string
    ) => Promise<void>;
}

const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

export const RegisterProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<RegisterData>({
        authProvider: "email",
    });

    const setBasic = async (info: BasicInfo) => {
        // Apenas armazena localmente; registro completo acontece em setDetails
        setData((prev) => ({
            ...prev,
            basic: info,
        }));
    };

    const setDetails = async (info: ProfileDetails) => {
        if (!data.basic) throw new Error("Dados básicos não definidos.");
        try {
            const res = await api.post("/users/register", {
                firstName: data.basic.firstName,
                lastName: data.basic.lastName,
                email: data.basic.email,
                password: data.basic.password,
                phoneNumber: info.phoneNumber,
                birthDate: info.birthDate,
                cpf: info.cpf,
                gender: info.gender,
                height: info.height,
                weight: info.weight,
                role: info.role,
                status: "ACTIVE",
            });

            const userId = res.data?.id || res.data?.userId;
            if (!userId) throw new Error("ID do usuário não retornado pelo servidor.");

            setData((prev) => ({
                ...prev,
                details: info,
                userId,
            }));

            return res.data;
        } catch (error: any) {
            console.error("Register details error:", error.response?.data || error.message);
            throw error;
        }
    };

    const setStudent = (info: StudentInfo) =>
        setData((prev) => ({ ...prev, student: info }));

    const setTrainer = (info: TrainerInfo) =>
        setData((prev) => ({ ...prev, trainer: info }));

    const setUserId = (id: string) =>
        setData((prev) => ({ ...prev, userId: id }));

    const setAuthProvider = (provider: AuthProviderType) =>
        setData((prev) => ({ ...prev, authProvider: provider }));

    const reset = () =>
        setData({
            authProvider: "email",
        });

    const registerUser = async (
        payload: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            phoneNumber: string;
            birthDate: string;
            cpf?: string;
            gender: "MALE" | "FEMALE" | "OTHER";
            height: number;
            weight: number;
            role: "STUDENT" | "TRAINER";
            status: "ACTIVE";
        },
        trainerCref?: string
    ) => {
        try {
            const res = await api.post("/users/register", payload);
            const userId = res.data?.id || res.data?.userId;
            if (!userId) throw new Error("ID do usuário não retornado pelo servidor.");

            setData((prev) => ({
                ...prev,
                userId,
                basic: {
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    password: payload.password,
                },
                details: {
                    phoneNumber: payload.phoneNumber,
                    birthDate: payload.birthDate,
                    cpf: payload.cpf || "",
                    gender: payload.gender,
                    height: payload.height,
                    weight: payload.weight,
                    role: payload.role,
                },
            }));

            if (payload.role === "TRAINER" && trainerCref) {
                await api.post("/trainers", { user: userId, cref: trainerCref });
            }

            const loginRes = await api.post("/auth/login", {
                email: payload.email,
                password: payload.password,
            });
            const { accessToken, refreshToken } = loginRes.data;
            await saveTokens(accessToken, refreshToken);
        } catch (error: any) {
            console.error("registerUser error:", error.response?.data || error.message);
            throw error;
        }
    };

    return (
        <RegisterContext.Provider
            value={{
                data,
                setBasic,
                setDetails,
                setStudent,
                setTrainer,
                setUserId,
                setAuthProvider,
                reset,
                registerUser,
            }}
        >
            {children}
        </RegisterContext.Provider>
    );
};

export const useRegister = (): RegisterContextType => {
    const context = useContext(RegisterContext);
    if (!context) {
        throw new Error("useRegister must be used within a RegisterProvider");
    }
    return context;
};
