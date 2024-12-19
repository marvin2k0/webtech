export function success<T>(data: T): SuccessfulRestResponse<T> {
    return {
        successful: true,
        data: data
    }
}

export function error(message: string): ErrorRestResponse {
    return {
        successful: false,
        message: message
    }
}