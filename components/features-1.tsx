import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ReactNode } from "react";

export default function Solutions() {
  return (
    <section id="solution" className="bg-white dark:bg-black py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-black dark:text-white text-4xl font-semibold lg:text-5xl">
            Solutions Tailored for Your Business
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            At L&amp;SD, we provide comprehensive solutions encompassing reliable computers,
            essential office supplies, and expert repair services to empower and
            streamline your business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-sm mx-auto md:max-w-full md:mx-0 text-center">
          <Card className="border border-black dark:border-white shadow-none bg-white dark:bg-black">
            <CardHeader className="pb-3 border-b border-black dark:border-white">
              <CardDecorator>
                <span role="img" aria-label="computer" className="text-4xl dark:text-white">
                  💻
                </span>
              </CardDecorator>
              <h3 className="mt-6 font-medium text-black dark:text-white text-lg">
                High-Performance Computers
              </h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-gray-800 dark:text-gray-300">
                Our selection of cutting-edge computers is designed for durability and performance,
                giving your team the power to excel without interruptions.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-black dark:border-white shadow-none bg-white dark:bg-black">
            <CardHeader className="pb-3 border-b border-black dark:border-white">
              <CardDecorator>
                <span role="img" aria-label="office supplies" className="text-4xl dark:text-white">
                  🗂️
                </span>
              </CardDecorator>
              <h3 className="mt-6 font-medium text-black dark:text-white text-lg">
                Complete Office Supplies
              </h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm text-gray-800 dark:text-gray-300">
                We stock a wide variety of essential office supplies, from stationery to peripherals,
                ensuring your workplace runs efficiently and smoothly day-to-day.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-black dark:border-white shadow-none bg-white dark:bg-black">
            <CardHeader className="pb-3 border-b border-black dark:border-white">
              <CardDecorator>
                <span role="img" aria-label="repair" className="text-4xl dark:text-white">
                  🛠️
                </span>
              </CardDecorator>
              <h3 className="mt-6 font-medium text-black dark:text-white text-lg">
                Expert Repair & Support
              </h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm text-gray-800 dark:text-gray-300">
                Our skilled technicians provide quick, reliable repair and maintenance
                services to minimize downtime and keep your systems running at peak efficiency.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div
    className="mx-auto size-36 flex items-center justify-center text-black dark:text-white"
  >
    {children}
  </div>
);
