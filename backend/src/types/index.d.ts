declare module 'swagger-jsdoc' {
  interface Options {
    definition: {
      openapi: string;
      info: {
        title: string;
        version: string;
        description?: string;
        contact?: {
          name?: string;
          email?: string;
        };
        license?: {
          name: string;
          url: string;
        };
      };
      servers?: Array<{
        url: string;
        description?: string;
      }>;
      tags?: Array<{
        name: string;
        description?: string;
      }>;
      components?: {
        securitySchemes?: {
          [key: string]: {
            type: string;
            scheme: string;
            bearerFormat?: string;
          };
        };
        schemas?: {
          [key: string]: any;
        };
      };
      security?: Array<{
        [key: string]: string[];
      }>;
    };
    apis: string[];
  }

  export default function swaggerJsdoc(options: Options): any;
} 