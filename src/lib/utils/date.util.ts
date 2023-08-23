import { ISODateString } from "lib/models"

export const isAfter = (d1: ISODateString, d2: ISODateString): boolean => {

    return new Date(d1).getTime() > new Date(d2).getTime();

}