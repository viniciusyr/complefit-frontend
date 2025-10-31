import { translateErrorMessage } from "@/i18n/messages";

export function handleApiError(error: any): string {
    if (error.response) {
        const backendMessage =
            error.response.data?.message || "Unknown error from server";

        return translateErrorMessage(backendMessage);
    }

    if (error.request) {
        return translateErrorMessage("Network Error");
    }

    return translateErrorMessage("Unknown error");
}
