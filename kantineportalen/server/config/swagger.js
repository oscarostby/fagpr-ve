import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const port = process.env.PORT || 5001
const publicApiUrl = process.env.PUBLIC_API_URL || 'http://134.122.56.191/api'
const localApiUrl = `http://localhost:${port}/api`

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Kantineportalen API',
      version: '1.0.0',
      description: 'OpenAPI-dokumentasjon for Kantineportalen backend. Frontend kjører lokalt, mens API-et ligger på serveren.',
    },
    servers: [
      {
        url: publicApiUrl,
        description: 'Produksjon',
      },
      {
        url: localApiUrl,
        description: 'Lokal backend',
      },
    ],
    tags: [
      { name: 'Health', description: 'Statusendepunkter' },
      { name: 'Auth', description: 'Innlogging og JWT' },
      { name: 'Dishes', description: 'Retter og bildeopplasting' },
      { name: 'Allergens', description: 'Allergener' },
      { name: 'Menu', description: 'Ukemeny' },
      { name: 'Uploads', description: 'Statiske opplastede filer' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Noe gikk galt' },
          },
        },
        Health: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'ok' },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '665f7d9f6efc2e0012233445' },
            username: { type: 'string', description: 'Brukernavn fra MongoDB' },
            role: { type: 'string', enum: ['admin', 'user'] },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: { type: 'string', description: 'Brukernavn som ligger i MongoDB' },
            password: { type: 'string', format: 'password', writeOnly: true, description: 'Passordet lagres hashet i MongoDB og vises ikke i API-et' },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', description: 'JWT Bearer-token' },
            user: { $ref: '#/components/schemas/User' },
          },
        },
        Allergen: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '665f7d9f6efc2e0012233445' },
            name: { type: 'string', example: 'Gluten' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        AllergenInput: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', example: 'Gluten' },
          },
        },
        Dish: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '665f7d9f6efc2e0012233445' },
            name: { type: 'string', example: 'Lasagne med salat' },
            description: { type: 'string', example: 'Hjemmelaget lasagne servert med frisk salat.' },
            image: { type: 'string', example: '/uploads/dishes/seed-lasagne-med-salat.png' },
            allergens: {
              type: 'array',
              items: { $ref: '#/components/schemas/Allergen' },
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        DishInput: {
          type: 'object',
          required: ['name', 'image'],
          properties: {
            name: { type: 'string', example: 'Lasagne med salat' },
            description: { type: 'string', example: 'Hjemmelaget lasagne servert med frisk salat.' },
            allergens: {
              description: 'JSON-array, kommaseparert streng eller gjentatte felt med allergen-ID-er.',
              oneOf: [
                { type: 'string', example: '["665f7d9f6efc2e0012233445"]' },
                { type: 'array', items: { type: 'string' } },
              ],
            },
            image: { type: 'string', format: 'binary' },
          },
        },
        DishUpdateInput: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', example: 'Lasagne med salat' },
            description: { type: 'string', example: 'Oppdatert beskrivelse.' },
            allergens: {
              description: 'JSON-array, kommaseparert streng eller gjentatte felt med allergen-ID-er.',
              oneOf: [
                { type: 'string', example: '[]' },
                { type: 'array', items: { type: 'string' } },
              ],
            },
            image: { type: 'string', format: 'binary' },
          },
        },
        WeeklyMenu: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '665f7d9f6efc2e0012233445' },
            monday: { nullable: true, oneOf: [{ $ref: '#/components/schemas/Dish' }] },
            tuesday: { nullable: true, oneOf: [{ $ref: '#/components/schemas/Dish' }] },
            wednesday: { nullable: true, oneOf: [{ $ref: '#/components/schemas/Dish' }] },
            thursday: { nullable: true, oneOf: [{ $ref: '#/components/schemas/Dish' }] },
            friday: { nullable: true, oneOf: [{ $ref: '#/components/schemas/Dish' }] },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        WeeklyMenuInput: {
          type: 'object',
          properties: {
            monday: { type: 'string', nullable: true, example: '665f7d9f6efc2e0012233445' },
            tuesday: { type: 'string', nullable: true, example: '665f7d9f6efc2e0012233445' },
            wednesday: { type: 'string', nullable: true, example: '665f7d9f6efc2e0012233445' },
            thursday: { type: 'string', nullable: true, example: '665f7d9f6efc2e0012233445' },
            friday: { type: 'string', nullable: true, example: '665f7d9f6efc2e0012233445' },
          },
        },
      },
      responses: {
        Unauthorized: {
          description: 'Mangler eller ugyldig JWT',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
        },
        Forbidden: {
          description: 'Krever admin-tilgang',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
        },
        NotFound: {
          description: 'Ressursen finnes ikke',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
        },
        ValidationError: {
          description: 'Ugyldig input',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
        },
      },
    },
    paths: {
      '/health': {
        get: {
          tags: ['Health'],
          summary: 'Sjekk API-status',
          responses: {
            200: {
              description: 'API-et kjører',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Health' } } },
            },
          },
        },
      },
      '/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Logg inn og hent JWT',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } },
          },
          responses: {
            200: {
              description: 'Innlogging OK',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } } },
            },
            400: { $ref: '#/components/responses/ValidationError' },
            401: { $ref: '#/components/responses/Unauthorized' },
            429: { description: 'For mange loginforsøk' },
          },
        },
      },
      '/dishes': {
        get: {
          tags: ['Dishes'],
          summary: 'Hent alle retter',
          responses: {
            200: {
              description: 'Liste med retter',
              content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Dish' } } } },
            },
          },
        },
        post: {
          tags: ['Dishes'],
          summary: 'Opprett rett med bilde',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: { 'multipart/form-data': { schema: { $ref: '#/components/schemas/DishInput' } } },
          },
          responses: {
            201: {
              description: 'Rett opprettet',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Dish' } } },
            },
            400: { $ref: '#/components/responses/ValidationError' },
            401: { $ref: '#/components/responses/Unauthorized' },
            403: { $ref: '#/components/responses/Forbidden' },
          },
        },
      },
      '/dishes/{id}': {
        get: {
          tags: ['Dishes'],
          summary: 'Hent én rett',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Rett', content: { 'application/json': { schema: { $ref: '#/components/schemas/Dish' } } } },
            404: { $ref: '#/components/responses/NotFound' },
          },
        },
        put: {
          tags: ['Dishes'],
          summary: 'Oppdater rett og eventuelt bilde',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: { 'multipart/form-data': { schema: { $ref: '#/components/schemas/DishUpdateInput' } } },
          },
          responses: {
            200: { description: 'Rett oppdatert', content: { 'application/json': { schema: { $ref: '#/components/schemas/Dish' } } } },
            400: { $ref: '#/components/responses/ValidationError' },
            401: { $ref: '#/components/responses/Unauthorized' },
            403: { $ref: '#/components/responses/Forbidden' },
            404: { $ref: '#/components/responses/NotFound' },
          },
        },
        delete: {
          tags: ['Dishes'],
          summary: 'Slett rett og tilhørende bilde',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Rett slettet', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
            401: { $ref: '#/components/responses/Unauthorized' },
            403: { $ref: '#/components/responses/Forbidden' },
            404: { $ref: '#/components/responses/NotFound' },
          },
        },
      },
      '/allergens': {
        get: {
          tags: ['Allergens'],
          summary: 'Hent alle allergener',
          responses: {
            200: { description: 'Liste med allergener', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Allergen' } } } } },
          },
        },
        post: {
          tags: ['Allergens'],
          summary: 'Opprett allergen',
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/AllergenInput' } } } },
          responses: {
            201: { description: 'Allergen opprettet', content: { 'application/json': { schema: { $ref: '#/components/schemas/Allergen' } } } },
            401: { $ref: '#/components/responses/Unauthorized' },
            403: { $ref: '#/components/responses/Forbidden' },
          },
        },
      },
      '/allergens/{id}': {
        put: {
          tags: ['Allergens'],
          summary: 'Oppdater allergen',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/AllergenInput' } } } },
          responses: {
            200: { description: 'Allergen oppdatert', content: { 'application/json': { schema: { $ref: '#/components/schemas/Allergen' } } } },
            401: { $ref: '#/components/responses/Unauthorized' },
            403: { $ref: '#/components/responses/Forbidden' },
            404: { $ref: '#/components/responses/NotFound' },
          },
        },
        delete: {
          tags: ['Allergens'],
          summary: 'Slett allergen',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Allergen slettet', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
            401: { $ref: '#/components/responses/Unauthorized' },
            403: { $ref: '#/components/responses/Forbidden' },
            404: { $ref: '#/components/responses/NotFound' },
          },
        },
      },
      '/menu': {
        get: {
          tags: ['Menu'],
          summary: 'Hent ukemeny',
          responses: {
            200: { description: 'Ukemeny', content: { 'application/json': { schema: { $ref: '#/components/schemas/WeeklyMenu' } } } },
          },
        },
        put: {
          tags: ['Menu'],
          summary: 'Oppdater ukemeny',
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/WeeklyMenuInput' } } } },
          responses: {
            200: { description: 'Ukemeny oppdatert', content: { 'application/json': { schema: { $ref: '#/components/schemas/WeeklyMenu' } } } },
            401: { $ref: '#/components/responses/Unauthorized' },
            403: { $ref: '#/components/responses/Forbidden' },
          },
        },
      },
      '/uploads/dishes/{filename}': {
        get: {
          tags: ['Uploads'],
          summary: 'Hent opplastet bilde',
          parameters: [{ name: 'filename', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Bildefil' },
            404: { description: 'Filen finnes ikke' },
          },
        },
      },
    },
  },
  apis: [],
})

export const swaggerUiMiddleware = swaggerUi
