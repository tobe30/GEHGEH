import { useState } from "react"

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null)
    const faqsData = [
        {
            question: 'How much does a consultation cost?',
            answer: 'Each appointment with Gehgeh costs ₦200,000. This secures your date and time for a one-on-one session.'
        },
        {
            question: 'How do I book an appointment?',
            answer: 'Simple! Pick a date → Select a time slot → Proceed to payment → Your appointment is confirmed instantly.'
        },
        {
            question: 'Can I reschedule my booking?',
            answer: 'Yes. You can reschedule at least 48 hours before your appointment by contacting our support team.'
        },
        {
            question: 'What payment methods are supported?',
            answer: 'We accept debit/credit cards, bank transfer, and popular online payment platforms in Nigeria.'
        },
        {
            question: 'Is my payment secure?',
            answer: 'Absolutely. All payments are processed through trusted and secure payment gateways.'
        }
    ]

    return (
        <>
            <div className='flex flex-col items-center text-center text-slate-800 px-3'>
                <p className='text-base font-medium text-slate-600'>FAQ</p>
                <h1 className='text-3xl md:text-4xl font-semibold mt-2'>Frequently Asked Questions</h1>
                <p className='text-sm text-slate-500 mt-4 max-w-sm'>
                    Quick answers about booking, payments, and rescheduling with Gehgeh Consulting.
                </p>
                <div className='max-w-xl w-full mt-6 flex flex-col gap-4 items-start text-left'>
                    {faqsData.map((faq, index) => (
                        <div key={index} className='flex flex-col items-start w-full'>
                            <div
                                className='flex items-center justify-between w-full cursor-pointer bg-gradient-to-r from-indigo-50 to-white border border-indigo-100 p-4 rounded'
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <h2 className='text-sm font-medium'>{faq.question}</h2>
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out`}
                                >
                                    <path
                                        d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                                        stroke="#1D293D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <p
                                className={`text-sm text-slate-500 px-4 transition-all duration-500 ease-in-out ${openIndex === index ? "opacity-100 max-h-[300px] translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`}
                            >
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Faq
