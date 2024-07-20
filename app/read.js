// const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb');
// const { fromIni } = require('@aws-sdk/credential-provider-ini');

// const client = new DynamoDBClient({
//   region: 'ap-south-1',
//   credentials: fromIni({ profile: 'default' }),
// });

// const run = async () => {
//   try {
//     const params = {
//       TableName: 'dashboard', // Ensure this matches the table name in DynamoDB
//     };
//     const command = new ScanCommand(params);
//     const data = await client.send(command);
//     console.log('Success, items retrieved', data.Items);
//   } catch (err) {
//     console.error('Error', err);
//   }
// };

// run();


import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { fromIni } from '@aws-sdk/credential-provider-ini';

const client = new DynamoDBClient({
  region: 'ap-south-1',
  credentials: fromIni({ profile: 'default' }),
});

const run = async () => {
  try {
    const params = {
      TableName: 'dashboard', // Ensure this matches the table name in DynamoDB
    };
    const command = new ScanCommand(params);
    const data = await client.send(command);
    console.log('Success, items retrieved', data.Items);
  } catch (err) {
    console.error('Error', err);
  }
};

export { run };