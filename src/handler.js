'use strict';

const accountService = require('./services/accountService');

module.exports.hello = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello, this is an alternative AWS Lambda function!',
            input: event,
        }),
    };
};

module.exports.account = async (event) => {
    const { pid } = event.queryStringParameters || {};

    if (pid) {
        try {
            const result = await accountService.readFromDynamoDB('account', { id: '1' });

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: `Received PID: ${result}`,
                    input: event,
                }),
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: 'Internal server error.',
                }),
            };
        }
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: 'Missing or invalid PID in the query parameters.',
            }),
        };
    }
};
