// import {
//     Box,
//     Card,
//     Page,
//     DataTable,
//   } from "@shopify/polaris";
//   import { LegacyCard } from '@shopify/polaris';
//   import React from 'react';
//   import { fetchShopifyData } from '../retrive.js';
// //   const data = require('./data.json');
// const data = require('./data.json');
//   function AdditionalPage() {
//     const rows = [
//       ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
//       ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
//       [
//         'Navy Merino Wool Blazer with khaki chinos and yellow belt',
//         '$445.00',
//         124518,
//         32,
//         '$14,240.00',
//       ],
//     ];
//     fetchShopifyData();
  
//     return (
//       <Page title="Sales by product">
//         <Card>
//           <DataTable
//             columnContentTypes={[
//               'numeric',
//               'numeric',
//               'numeric',
//               'numeric',
//               'numeric',
//             ]}
//             headings={[
//               'OrderID',
//               'Price',
//               'SKU Number',
//               'Net quantity',
//               'Net sales',
//             ]}
//             rows={rows}
//             totals={['', '', '', 255, '$155,830.00']}
//             showTotalsInFooter
//           />
//         </Card>
//       </Page>
//     );
//   }
  
//   function Code({ children }) {
//     return (
//       <Box
//         as="span"
//         padding="025"
//         paddingInlineStart="100"
//         paddingInlineEnd="100"
//         background="bg-surface-active"
//         borderWidth="025"
//         borderColor="border"
//         borderRadius="100"
//       >
//         <code>{children}</code>
//       </Box>
//     );
//   }
  
//   export default AdditionalPage;

//   ------------------------


// import {
//     Box,
//     Card,
//     Page,
//     DataTable,
//   } from "@shopify/polaris";
//   import { LegacyCard } from '@shopify/polaris';
//   import React from 'react';
//   import { fetchShopifyData } from '../retrive.js';
// //   import data from './data.json'; // Updated line
  
//   function AdditionalPage() {
//     const rows = [
//       ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
//       ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
//       [
//         'Navy Merino Wool Blazer with khaki chinos and yellow belt',
//         '$445.00',
//         124518,
//         32,
//         '$14,240.00',
//       ],
//     ];
//     fetchShopifyData();
  
//     return (
//       <Page title="Sales by product">
//         <Card>
//           <DataTable
//             columnContentTypes={[
//               'numeric',
//               'numeric',
//               'numeric',
//               'numeric',
//               'numeric',
//             ]}
//             headings={[
//               'OrderID',
//               'Price',
//               'SKU Number',
//               'Net quantity',
//               'Net sales',
//             ]}
//             rows={rows}
//             totals={['', '', '', 255, '$155,830.00']}
//             showTotalsInFooter
//           />
//         </Card>
//       </Page>
//     );
//   }
  
//   function Code({ children }) {
//     return (
//       <Box
//         as="span"
//         padding="025"
//         paddingInlineStart="100"
//         paddingInlineEnd="100"
//         background="bg-surface-active"
//         borderWidth="025"
//         borderColor="border"
//         borderRadius="100"
//       >
//         <code>{children}</code>
//       </Box>
//     );
//   }
  
//   export default AdditionalPage;
import React, { useState, useEffect } from 'react';
import { Box, Card, Page, DataTable } from '@shopify/polaris';
import { fetchShopifyData } from '../retrive.js';
import { read } from '../read.js';

function AdditionalPage() {
  const [rows, setRows] = useState([]);
  const [totals, setTotals] = useState(['', '', '0.00']);

  useEffect(() => {
    async function getData() {
      try {
        const orders = await fetchShopifyData();
        console.log('orders:', orders);
        const dataRows = orders.map(order => [
          order.order_id, // Corrected to `order_id`
          `$${order.total_price}`, // Corrected to `total_price`
          order.created_at // Corrected to use `created_at`
        ]);
        console.log('dataRows:', dataRows);
        const totalPrice = orders.reduce((acc, order) => acc + parseFloat(order.total_price), 0); // Corrected to `total_price`

        setRows(dataRows);
        setTotals(['', '', `$${totalPrice.toFixed(2)}`]);
        console.log('totals:', totals);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getData();
  }, []);

  return (
    <Page title="Sales by product">
      <Card>
        <DataTable
          columnContentTypes={['text', 'text', 'text']} // Adjusted column types
          headings={['Order ID', 'Total Price', 'Created At']} // Adjusted headings
          rows={rows}
          totals={totals}
          showTotalsInFooter
        />
      </Card>
    </Page>
  );
}

export default AdditionalPage;