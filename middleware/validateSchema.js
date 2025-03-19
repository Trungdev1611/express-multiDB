import { logger } from "../logger.js"

export const validateParams = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params,
             { abortEarly: false } //thay vì gặp lỗi dừng thì in hết lỗi ra 1 lần
            );
        if (error) {
            return res.status(400).json({ error: error.details.map(d => d.message) });
        }
        next();
    };
};

export const validateBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, 
            { abortEarly: false } //thay vì gặp lỗi dừng thì in hết lỗi ra 1 lần
        );
        if (error) {
            return res.status(400).json({ error: error.details.map(d => d.message) });
        }
        next();
    };
};

export const validateQuery = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.query, 
            { abortEarly: false } //thay vì gặp lỗi dừng thì in hết lỗi ra 1 lần

        );
        if (error) {
            return res.status(400).json({ error: error.details.map(d => d.message) });
        }
        next();
    };
};
