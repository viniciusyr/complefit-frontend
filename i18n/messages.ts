const errorTranslations: Record<string, string> = {
    "Invalid credentials": "Email ou senha incorretos.",
    "User not found": "Usuário não encontrado.",
    "Account locked": "Conta bloqueada. Tente novamente mais tarde.",
    "Server unreachable": "Não foi possível conectar ao servidor. Verifique sua conexão.",
    "Network Error": "Erro de rede. Verifique sua conexão com a internet.",
    "Token expired": "Sessão expirada. Faça login novamente.",
    "Unknown error": "Ocorreu um erro inesperado. Tente novamente.",
};

export function translateErrorMessage(message: string): string {
    return errorTranslations[message] || "Erro desconhecido. Tente novamente.";
}