export interface Action<PARAM, RETURN_TYPE> {

    execute(vo?: PARAM): RETURN_TYPE;

}