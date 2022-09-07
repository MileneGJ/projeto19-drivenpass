import { Request, Response, NextFunction } from "express";
import { AnySchema } from "joi";

export default function validateSchema(schema: AnySchema) {

    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body)
        if (error) {
            let message = ""
            error.details.map(x => message += x.message + '\n')
            throw { code: 'InvalidInput', message }
        } else {
            next();
        }
    }
}