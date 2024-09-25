import React from "react";
import { FinalTotals, Totals } from "@/utils/types";
import { Data } from "@/utils/types";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoMdClose } from "react-icons/io";

interface PopupProps {
  setShowInvoice: React.Dispatch<React.SetStateAction<boolean>>;
  data: Data;
  finalTotals: FinalTotals;
}

const Popup: React.FC<PopupProps> = ({ setShowInvoice, data, finalTotals }) => {
  console.log(data.form);
  const { name, city, state, phoneNumber, invoice } = data.form || {};
  const tableData = data.tableData || {};
  const totals: Totals = data.totals || {};
  return (
    <div className="fixed left-1/2 top-1/2 flex w-screen max-w-[800px] -translate-x-1/2 -translate-y-1/2 flex-col gap-5 bg-white p-5 shadow-lg">
      <div className="header flex items-center justify-between">
        <h1 className="text-6xl">Invoice</h1>

        <button className="size-16" onClick={() => setShowInvoice(false)}>
          <IoMdClose className="size-full" />
        </button>
      </div>
      <p>Invoice No. {invoice}</p>
      <div className="invoices">
        <Table>
          <TableHeader className="">
            <TableRow>
              <TableHead className="">#</TableHead>
              <TableHead className="">Item</TableHead>
              <TableHead>QTY</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead className="">Price/Unit</TableHead>
              <TableHead className="h-auto px-0 text-center">
                Discount
                <div className="flex justify-between">
                  <div className="w-1/2 text-center">%</div>
                  <div className="w-1/2 p-0 text-center">Amount</div>
                </div>
              </TableHead>
              <TableHead className="px-0 text-center">
                Tax
                <div className="flex justify-between">
                  <div className="w-1/2 p-0 text-center">%</div>
                  <div className="w-1/2 p-0 text-center">Amount</div>
                </div>
              </TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.keys(tableData).map((key, index) => {
              return (
                <TableRow>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{tableData[key].item}</TableCell>
                  <TableCell>{tableData[key].qty}</TableCell>
                  <TableCell>{tableData[key].unit}</TableCell>
                  <TableCell>{tableData[key].price}</TableCell>
                  <TableCell className="px-0 text-center">
                    <div className="flex justify-between">
                      <div className="w-1/2 p-0 text-center">
                        {tableData[key].discount_percent}
                      </div>
                      <div className="w-1/2 p-0 text-center">
                        {tableData[key].discount}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-0 text-center">
                    <div className="flex justify-between">
                      <div className="w-1/2 p-0 text-center">
                        {tableData[key].gst}
                      </div>
                      <div className="w-1/2 p-0 text-center">
                        {tableData[key].tax || "n/a"}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{tableData[key].total}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Total</TableCell>
              <TableCell>{totals.quantity}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="px-0 text-center">
                <div className="flex justify-between">
                  <TableCell className="w-1/2 p-0 text-center"></TableCell>
                  <TableCell className="w-1/2 p-0 text-center">
                    {totals.discount?.toFixed(2)}
                  </TableCell>
                </div>
              </TableCell>
              <TableCell className="px-0 text-center">
                <div className="flex justify-between">
                  <TableCell className="w-1/2 p-0 text-center"></TableCell>
                  <TableCell className="w-1/2 p-0 text-center">
                    {totals.tax?.toFixed(2)}
                  </TableCell>
                </div>
              </TableCell>
              <TableCell>{totals.total}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="mb-5 text-xl">Billing Address</h3>
          <p>{name}</p>
          <p>{phoneNumber}</p>
          <p>{city}</p>
          <p>{state}</p>
        </div>
        <div className="flex max-w-96 flex-col *:flex *:items-center *:justify-between">
          <h3 className="mb-5 text-xl">Amounts</h3>
          <div>
            <p>Total:</p> <p>{finalTotals.total}</p>
          </div>
          <div>
            <p>Round:</p> <p>{finalTotals.round}</p>
          </div>
          <div>
            <p>final:</p> <p>{finalTotals.final}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
