import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  { q: 'What are the official check-in and check-out times?', a: 'Standard check-in is from 14:00 onwards. Check-out time is until 12:00 (noon). Early check-in or late check-out can be requested via concierge subject to suite availability.' },
  { q: 'How does the PromptPay QR mock payment system work?', a: 'After selecting your desired dates and completing the guest form, a dynamic PromptPay QR code with your exact booking total will be generated. Upload your payment slip screenshot and click Submit Verification. Admin will verify and confirm your room as Reserved/Paid.' },
  { q: 'Can I cancel or modify my booking dates?', a: 'Free cancellation and date adjustments are supported up to 24 hours prior to check-in. You can initiate cancellation directly from your User Dashboard under Booking History.' },
  { q: 'Is parking available at Victory Room?', a: 'Yes, Victory Room provides complimentary VIP underground parking with 24-hour security surveillance and high-speed EV charging stations for all staying guests.' },
  { q: 'What is included in the Sky Lounge access?', a: 'Executive Suite, Presidential Penthouse, and Pool Villa guests receive complimentary all-day gourmet coffee/tea, afternoon tea sets, and evening twilight cocktail receptions at the Sky Lounge.' }
];

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-10 space-y-8">
      
      <div className="pb-2">
        <h1 className="text-[32px] md:text-[40px] font-medium text-nike-ink dark:text-white">FAQ</h1>
        <p className="text-[14px] text-nike-mute dark:text-nike-stone mt-1">Frequently Asked Questions</p>
      </div>

      {/* Nike faq-row pattern: heading-md label, chevron right, 1px hairline divider */}
      <div>
        {FAQS.map((faq, idx) => (
          <div key={idx} className="border-t border-nike-hairline dark:border-nike-dark-card">
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between py-6 text-[16px] font-medium text-nike-ink dark:text-white text-left hover:text-nike-mute transition-colors"
            >
              <span className="pr-4">{faq.q}</span>
              {openIndex === idx ? <ChevronUp className="w-5 h-5 shrink-0" /> : <ChevronDown className="w-5 h-5 shrink-0 text-nike-mute" />}
            </button>
            {openIndex === idx && (
              <div className="pb-6 text-[16px] text-nike-charcoal dark:text-nike-stone leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
        <div className="border-t border-nike-hairline dark:border-nike-dark-card" />
      </div>

    </div>
  );
};
