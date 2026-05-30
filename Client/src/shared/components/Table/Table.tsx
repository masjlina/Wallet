// // React
// import React from "react";
//
// // App (modules)
// import {TransactionCol} from "@/modules/transactions";
//
// // Shared
// import {TRANSACTION_COLUMNS} from "@/shared/consts/transactionTypes";
//
// const Table = ({columns, rows}) => {
//     const columnsToRender = columns.map(column => {
//         switch (column) {
//             case TRANSACTION_COLUMNS.NAME:
//                 return <th key={header} scope="col">{TRANSACTION_COLUMNS.NAME}</th>;
//
//             case TRANSACTION_COLUMNS.AMOUNT:
//                 return <th key={header} scope="col">Amount</th>;
//
//             case TRANSACTION_COLUMNS.CATEGORY:
//                 return <th key={header} scope="col">Category</th>;
//
//             case TRANSACTION_COLUMNS.PAYMENT_METHOD:
//                 return <th key={header} scope="col">Payment Method</th>;
//
//             case TRANSACTION_COLUMNS.DATE:
//                 return <th key={header} scope="col">Date</th>;
//
//             case TRANSACTION_COLUMNS.ACTION:
//                 return <th key={header} scope="col">Action</th>;
//
//             default:
//                 return null;
//         }
//     })
//
//   return (
//       <div className="table-scroll scroll-y">
//           <table className="table table__content text text__table">
//               <TransactionCol tableHeaders={tableHeaders}/>
//
//               <tbody className="text text__table--name scroll-y">
//               {content}
//               </tbody>
//           </table>
//       </div>
//   )
// }