const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Photographer API",
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
        name: "Client",
        description: "Endpoints related to clients",
      },
    ],
    components: {
      schemas: {
        Client: {
          type: "object",
          required: [
            "clientID",
            "clientName",
            "clientAddress",
            "clientContactNumber",
            "idNumber",
            "bankNumber",
            "bankName",
            "companyName",
            "projectName",
            "startProjectDate",
            "endProjectDate",
            "agreement",
          ],
          properties: {
            clientID: {
              type: "string",
              description: "Unique identifier for the client",
            },
            clientPhoto: {
              type: "object",
              properties: {
                public_id: {
                  type: "string",
                  description: "Public ID of the client photo in Cloudinary",
                },
                url: {
                  type: "string",
                  description: "URL of the client photo in Cloudinary",
                },
              },
            },
            clientName: {
              type: "string",
              description: "Name of the client",
            },
            clientAddress: {
              type: "string",
              description: "Address of the client",
            },
            clientContactNumber: {
              type: "string",
              description: "Contact number of the client",
            },
            idNumber: {
              type: "string",
              description: "Identification number of the client",
            },
            bankNumber: {
              type: "string",
              description: "Bank account number of the client",
            },
            bankName: {
              type: "string",
              description: "Bank name of the client",
            },
            companyName: {
              type: "string",
              description: "Company name of the client",
            },
            projectName: {
              type: "string",
              description: "Project name associated with the client",
            },
            projectLogo: {
              type: "object",
              properties: {
                public_id: {
                  type: "string",
                  description: "Public ID of the project logo in Cloudinary",
                },
                url: {
                  type: "string",
                  description: "URL of the project logo in Cloudinary",
                },
              },
            },
            startProjectDate: {
              type: "string",
              format: "date",
              description: "Start date of the project",
            },
            endProjectDate: {
              type: "string",
              format: "date",
              description: "End date of the project",
            },
            agreement: {
              type: "object",
              properties: {
                public_id: {
                  type: "string",
                  description: "Public ID of the agreement in Cloudinary",
                },
                url: {
                  type: "string",
                  description: "URL of the agreement in Cloudinary",
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Path to the API routes
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
