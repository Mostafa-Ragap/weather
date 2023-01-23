module.exports = {
    openapi: "3.0.3", // present supported openapi version
    info: {
        title: "Simple Todos API", // short title.
        description: "A simple todos API", //  desc.
        version: "1.0.0", // version number
        contact: {
            name: "John doe", // your name
            email: "john@web.com", // your email
            url: "web.com", // your website
        },
    },
    servers: [
        {
            url: "http://localhost:4000/todos", // url
            description: "Local server", // name
        },
    ],
    components: {
        schemas: {
            todoModel: {
                id: {
                    type: "string", // data type
                    description: "An id of a todo", // desc
                    example: "tyVgf", // example of an id
                }
            },
            // id model
            id: {
                type: "string", // data type
                description: "An id of a todo", // desc
                example: "tyVgf", // example of an id
            },
            // todo model
            Todo: {
                type: "object", // data type
                properties: {
                    id: {
                        type: "string", // data-type
                        description: "Todo identification number", // desc
                        example: "ytyVgh", // example of an id
                    },
                    title: {
                        type: "string", // data-type
                        description: "Todo's title", // desc
                        example: "Coding in JavaScript", // example of a title
                    },
                    completed: {
                        type: "boolean", // data type
                        description: "The status of the todo", // desc
                        example: false, // example of a completed value
                    },
                },
            },
            // Todo input model
            TodoInput: {
                type: "object", // data type
                properties: {
                    title: {
                        type: "string", // data type
                        description: "Todo's title", // desc
                        example: "Coding in JavaScript", // example of a title
                    },
                    completed: {
                        type: "boolean", // data type
                        description: "The status of the todo", // desc
                        example: false, // example of a completed value
                    },
                },
            },
            // error model
            Error: {
                type: "object", //data type
                properties: {
                    message: {
                        type: "string", // data type
                        description: "Error message", // desc
                        example: "Not found", // example of an error message
                    },
                    internal_code: {
                        type: "string", // data type
                        description: "Error internal code", // desc
                        example: "Invalid parameters", // example of an error internal code
                    },
                },
            },
        },
    },
};