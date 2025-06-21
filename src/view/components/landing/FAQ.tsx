"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const faqData = [
  {
    question: "What is InvoiceKu?",
    answer:
      "InvoiceKu is an easy-to-use platform for creating, sending, and managing invoices for your business or freelance projects.",
  },
  {
    question: "Is InvoiceKu free to use?",
    answer:
      "All free — no hidden fees, no trials. You can use all features without any cost.",
  },
  {
    question: "Can I send invoices via email?",
    answer:
      "Yes, InvoiceKu allows you to send invoices directly to your clients' email addresses with just a click.",
  },
  {
    question: "Does InvoiceKu support recurring invoices?",
    answer:
      "Absolutely! You can set up recurring invoices to be sent automatically on a weekly, monthly, or custom schedule.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "InvoiceKu supports multiple payment methods, including bank transfers, e-wallets like Gopay, Dana, Shopeepay, and more.",
  },
  {
    question: "Can I track invoice status?",
    answer:
      "Yes, each invoice has a status indicator such as Pending, Paid, or Overdue to help you keep track of payments.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Your data is encrypted and stored securely. We take privacy and security seriously to protect your business information.",
  },
];

const FrequentQuestions = () => {
  return (
    <div className="p-8 md:p-20 w-full bg-[#F9FAFB]">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Frequently Asked Questions
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Accordion.Root
          type="multiple"
          className="space-y-4 md:w-2/3 mx-auto mt-8 md:mt-16"
        >
          {faqData.map((item, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="border rounded-lg overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-3 font-medium text-left hover:bg-gray-100 transition">
                  {item.question}
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 AccordionChevron" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="p-4 overflow-hidden transition-all duration-300 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="pb-4 text-sm md:text-base">{item.answer}</div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </motion.div>
    </div>
  );
};

export default FrequentQuestions;
