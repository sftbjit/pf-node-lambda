'use strict';

const AWS = require('aws-sdk');

// Configure AWS SDK with your credentials and region
AWS.config.update({
    region: 'ap-northeast-1',
    accessKeyId: 'AKIAZHKPKQPJ74IGS5D7',
    secretAccessKey: 'i2Mo5qbfUYFjVxToN6NuIs/yxDv8PD/xp6L23TS+',
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const readFromDynamoDB = async (tableName, key) => {
    const params = {
        TableName: tableName,
        Key: key,
    };

    try {
        const result = await dynamoDB.get(params).promise();
        console.log('DynamoDB Result:', result);
        return result.Item;
    } catch (error) {
        console.error('DynamoDB Error:', error);
        throw error;
    }
};

module.exports = {
    readFromDynamoDB,
};
