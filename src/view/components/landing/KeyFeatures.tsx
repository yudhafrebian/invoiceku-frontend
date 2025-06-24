"use client";
import { ChartLine, Mail, ReceiptText, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

const KeyFeatures = () => {
  const features = [
    {
      icon: <ReceiptText />,
      title: "Create Invoices",
      description:
        "Generate professional invoices in seconds with customizable templates",
    },
    {
      icon: <Mail />,
      title: "Email Delivery",
      description: "Send invoices directly to clients via email with tracking",
    },
    {
      icon: <ChartLine />,
      title: "Track Payment",
      description:
        "Monitor payment status and get notified when invoices are paid",
    },
    {
      icon: <RefreshCcw />,
      title: "Recurring Invoices",
      description: "Set up automatic recurring invoices for regular clients",
    },
  ];

  const renderFeatures = () => {
    return features.map((feature, index) => {
      return (
        <div key={index} className="border rounded-md p-2 md:p-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-muted">
              {feature.icon}
            </div>
            <div className="text-center mt-1 md:mt-3">
              <h3 className="md:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm md:text-base">{feature.description}</p>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="p-8 md:p-20 bg-white dark:bg-background">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 md:mb-5">Key Features</h2>
        <p className="text-muted-foreground md:text-lg">
          Everything you need to manage your invoices efficiently
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8 md:mt-16">
          {renderFeatures()}
        </div>
      </motion.div>
    </div>
  );
};

export default KeyFeatures;
