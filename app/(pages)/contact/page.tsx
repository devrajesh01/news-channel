import type { Metadata } from "next";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import ContactForm from "@/app/components/services/contact/ContactForm";
import Breadcrumb from "@/app/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the NewsWala team.",
};

const ContactPage = () => {
  return (
    <div className="site-container mx-auto py-10">
      <Breadcrumb items={[{ label: "Contact Us" }]} />

      <h1 className="text-2xl font-bold text-foreground md:text-3xl">Contact Us</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Have a question, a story tip, or feedback? Send us a message and we'll get back to you.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <ContactForm />

        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Get in Touch
            </h2>

            <div className="mt-4 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <HiOutlineMail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Email</p>
                  <p className="text-sm text-muted">contact@yourdomain.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HiOutlinePhone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Phone</p>
                  <p className="text-sm text-muted">+91 00000 00000</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HiOutlineLocationMarker className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Address</p>
                  <p className="text-sm text-muted">Kolkata, West Bengal, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;