"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface PricingCategory {
  name: string;
  priceInfo: string;
  description: string;
  emoji: string;
  popular?: boolean;
}

const pricingCategories: PricingCategory[] = [
  {
    name: "Computers",
    emoji: "💻",
    priceInfo: "Custom quotes based on your business needs",
    description:
      "High-performance desktops, laptops, and accessories tailored to your organization's requirements.",
  },
  {
    name: "Office Supplies",
    emoji: "📦",
    priceInfo: "Flexible pricing – Ask for a personalized quote",
    description:
      "A wide range of essential office supplies to keep your workplace efficiently stocked.",
  },
  {
    name: "Services",
    emoji: "🛠️",
    priceInfo: "Contact us for repair, maintenance or setup service quotes",
    description:
      "Expert repair, maintenance, and IT support services to minimize downtime and keep your operations running.",
  },
];

const WEB3FORMS_ACCESS_KEY = "6138b91e-9848-49c9-bc70-422424d62dc2";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}
function Modal({ open, onClose, children, title }: ModalProps) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (open) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
      document.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-md w-full shadow-lg"
      >
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export default function ContentSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  function openModal(category: string) {
    setSelectedCategory(category);
    setFormStatus("idle");
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setFormStatus("success");
        form.reset();
        setTimeout(() => {
          setModalOpen(false);
          setFormStatus("idle");
        }, 3000);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      setFormStatus("error");
    }
  }

  return (
    <>
      <section id="pricing" className="py-16 md:py-32 bg-white text-black">
        <div className="mx-auto max-w-5xl space-y-12 px-6 md:space-y-20">
          <h2 className="text-center text-5xl font-extrabold">🏷️ Pricing Categories</h2>

          <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-3">
            {pricingCategories.map(({ name, priceInfo, description, emoji, popular }) => (
              <div
                key={name}
                className={`border rounded-3xl p-8 flex flex-col bg-white ${
                  popular ? "border-black" : "border-gray-400"
                } shadow-none transition hover:shadow-lg`}
              >
                <div className="flex items-center text-4xl mb-4">
                  <span>{emoji}</span>
                  <h3 className="ml-4 font-bold text-2xl">{name}</h3>
                </div>

                <p className="mb-4 text-lg font-semibold text-gray-900">{priceInfo}</p>

                <p className="mb-8 text-gray-700 flex-1">{description}</p>

                <button
                  onClick={() => openModal(name)}
                  className="w-full border-2 border-black text-black font-bold py-3 rounded-xl hover:bg-black hover:text-white transition"
                >
                  Request a Quote
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={`Request a Quote: ${selectedCategory}`}>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
          <input type="hidden" name="subject" value={`Quote Request: ${selectedCategory}`} />
          <input type="hidden" name="to" value="notonce50@gmail.com" />
          <input type="hidden" name="from_name" value="L&SD Website" />
          <input type="hidden" name="category" value={selectedCategory} />

          <label className="flex flex-col text-sm font-medium">
            Name
            <input
              type="text"
              name="name"
              required
              className="mt-1 rounded border p-2 text-black dark:text-white"
              disabled={formStatus === "success"}
            />
          </label>

          <label className="flex flex-col text-sm font-medium">
            Email
            <input
              type="email"
              name="email"
              required
              className="mt-1 rounded border p-2 text-black dark:text-white"
              disabled={formStatus === "success"}
            />
          </label>

          <label className="flex flex-col text-sm font-medium">
            Contact Number
            <input
              type="tel"
              name="phone"
              placeholder="+1 234 567 8900"
              className="mt-1 rounded border p-2 text-black dark:text-white"
              disabled={formStatus === "success"}
            />
          </label>

          <label className="flex flex-col text-sm font-medium">
            Message
            <textarea
              name="message"
              rows={4}
              required
              className="mt-1 rounded border p-2 text-black dark:text-white"
              disabled={formStatus === "success"}
            />
          </label>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setModalOpen(false)} disabled={formStatus === "success"}>
              Cancel
            </Button>
            <Button size="sm" type="submit" disabled={formStatus === "success"}>
              Submit
            </Button>
          </div>

          {formStatus === "success" && (
            <p className="text-green-600 mt-2">Thank you! Your quote request has been sent.</p>
          )}

          {formStatus === "error" && (
            <p className="text-red-600 mt-2">Oops! Something went wrong. Please try again later.</p>
          )}
        </form>
      </Modal>
    </>
  );
}
