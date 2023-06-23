export default class ErrorData extends Error {
    public data: any
   
    constructor(data: IErrorResponse) {
        super();
        this.data = data;
    }
}