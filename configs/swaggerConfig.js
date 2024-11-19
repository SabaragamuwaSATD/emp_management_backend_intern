const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PhotoGrapher API",
      version: "1.0.0",
      description: "API documentation for the Photographer application",
    },
    servers: [
      {
        url: "http://localhost:5000", // Replace with your server URL
      },
    ],
    tags: [
      {
        name: "User",
        description: "Endpoints related to users",
      },
      {
        name: "Auth",
        description: "Endpoints related to authentication",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            userId: {
              type: "string",
              description: "Unique identifier for the user",
            },
            name: {
              type: "string",
              description: "Name of the user",
              minLength: 3,
              maxLength: 50,
            },
            email: {
              type: "string",
              description: "Email address of the user",
              format: "email",
            },
            password: {
              type: "string",
              description: "Password for the user (required for admin)",
              minLength: 6,
            },
            role: {
              type: "string",
              description: "Role of the user",
              enum: ["client", "admin"],
              default: "client",
            },
            profileImage: {
              type: "object",
              properties: {
                public_id: { type: "string" },
                url: { type: "string" },
              },
            },
            phone: { type: "string" },
            address: { type: "string" },
            birthDate: { type: "string" },
            brideMau: { type: "string" },
            weddingPlanner: { type: "string" },
            weddingDate: { type: "string" },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the user was created",
            },
            resetPasswordOTP: { type: "string" },
            resetPasswordExpires: { type: "string", format: "date-time" },
            otpVerified: {
              type: "boolean",
              default: false,
            },
          },
        },
        Auth: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
