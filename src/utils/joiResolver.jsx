const joiResolver = (schema) => (data) => {
    if (data.activeExpire) {
        data.activeExpire = new Date(data.activeExpire)
    }
    const { error, value } = schema.validate(data, { abortEarly: false });
    return {
        values: error ? {} : value,
        errors: error
            ? error.details.reduce((acc, curr) => {
                acc[curr.path[0]] = {
                    type: curr.type,
                    message: curr.message,
                };
                return acc;
            }, {})
            : {},
    };
};

export default joiResolver;