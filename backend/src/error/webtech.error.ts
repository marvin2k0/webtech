export abstract class WebtechError extends Error {
    public code: number

    protected constructor(httpCode: number, msg: string) {
        super(msg);
        this.code = httpCode
    }
}