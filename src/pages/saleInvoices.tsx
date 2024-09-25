import React, { useState } from "react";
import CustomerSelection from "@/components/saleInvoices/customer-selection-widget/customerSelection";
import ItemsEntry from "@/components/saleInvoices/itemsEntryWidget/ItemsEntry";
import { Data } from "@/utils/types";
import Footer from "@/components/saleInvoices/Footer/Footer";

const SaleInvoices: React.FC = () => {
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<Data>({});
  return (
    <div className="flex h-screen w-screen flex-col gap-5 bg-[#F3F3F3] p-5">
      <div className="top">
        <div className="add-customer">
          <CustomerSelection setData={setData} />
        </div>
      </div>
      <div className="middle">
        <ItemsEntry setData={setData} setTotal={setTotal} />
      </div>
      <Footer data={data} total={total} />
    </div>
  );
};

export default SaleInvoices;
