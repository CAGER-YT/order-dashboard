import axios from 'axios';
import AWS from 'aws-sdk';
import cron from 'node-cron';
import express from 'express';

function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

// Shopify API credentials
const url = 'https://santhosh-kumar-13.myshopify.com';
const shopifyAPI = `${url}/admin/api/${getFormattedDate()}/orders.json`;
const apiKey = '169a427a07f0ff9aaf906426eb5e075a';
const password = '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';

// AWS DynamoDB configuration
AWS.config.update({ region: 'ap-south-1' });
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Fetch data from Shopify
async function fetchShopifyData() {
  try {
    const response = await axios.get(shopifyAPI, {
      auth: {
        username: apiKey,
        password: password
      }
    });
    return response.data.orders;
  } catch (error) {
    console.error('Error fetching data from Shopify:', error);
    throw error;
  }
}

// Extract specific fields
function extractFields(orders) {
  return orders.map(order => ({
    id: order.id.toString(),
    total_price: order.current_total_price,
    created_at: order.created_at,
    order_id: order.order_number
  }));
}

// Write data to DynamoDB
async function writeToDynamoDB(order) {
  const params = {
    TableName: 'dashboard',
    Item: {
      id: order.id,
      orderid: order.order_id,
      totalPrice: order.total_price,
      createdAt: order.created_at
    }
  };

  try {
    await dynamoDb.put(params).promise();
    console.log(`Successfully inserted order ${order.id}`);
  } catch (error) {
    console.error(`Error inserting order ${order.id}:`, error);
  }
}

// Main function to execute the steps
async function main() {
  try {
    const orders = await fetchShopifyData();
    const extractedOrders = extractFields(orders);

    for (const order of extractedOrders) {
      await writeToDynamoDB(order);
    }
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Creating a cron job which runs on every 10 seconds
cron.schedule("1 * * * * * *", function() {
  main();
  console.log("running a task every 10 seconds");
});

// In retrive.js
export { fetchShopifyData };
