"use client"
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";
import { useActionState, ViewTransition } from "react";
import { CONTACT_API_URL } from "@/lib/utils";
import {  } from "@/components/ui/sonner";
import { toast } from "sonner"


type contact = {
  id: number;
  phone: string;
  Headquarters: string;
  Email: string;
};

type contactSectionData = {
  id: number;
  title_1: string;
  title_2: string;
  contact: contact;
};

const BookingSection = ({ contactSection }: { contactSection?: contactSectionData }) => {

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    pickupLocation: "",
    date: "",
    time: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = useMemo(() => {
    if (!form.fullName.trim()) return false;
    if (!form.email.trim()) return false;
    if (!form.pickupLocation.trim()) return false;
    if (!form.date) return false;
    if (!form.time) return false;
    return true;
  }, [form]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValid) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          pickupLocation: form.pickupLocation,
          date: form.date,
          time: form.time,
          details: form.details,
        }),
      });

      console.log("Email sent successfully:", res);

      const payload = (await res.json().catch(() => null)) as
        | { ok?: boolean; message?: string; error?: string }
        | null;

      if (!res.ok || !payload?.message) {
        throw new Error(payload?.error || payload?.message || "Failed to send message.");
      }

    
      
      
      toast.success("Request sent successfully.");

      setForm({
        fullName: "",
        email: "",
        pickupLocation: "",
        date: "",
        time: "",
        details: "",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to send message.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="booking" className="py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-body uppercase tracking-[0.3em] text-primary">{contactSection?.title_1}</p>
          <h2 className="text-3xl font-display font-medium text-foreground md:text-5xl">
            {contactSection?.title_2}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid gap-12 md:grid-cols-2"
        >
          <form className="space-y-5" 
          onSubmit={onSubmit}
         
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Full Name"
                value={form.fullName}
               
                onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                // disabled={isPending}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <input
              type="text"
              placeholder="Pickup Location"
              value={form.pickupLocation}
              // disabled={isPending}
              onChange={(e) => setForm((p) => ({ ...p, pickupLocation: e.target.value }))}
              className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <input
                type="date"
                value={form.date}
                // disabled={isPending}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
              />
              <input
                type="time"
                value={form.time}
                // disabled={isPending}
                onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <textarea
              placeholder="Additional Details"
              rows={3}
              value={form.details}
              // disabled={isPending}
              onChange={(e) => setForm((p) => ({ ...p, details: e.target.value }))}
              className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
             
              className="cursor-pointer w-full border border-primary bg-primary px-8 py-3.5 text-xs font-body font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
            >
              {isSubmitting ? "Sending..." : "Request Booking"}
              {/* {isPending ? "Sending..." : "Request Booking"} */}
            </button>


       
          </form>

          <div className="flex flex-col justify-center space-y-8">
            <div className="flex items-start gap-4">
              <Phone className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="text-xs font-body uppercase tracking-widest text-muted-foreground">Phone</p>
                <p className="mt-1 font-display text-lg text-foreground">{contactSection?.contact.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="text-xs font-body uppercase tracking-widest text-muted-foreground">Email</p>
                <p className="mt-1 font-display text-lg text-foreground">{contactSection?.contact.Email}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="text-xs font-body uppercase tracking-widest text-muted-foreground">Headquarters</p>
                <p className="mt-1 font-display text-lg text-foreground">{contactSection?.contact.Headquarters}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
