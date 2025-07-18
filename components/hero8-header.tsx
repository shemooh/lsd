"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "./logo";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

const menuItems = [
  { name: "Home", href: "#home" },
  { name: "Solution", href: "#solution" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
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
    if (open) document.addEventListener("keydown", onKeyDown);
    else document.removeEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      aria-modal="true"
      role="dialog"
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

export const HeroHeader = () => {
  const [menuState, setMenuState] = useState(false);
  const [freeQuoteOpen, setFreeQuoteOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);

  // Form states:
  const [freeQuoteStatus, setFreeQuoteStatus] = useState<"idle" | "success" | "error">("idle");
  const [contactUsStatus, setContactUsStatus] = useState<"idle" | "success" | "error">("idle");

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuState(false);
    }
  };

  // Submit handler for forms using Fetch API
  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    setStatus: React.Dispatch<React.SetStateAction<"idle" | "success" | "error">>,
    closeModal: () => void
  ) {
    event.preventDefault();
    setStatus("idle");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
        // Reset form fields
        form.reset();

        setTimeout(() => {
          setStatus("idle");
          closeModal();
        }, 3000); // modal closes after 3 seconds
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <header>
        <nav
          data-state={menuState ? "active" : undefined}
          className="bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl"
        >
          <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
            <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
              <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                <Link href="/" aria-label="home" className="flex items-center space-x-2">
                  <Logo />
                </Link>

                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                  <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>

                <div className="hidden lg:block">
                  <ul className="flex gap-8 text-sm">
                    {menuItems.map(({ name, href }, index) => (
                      <li key={index}>
                        <a
                          href={href}
                          onClick={(e) => handleScroll(e, href)}
                          className="text-muted-foreground hover:text-accent-foreground block duration-150 cursor-pointer"
                        >
                          {name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className={`bg-background ${
                  menuState ? "block" : "hidden"
                } lg:flex mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent`}
              >
                <div className="lg:hidden w-full">
                  <ul className="space-y-6 text-base">
                    {menuItems.map(({ name, href }, index) => (
                      <li key={index}>
                        <a
                          href={href}
                          onClick={(e) => handleScroll(e, href)}
                          className="text-muted-foreground hover:text-accent-foreground block duration-150 cursor-pointer"
                        >
                          {name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFreeQuoteOpen(true)}
                    className="w-full sm:w-auto"
                  >
                    Free Quote
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setContactUsOpen(true)}
                    className="w-full sm:w-auto"
                  >
                    Contact Us
                  </Button>
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Free Quote Modal */}
      <Modal open={freeQuoteOpen} onClose={() => setFreeQuoteOpen(false)} title="L&SD Contact Form - Free Quote">
        <form
          onSubmit={(e) => handleSubmit(e, setFreeQuoteStatus, () => setFreeQuoteOpen(false))}
          className="flex flex-col space-y-4"
        >
          <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
          <input type="hidden" name="subject" value="L&SD Contact Form - Free Quote Request" />
          <input type="hidden" name="to" value="notonce50@gmail.com" />
          <input type="hidden" name="from_name" value="L&SD Website" />

          <label className="flex flex-col text-sm font-medium">
            Name
            <input
              type="text"
              name="name"
              required
              className="mt-1 rounded border p-2 text-black dark:text-white"
              disabled={freeQuoteStatus === "success"}
            />
          </label>

          <label className="flex flex-col text-sm font-medium">
            Email
            <input
              type="email"
              name="email"
              required
              className="mt-1 rounded border p-2 text-black dark:text-white"
              disabled={freeQuoteStatus === "success"}
            />
          </label>
              

          <label className="flex flex-col text-sm font-medium">
            Contact Number
            <input
              type="tel"
              name="phone"
              placeholder="+1 234 567 8900"
              className="mt-1 rounded border p-2 text-black dark:text-white"
            />
          </label>

          <label className="flex flex-col text-sm font-medium">
            Message
            <textarea
              name="message"
              rows={4}
              required
              className="mt-1 rounded border p-2 text-black dark:text-white"
              disabled={freeQuoteStatus === "success"}
            ></textarea>
          </label>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => setFreeQuoteOpen(false)}
              disabled={freeQuoteStatus === "success"}
            >
              Cancel
            </Button>
            <Button size="sm" type="submit" disabled={freeQuoteStatus === "success"}>
              Submit
            </Button>
          </div>

          {freeQuoteStatus === "success" && (
            <p className="text-green-600 mt-2">Thank you! Your Free Quote request has been sent.</p>
          )}
          {freeQuoteStatus === "error" && (
            <p className="text-red-600 mt-2">Oops! Something went wrong. Please try again later.</p>
          )}
        </form>
      </Modal>

      {/* Contact Us Modal */}
      <Modal open={contactUsOpen} onClose={() => setContactUsOpen(false)} title="L&SD Contact Form - Contact Us">
        <form
          onSubmit={(e) => handleSubmit(e, setContactUsStatus, () => setContactUsOpen(false))}
          className="flex flex-col space-y-4"
        >
          <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
          <input type="hidden" name="subject" value="L&SD Contact Form - Contact Us Inquiry" />
          <input type="hidden" name="to" value="notonce50@gmail.com" />
          <input type="hidden" name="from_name" value="L&SD Website" />

          <label className="flex flex-col text-sm font-medium">
            Name
            <input
              type="text"
              name="name"
              required
              className="mt-1 rounded border p-2 text-black dark:text-white"
              disabled={contactUsStatus === "success"}
            />
          </label>

          <label className="flex flex-col text-sm font-medium">
            Email
            <input
              type="email"
              name="email"
              required
              className="mt-1 rounded border p-2 text-black dark:text-white"
              disabled={contactUsStatus === "success"}
            />
          </label>
                <label className="flex flex-col text-sm font-medium">
        Contact Number
        <input
          type="tel"
          name="phone"
          placeholder="+1 234 567 8900"
          className="mt-1 rounded border p-2 text-black dark:text-white"
        />
      </label>

          <label className="flex flex-col text-sm font-medium">
            Message
            <textarea
              name="message"
              rows={4}
              required
              className="mt-1 rounded border p-2 text-black dark:text-white"
              disabled={contactUsStatus === "success"}
            ></textarea>
          </label>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => setContactUsOpen(false)}
              disabled={contactUsStatus === "success"}
            >
              Cancel
            </Button>
            <Button size="sm" type="submit" disabled={contactUsStatus === "success"}>
              Submit
            </Button>
          </div>

          {contactUsStatus === "success" && (
            <p className="text-green-600 mt-2">Thank you! Your message has been sent.</p>
          )}
          {contactUsStatus === "error" && (
            <p className="text-red-600 mt-2">Oops! Something went wrong. Please try again later.</p>
          )}
        </form>
      </Modal>
    </>
  );
};

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="pt-24 md:pt-32 flex flex-col-reverse lg:flex-row items-center max-w-6xl mx-auto px-6 gap-12"
    >
      <div className="lg:w-1/2 text-center lg:text-left">
        <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
          Welcome to L&amp;SD
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
          Your one-stop solution for computer office supplies, services, and repairs tailored to your
          business needs.
        </p>
        <div className="mt-10 flex justify-center lg:justify-start gap-4">
          <Button size="lg" asChild>
            <Link href="#solution">Our Solutions</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#about">About Us</Link>
          </Button>
        </div>
      </div>

      <div className="lg:w-1/2 max-w-lg relative">
        <Image
          src="/Flux_Dev_Depict_a_stunning_hero_section_mockup_that_harmonious_2 (1).jpg"
          alt="Office Supplies and Computers"
          width={600}
          height={400}
          className="rounded-lg shadow-lg object-cover"
          priority
        />
      </div>
    </section>
  );
};
