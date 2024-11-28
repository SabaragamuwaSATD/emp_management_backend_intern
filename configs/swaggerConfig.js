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
      {
        name: "Income",
        description: "Endpoints related to income report",
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

        Income: {
          type: "object",
          required: [
            "incomeReportID",
            "date",
            "title",
            "description",
            "income",
            "projectName",
          ],
          properties: {
            incomeReportID: {
              type: "string",
              description: "Unique identifier for the income report",
            },
            report: {
              type: "string",
              format: "binary",
              description: "Report file to upload",
            },
            date: {
              type: "string",
              format: "date",
              description: "Date of the income report",
            },
            title: {
              type: "string",
              description: "Title of the income report",
            },
            description: {
              type: "string",
              description: "Detailed description of the income report",
            },
            income: {
              type: "string",
              description: "Income amount",
            },
            projectName: {
              type: "string",
              description:
                "ObjectId referencing the project in the Project collection",
            },
          },
        },
        Cost: {
          type: "object",
          // required: ["costId", "date", "title", "reason", "cost"],
          properties: {
            costId: {
              type: "string",
              description: "Unique identifier for the cost report",
            },
            report: {
              type: "object",
              properties: {
                url: {
                  type: "string",
                  description: "URL of the report file",
                },
                public_id: {
                  type: "string",
                  description: "Public ID of the report file in Cloudinary",
                },
              },
            },
            date: {
              type: "string",
              format: "date",
              description: "Date of the cost report",
            },
            title: {
              type: "string",
              description: "Title of the cost report",
            },
            reason: {
              type: "string",
              description: "Reason for the cost",
            },
            cost: {
              type: "string",
              description: "Cost amount",
            },
          },
        },
        Document: {
          type: "object",
          required: ["documentId", "documentName", "documentType", "noOfPage"],
          properties: {
            documentId: {
              type: "string",
              description: "Unique identifier for the document",
            },
            document: {
              type: "object",
              properties: {
                url: {
                  type: "string",
                  description: "URL of the document file",
                },
                public_id: {
                  type: "string",
                  description: "Public ID of the document file in Cloudinary",
                },
              },
            },
            documentName: {
              type: "string",
              description: "Name of the document",
            },
            documentType: {
              type: "string",
              enum: [
                "Income",
                "Cost",
                "Agreement With Client",
                "Agreement With Employee",
                "Company",
              ],
              description: "Type of the document",
            },
            noOfPage: {
              type: "string",
              description: "Number of pages in the document",
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
