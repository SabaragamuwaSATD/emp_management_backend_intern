const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Management API",
      version: "1.0.0",
      description: "API documentation for the management system",
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
      {
        name: "Partner",
        description: "Endpoints related to partners",
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
                  description: "Cloudinary public ID",
                },
                url: { type: "string", description: "Cloudinary URL" },
              },
            },
            clientName: { type: "string", description: "Name of the client" },
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
                  description: "Cloudinary public ID",
                },
                url: { type: "string", description: "Cloudinary URL" },
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
                  description: "Cloudinary public ID",
                },
                url: { type: "string", description: "Cloudinary URL" },
              },
            },
          },
        },
        Partner: {
          type: "object",
          required: [
            "partnerId",
            "partnerName",
            "partnerOfficeAddress",
            "partnerContactNumber",
            "bankNumber",
            "bankName",
            "nicNumber",
            "companyName",
            "reason",
          ],
          properties: {
            partnerId: {
              type: "string",
              description: "Unique identifier for the partner",
            },
            partnerName: { type: "string", description: "Name of the partner" },
            partnerOfficeAddress: {
              type: "string",
              description: "Office address of the partner",
            },
            partnerContactNumber: {
              type: "string",
              description: "Contact number of the partner",
            },
            bankNumber: {
              type: "string",
              description: "Bank account number of the partner",
            },
            bankName: {
              type: "string",
              description: "Bank name of the partner",
            },
            nicNumber: {
              type: "string",
              description: "NIC number of the partner",
            },
            partnerPhoto: {
              type: "object",
              properties: {
                public_id: {
                  type: "string",
                  description: "Cloudinary public ID",
                },
                url: { type: "string", description: "Cloudinary URL" },
              },
            },
            companyName: {
              type: "string",
              description: "Company name of the partner",
            },
            agreement: {
              type: "object",
              properties: {
                public_id: {
                  type: "string",
                  description: "Cloudinary public ID",
                },
                url: { type: "string", description: "Cloudinary URL" },
              },
            },
            companyLogo: {
              type: "object",
              properties: {
                public_id: {
                  type: "string",
                  description: "Cloudinary public ID",
                },
                url: { type: "string", description: "Cloudinary URL" },
              },
            },
            reason: {
              type: "string",
              description: "Reason for partner registration",
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
