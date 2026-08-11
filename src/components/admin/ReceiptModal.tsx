import React from 'react';
import { UtilityBill } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Printer, X, Receipt } from 'lucide-react';

interface ReceiptModalProps {
  bill: UtilityBill;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ bill, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const waterUnits = Math.max(0, bill.currWaterMeter - bill.prevWaterMeter);
  const electricUnits = Math.max(0, bill.currElectricMeter - bill.prevElectricMeter);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-gray-900 border border-gray-200 rounded-2xl max-w-2xl w-full p-8 shadow-2xl space-y-6 my-8 print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none print:w-full print:rounded-none">

        {/* ACTION HEADER */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <Receipt className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Official Payment Receipt & Utility Bill
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-4 h-4" /> Print / Download Receipt
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE RECEIPT */}
        <div className="space-y-6 text-xs leading-relaxed font-sans text-gray-800 print:text-xs">

          {/* BRAND HEADER */}
          <div className="flex justify-between items-start border-b border-gray-300 pb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900 uppercase">
                VICTORY APARTMENT BANGKOK
              </h1>
              <p className="text-gray-600">422 Phaya Thai Rd, Ratchathewi, Bangkok 10400</p>
              <p className="text-gray-600">Phone: +66 2 123 4567 | Email: admin@victoryapartment.com</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-md">
                {bill.status === 'Paid' ? 'OFFICIAL RECEIPT' : 'UTILITY INVOICE'}
              </span>
              <p className="text-gray-600 mt-1">Invoice No: <strong>{bill.invoiceNo}</strong></p>
              <p className="text-gray-600">Billing Month: <strong>{bill.billingMonth}</strong></p>
            </div>
          </div>

          {/* TENANT & ROOM INFO */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500 block">Tenant Name:</span>
              <span className="font-bold text-gray-900 text-sm">{bill.tenantName}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Unit Number:</span>
              <span className="font-bold text-blue-600 text-sm">Unit {bill.roomNumber}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Issue Date:</span>
              <span className="font-medium text-gray-900">{formatDate(bill.createdAt)}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Payment Date:</span>
              <span className="font-bold text-emerald-600">{bill.paymentDate ? formatDate(bill.paymentDate) : '-'}</span>
            </div>
          </div>

          {/* TABLE */}
          <table className="w-full border-collapse border border-gray-200 text-xs">
            <thead>
              <tr className="bg-gray-100 text-gray-700 font-bold">
                <th className="border border-gray-200 p-2 text-left">Description</th>
                <th className="border border-gray-200 p-2 text-center">Prev Meter</th>
                <th className="border border-gray-200 p-2 text-center">Curr Meter</th>
                <th className="border border-gray-200 p-2 text-center">Units Used</th>
                <th className="border border-gray-200 p-2 text-right">Rate</th>
                <th className="border border-gray-200 p-2 text-right">Amount (THB)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="border border-gray-200 p-2 font-medium">Monthly Rent Rate</td>
                <td className="border border-gray-200 p-2 text-center text-gray-400">-</td>
                <td className="border border-gray-200 p-2 text-center text-gray-400">-</td>
                <td className="border border-gray-200 p-2 text-center font-medium">1 Month</td>
                <td className="border border-gray-200 p-2 text-right">{formatCurrency(bill.rentAmount)}</td>
                <td className="border border-gray-200 p-2 text-right font-bold">{formatCurrency(bill.rentAmount)}</td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-2 font-medium">Water Supply Metering</td>
                <td className="border border-gray-200 p-2 text-center">{bill.prevWaterMeter}</td>
                <td className="border border-gray-200 p-2 text-center">{bill.currWaterMeter}</td>
                <td className="border border-gray-200 p-2 text-center font-bold text-blue-600">{waterUnits} units</td>
                <td className="border border-gray-200 p-2 text-right">{bill.waterRate} THB</td>
                <td className="border border-gray-200 p-2 text-right font-bold">{formatCurrency(bill.waterAmount)}</td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-2 font-medium">Electricity Supply Metering</td>
                <td className="border border-gray-200 p-2 text-center">{bill.prevElectricMeter}</td>
                <td className="border border-gray-200 p-2 text-center">{bill.currElectricMeter}</td>
                <td className="border border-gray-200 p-2 text-center font-bold text-amber-600">{electricUnits} units</td>
                <td className="border border-gray-200 p-2 text-right">{bill.electricRate} THB</td>
                <td className="border border-gray-200 p-2 text-right font-bold">{formatCurrency(bill.electricAmount)}</td>
              </tr>
              {bill.commonFee > 0 && (
                <tr>
                  <td className="border border-gray-200 p-2 font-medium">Building Common Maintenance Fee</td>
                  <td className="border border-gray-200 p-2 text-center text-gray-400">-</td>
                  <td className="border border-gray-200 p-2 text-center text-gray-400">-</td>
                  <td className="border border-gray-200 p-2 text-center">Flat</td>
                  <td className="border border-gray-200 p-2 text-right">{formatCurrency(bill.commonFee)}</td>
                  <td className="border border-gray-200 p-2 text-right font-bold">{formatCurrency(bill.commonFee)}</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 text-gray-900 font-bold text-sm">
                <td colSpan={5} className="border border-gray-200 p-3 text-right">GRAND TOTAL:</td>
                <td className="border border-gray-200 p-3 text-right text-emerald-600">{formatCurrency(bill.totalAmount)}</td>
              </tr>
            </tfoot>
          </table>

          {/* SIGNATURE */}
          <div className="pt-6 border-t border-gray-200 grid grid-cols-2 gap-8 text-center text-xs">
            <div className="space-y-8">
              <p className="text-gray-500">Payer Signature..........................................................</p>
              <p className="font-bold text-gray-900">( {bill.tenantName} )</p>
            </div>
            <div className="space-y-8">
              <p className="text-gray-500">Receiver Signature..........................................................</p>
              <p className="font-bold text-gray-900">( Victory Apartment Management )</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
