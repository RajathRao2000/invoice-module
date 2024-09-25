import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Popup from "@/components/saleInvoices/Popup/Popup";
import { Data } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { TbFileDescription } from "react-icons/tb";
import { FaFileImage } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { FinalTotals } from "@/utils/types";
interface FooterProps {
  data: Data;
  total: number;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  const [_data, setData] = useState({ ...data });
  const [showInvoice, setShowInvoice] = useState(false);
  const [round, setRound] = useState(false);
  const [finalTotals, setFinalTotals] = useState<FinalTotals>({
    total: 0,
    final: 0,
  });

  useEffect(() => {
    setData((prev) => {
      if (prev.totals && data.totals) {
        return {
          ...prev,
          totals: {
            ...prev.totals,
            total: round
              ? data.totals.total
              : Math.round(prev.totals.total || 0),
          },
        };
      }
      return { ...prev };
    });
  }, [round]);

  useEffect(() => {
    setFinalTotals((prev) => {
      prev.total = data.totals?.total || 0;
      if (round) {
        prev.round = "";
        prev.final = data.totals?.total || 0;
      } else {
        prev.round = Math.abs(
          (data.totals?.total || 0) - Math.round(data.totals?.total || 0),
        ).toFixed(2);
        prev.final = Math.round(data.totals?.total || 0);
      }

      return { ...prev };
    });
  }, [showInvoice]);
  return (
    <>
      <div className="bottom flex items-center justify-between">
        <div className="flex flex-col gap-5 *:flex *:items-center *:justify-start *:gap-2 *:hover:cursor-not-allowed">
          <Button>
            <TbFileDescription /> Add Description
          </Button>
          <Button>
            <FaFileImage />
            Add Image
          </Button>
          <Button>
            <IoIosDocument />
            Add Document
          </Button>
        </div>
        <div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <Checkbox
                className="data-[state='checked']:bg-blue-800"
                onCheckedChange={(checked) => {
                  setRound(!checked);
                }}
                id="total"
              />
              <label htmlFor="total">Rounded</label>
            </div>
            <div>
              total:
              <Input
                className="disabled:bg-white disabled:opacity-100"
                disabled
                value={_data.totals?.total}
              />
            </div>
          </div>
          {/* <div>
            Received: <Input />
          </div> */}
        </div>
      </div>
      <div className="relative flex-grow justify-stretch">
        <Button
          onClick={() => setShowInvoice(!showInvoice)}
          className="absolute bottom-0 right-0"
        >
          Save
        </Button>
        {showInvoice && (
          <Popup
            setShowInvoice={setShowInvoice}
            data={data}
            finalTotals={finalTotals}
          />
        )}
      </div>
    </>
  );
};

export default Footer;
