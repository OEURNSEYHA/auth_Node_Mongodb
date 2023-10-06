const options = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "Node Js API Project for mongodb",
        version: "1.0.1",
      },
      servers: [
        {
          url: "http://localhost:8080/",
          
        },
      ],
      paths: {
        '/user/login': {
            post: {
              summary: 'login',
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'array',
                        items: {
                          $ref: '',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '/users': {
            get: {
              summary: 'Get all users',
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'array',
                        items: {
                          $ref: '',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '/user/register': {
              post: {
                summary: 'Add new users',
                responses: {
                  '200': {
                    description: 'OK',
                    content: {
                      'application/json': {
                        schema: {
                          type: 'array',
                          items: {
                            $ref: '',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            
        },
     
    },
    apis: ["../src/router/userRouter.js"],
   
  };

  
module.exports = options;

