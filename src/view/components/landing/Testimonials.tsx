"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <div className="p-8 md:p-20">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          What our Users say
        </h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 md:mt-16">
          <div className="p-4 md:p-8 flex flex-col gap-6 rounded-md shadow-lg bg-[#F9FAFB]">
            <p>
              "InvoiceKu has streamlined our billing process completely. We save
              hours every week."
            </p>
            <Separator />
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGZhY2V8ZW58MHwyfDB8fHww" />
              </Avatar>
              <div className="flex flex-col">
                <p className="font-semibold">Sarah Smith</p>
                <p className="text-muted-foreground text-sm">
                  CEO, Digital Agency
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 md:p-8 flex flex-col gap-6 rounded-md shadow-lg bg-[#F9FAFB]">
            <p>
              "The automated features are fantastic. Our cash flow has improved
              significantly."
            </p>
            <Separator />
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhY2V8ZW58MHwyfDB8fHww" />
              </Avatar>
              <div className="flex flex-col">
                <p className="font-semibold">Mike Johnson</p>
                <p className="text-muted-foreground text-sm">
                  Freelance Developer
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 md:p-8 flex flex-col gap-6 rounded-md shadow-lg bg-[#F9FAFB]">
            <p>
              "Simple, clean, and exactly what we needed. Highly recommended!"
            </p>
            <Separator />
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHxmYWNlfGVufDB8MnwwfHx8MA%3D%3D" />
              </Avatar>
              <div className="flex flex-col">
                <p className="font-semibold">Emma Davis</p>
                <p className="text-muted-foreground text-sm">
                  Small Business Owner
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Testimonials;
