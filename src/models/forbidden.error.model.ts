export default class ForbiddenError extends Error {
    constructor(public message: string){
        super(message)
    }
}