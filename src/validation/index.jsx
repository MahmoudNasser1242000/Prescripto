import Joi from "joi";


const signupSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.min": "User name must be at least 3 characters",
            "string.max": "User name must be at most 50 characters"
        }),

    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.email": "Email must be valid"
        }),

    password: Joi.string()
        .required()
        .min(6)
        .max(50)
        .pattern(/^(?=.*\d{3,})(?=(.*[\W_])+)(?=.*[a-zA-Z]{2,})(?=.*[A-Z]+).{6,20}$/)
        .messages({
            "string.pattern.base": `Password must contains at least 3 numbers,
            2 characters one of them must be uppercase 
            and one special character`,
            "string.min": "Password must be 6 to 50 characters",
            "string.max": "Password must be 6 to 50 characters"
        }),

    repassword: Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .messages({
            "any.valid": "Password and repassword must be matched",
        }),

    bio: Joi.string()
        .min(3)
        .max(1000)
        .optional()
        .allow(null, "")
        .messages({
            "string.min": "bio field must be at least 3 characters",
            "string.max": "bio field must be at most 1000 characters"
        }),

    gender: Joi.string()
        .optional()
        .valid("male", "female")
        .default("male")
        .messages({
            "any.valid": "Gender must be one of male or female",
        }),

    role: Joi.string()
        .optional()
        .valid("user")
        .messages({
            "any.valid": "Role must be user only",
        }),

    phone: Joi.string()
        .required()
        .pattern(/^01([0-2]|5)[0-9]{8}$/),

    birth_date: Joi.date()
        .required(),

    job: Joi.string()
        .min(3)
        .max(100)
        .optional()
        .allow(null, "")
        .messages({
            "string.min": "Job field must be at least 3 characters",
            "string.max": "Job field must be at most 100 characters"
        }),

    profile: Joi.object().optional(),
}).options({ allowUnknown: false });

const signinSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.email": "Email must be valid"
        }),

    password: Joi.string()
        .required()
        .min(6)
        .max(50)
        .pattern(/^(?=.*\d{3,})(?=(.*[\W_])+)(?=.*[a-zA-Z]{2,})(?=.*[A-Z]+).{6,20}$/)
        .messages({
            "string.pattern.base": `Password must contains at least 3 numbers,
            2 characters one of them must be uppercase 
            and one special character`,
            "string.min": "Password must be 6 to 50 characters",
            "string.max": "Password must be 6 to 50 characters"
        }),
}).options({ allowUnknown: false });

const updateUserProfileSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.min": "user name must be at least 3 characters",
            "string.max": "user name must be at most 50 characters"
        }),

    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.email": "Email must be valid"
        }),

    bio: Joi.string()
        .min(3)
        .max(1000)
        .optional()
        .allow(null, "")
        .messages({
            "string.min": "about field must be at least 3 characters",
            "string.max": "about field must be at most 1000 characters"
        }),

    gender: Joi.string()
        .required()
        .valid("male", "female")
        .default("male")
        .messages({
            "any.valid": "Gender must be one of male or female",
        }),

    phone: Joi.string()
        .required()
        .pattern(/^01([0-2]|5)[0-9]{8}$/),

    birth_date: Joi.date()
        .required(),

    job: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.min": "Job field must be at least 3 characters",
            "string.max": "Job field must be at most 100 characters"
        }),

    profile: Joi.object().optional()
}).options({ allowUnknown: false });

const chanagePasswordSchema = Joi.object({
    password: Joi.string()
        .required()
        .min(6)
        .max(50)
        .pattern(/^(?=.*\d{3,})(?=(.*[\W_])+)(?=.*[a-zA-Z]{2,})(?=.*[A-Z]+).{6,20}$/)
        .messages({
            "string.pattern.base": `Password must contains at least 3 numbers,
            2 characters one of them must be uppercase 
            and one special character`,
            "string.min": "Password must be 6 to 50 characters",
            "string.max": "Password must be 6 to 50 characters"
        }),

    newPassword: Joi.string()
        .required()
        .min(6)
        .max(50)
        .pattern(/^(?=.*\d{3,})(?=(.*[\W_])+)(?=.*[a-zA-Z]{2,})(?=.*[A-Z]+).{6,20}$/)
        .messages({
            "string.pattern.base": `Password must contains at least 3 numbers,
            2 characters one of them must be uppercase 
            and one special character`,
            "string.min": "Password must be 6 to 50 characters",
            "string.max": "Password must be 6 to 50 characters"
        }),

    repassword: Joi.string()
        .required()
        .valid(Joi.ref('newPassword'))
        .messages({
            "any.valid": "Password and repassword must be matched",
        }),
}).options({ allowUnknown: false });

const updateDoctorProfileSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .optional()
        .messages({
            "string.min": "Doctor name must be at least 3 characters",
            "string.max": "Doctor name must be at most 50 characters"
        }),

    email: Joi.string()
        .email({ tlds: { allow: false } })
        .optional()
        .messages({
            "string.email": "Email must be valid"
        }),

    speciality: Joi.string()
        .min(3)
        .max(50)
        .optional()
        .messages({
            "string.min": "Speciality must be at least 3 characters",
            "string.max": "Speciality must be at most 50 characters"
        }),

    degree: Joi.string()
        .min(3)
        .max(50)
        .optional()
        .messages({
            "string.min": "degree must be at least 3 characters",
            "string.max": "degree must be at most 50 characters"
        }),

    experience: Joi.number()
        .optional(),

    about: Joi.string()
        .min(3)
        .max(1000)
        .optional()
        .messages({
            "string.min": "about field must be at least 3 characters",
            "string.max": "about field must be at most 1000 characters"
        }),

    gender: Joi.string()
        .optional()
        .valid("male", "female")
        .messages({
            "any.valid": "Gender must be one of male or female",
        }),

    phone: Joi.string()
        .optional()
        .pattern(/^01([0-2]|5)[0-9]{8}$/),

    fees: Joi.number()
        .optional(),

    birth_date: Joi.date()
        .optional(),

    profile: Joi.object().optional()
}).options({ allowUnknown: false });

const addDoctorSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.min": "Doctor name must be at least 3 characters",
            "string.max": "Doctor name must be at most 50 characters"
        }),

    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.email": "Email must be valid"
        }),

    password: Joi.string()
        .required()
        .min(6)
        .max(50)
        .pattern(/^(?=.*\d{3,})(?=(.*[\W_])+)(?=.*[a-zA-Z]{2,})(?=.*[A-Z]+).{6,20}$/)
        .messages({
            "string.pattern.base": `Password must contains at least 3 numbers,
            2 characters one of them must be uppercase 
            and one special character`,
            "string.min": "Password must be 6 to 50 characters",
            "string.max": "Password must be 6 to 50 characters"
        }),

    repassword: Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .messages({
            "any.valid": "Password and repassword must be matched",
        }),

    speciality: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.min": "Speciality must be at least 3 characters",
            "string.max": "Speciality must be at most 50 characters"
        }),

    degree: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.min": "degree must be at least 3 characters",
            "string.max": "degree must be at most 50 characters"
        }),

    experience: Joi.number()
        .required(),

    about: Joi.string()
        .min(3)
        .max(1000)
        .required()
        .messages({
            "string.min": "about field must be at least 3 characters",
            "string.max": "about field must be at most 1000 characters"
        }),

    examination_dates: Joi.array()
        .items(Joi.object({
            time: Joi.string()
                .required()
                .pattern(/^(0[1-9]|10|11|12):([0-5][0-9])$/)
                .messages({
                    "string.pattern.base": `Time must be valid, For example: 02:00`
                }),
            modifier: Joi.string()
                .required()
                .valid("PM", "AM")
                .messages({
                    "any.valid": "Modifier must be one of PM or AM",
                }),
        }))
        .unique()
        .min(1)
        .max(8)
        .required()
        .messages({
            "array.min": "Examination dates length must be at least 1 items",
            "array.max": "Examination dates length must be at most 8 items",
            "array.unique": "Examination dates must be unique"
        }),

    gender: Joi.string()
        .optional()
        .valid("male", "female")
        .messages({
            "any.valid": "Gender must be one of male or female",
        }),

    role: Joi.string()
        .optional()
        .valid("doctor")
        .messages({
            "any.valid": "Role must be doctor only",
        }),

    phone: Joi.string()
        .required()
        .pattern(/^01([0-2]|5)[0-9]{8}$/),

    available: Joi.boolean()
        .optional()
        .default(true),

    fees: Joi.number()
        .required(),

    birth_date: Joi.date()
        .required(),

    profile: Joi.object().required()
})

const updateUserAndDoctorSchema = Joi.object({
    active: Joi.boolean()
        .required(),

    activeExpire: Joi.date()
        .allow(null, "")
        .optional(),
}).options({ allowUnknown: false });

const updateAllExamination_dates = Joi.object({
    examination_dates: Joi.array()
        .items(Joi.object({
            time: Joi.string()
                .required()
                .pattern(/^(0[1-9]|10|11|12):([0-5][0-9])$/)
                .messages({
                    "string.pattern.base": `Time must be valid, For example: 02:00`
                }),
            modifier: Joi.string()
                .required()
                .valid("PM", "AM")
                .messages({
                    "any.valid": "Modifier must be one of PM or AM",
                }),
        }))
        .unique()
        .min(1)
        .max(8)
        .required()
        .messages({
            "array.min": "Examination dates length must be at least 1 items",
            "array.max": "Examination dates length must be at most 8 items",
            "array.unique": "Examination dates must be unique"
        })
})

export {
    signupSchema,
    signinSchema,
    updateUserProfileSchema,
    updateDoctorProfileSchema,
    chanagePasswordSchema,
    addDoctorSchema,
    updateUserAndDoctorSchema,
    updateAllExamination_dates
}