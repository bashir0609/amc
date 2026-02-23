import { Wrench, Gauge, Battery, Car, Droplet, type LucideIcon } from "lucide-react";

export type ServiceData = {
  slug: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  price: string;
  duration: string;
  faqs: { question: string; answer: string }[];
};

export const services: ServiceData[] = [
  {
    slug: "mot-testing",
    icon: Gauge,
    title: "MOT Testing",
    tagline: "Fast, reliable MOT tests from £40",
    description: "Comprehensive MOT testing for vehicles up to class 4",
    longDescription:
      "Our fully equipped DVSA-authorised MOT testing centre carries out thorough inspections to ensure your vehicle meets the UK's minimum roadworthiness standards. We test everything from brakes and lights to emissions and steering. Most tests are completed in under an hour, and we always aim for a same-day retest if minor repairs are needed on-site.",
    features: [
      "Quick turnaround (typically 45 minutes)",
      "Competitive pricing from £40",
      "Free retest within 10 working days",
      "Detailed VT20/VT30 report provided",
      "DVSA authorised testing station",
      "Vehicles up to Class 4 (cars, vans up to 3,000 kg)",
    ],
    price: "From £40",
    duration: "~45 minutes",
    faqs: [
      {
        question: "What does a Class 4 MOT include?",
        answer:
          "A Class 4 MOT covers vehicles with up to 8 passenger seats. The test checks lights, steering, suspension, brakes, tyres, seatbelts, bodywork, and exhaust emissions to ensure the vehicle meets the DVSA's minimum safety and environmental standards.",
      },
      {
        question: "What happens if my car fails the MOT?",
        answer:
          "You will receive a VT30 Refusal Certificate detailing all failure points. We will give you a transparent, no-obligation quote for the repairs. If we carry out the work, we offer a free partial retest within 10 working days.",
      },
      {
        question: "Can I drive my car after a failed MOT?",
        answer:
          "If your current MOT certificate is still valid, you can drive away. If the certificate has already expired, you may only drive it to a pre-booked garage for repairs. Driving with a dangerous defect is illegal regardless.",
      },
    ],
  },
  {
    slug: "full-service",
    icon: Wrench,
    title: "Full Service",
    tagline: "Complete annual vehicle health check from £120",
    description: "Complete vehicle servicing based on manufacturer specifications",
    longDescription:
      "Our Full Service is recommended annually or every 12,000 miles and gives your vehicle a comprehensive top-to-bottom inspection and maintenance. We work strictly to AUTODATA specifications — the same data used by main dealers — using quality parts and premium oils suited to your exact make and model.",
    features: [
      "Premium oil & filter change (AUTODATA spec)",
      "Brake inspection, adjustment & fluid check",
      "All fluid levels checked and topped up",
      "Air & cabin filter inspection",
      "Full multi-point safety inspection (70+ checks)",
      "Spark plug inspection (petrol models)",
      "Battery health check",
      "Service stamp provided",
    ],
    price: "From £120",
    duration: "2 – 3 hours",
    faqs: [
      {
        question: "What is the difference between an Interim and Full Service?",
        answer:
          "A Full Service covers everything in an Interim Service plus additional checks including spark plugs, cabin filters, battery condition, and a comprehensive 70+ point inspection. It is recommended annually or every 12,000 miles.",
      },
      {
        question: "Will a service affect my manufacturer warranty?",
        answer:
          "No. Under Block Exemption regulations, any VAT-registered garage using OEM-quality parts and following AUTODATA service schedules can carry out your service without voiding your manufacturer warranty.",
      },
      {
        question: "Do you provide a service stamp?",
        answer:
          "Yes. We can stamp your service book or provide a digital record of the service carried out, which is important for resale value.",
      },
    ],
  },
  {
    slug: "interim-service",
    icon: Car,
    title: "Interim Service",
    tagline: "Essential 6-monthly maintenance from £80",
    description: "Essential maintenance to keep your vehicle running smoothly",
    longDescription:
      "Recommended every 6 months or 6,000 miles, the Interim Service is ideal for high-mileage drivers who need more frequent maintenance between full services. It covers the essentials that keep your car safe and running efficiently day-to-day.",
    features: [
      "Engine oil & filter change",
      "Visual brake check (pads & discs)",
      "Tyre condition, tread depth & pressure check",
      "All exterior lights checked",
      "Fluid levels topped up (coolant, washer, power steering)",
      "Battery visual check",
    ],
    price: "From £80",
    duration: "~1.5 hours",
    faqs: [
      {
        question: "Who should get an Interim Service?",
        answer:
          "An Interim Service is ideal for drivers who cover more than 12,000 miles per year, as they need more frequent oil changes and safety checks to maintain their vehicle properly between annual Full Services.",
      },
      {
        question: "Can I combine an Interim Service with my MOT?",
        answer:
          "Absolutely. Booking your Interim Service at the same time as your MOT is a great way to save time. Many customers do this to keep their car in peak condition and get everything done in one visit.",
      },
    ],
  },
  {
    slug: "oil-change",
    icon: Droplet,
    title: "Oil Change",
    tagline: "Quick & clean oil change from £45",
    description: "Quality oil change using AUTODATA specifications",
    longDescription:
      "A regular oil change is the single most important thing you can do to extend your engine's life. We use the correct oil grade specified by AUTODATA for your exact vehicle and always replace the oil filter at the same time for a complete, clean system.",
    features: [
      "Correct spec oil for your exact make & model",
      "New oil filter included",
      "Drain plug washer replaced",
      "Oil level and quality confirmed on collection",
      "Manufacturer specification compliance (AUTODATA)",
      "Quick — typically under 45 minutes",
    ],
    price: "From £45",
    duration: "~30 – 45 minutes",
    faqs: [
      {
        question: "How often should I change my engine oil?",
        answer:
          "Most modern cars should have their oil changed every 10,000 – 15,000 km or every 12 months, whichever comes first. However, older vehicles or those driven in stop-start city conditions may benefit from more frequent changes. We will advise based on your specific car.",
      },
      {
        question: "Does the filter get replaced too?",
        answer:
          "Always. We never perform an oil change without replacing the filter. Leaving an old filter in place defeats the purpose of fresh oil as the new oil will immediately pick up old contaminants.",
      },
    ],
  },
  {
    slug: "diagnostics",
    icon: Battery,
    title: "Diagnostics",
    tagline: "Pin-point fault finding from £30",
    description: "Advanced vehicle diagnostics and fault finding",
    longDescription:
      "Modern vehicles are complex computers on wheels. Our advanced diagnostic equipment reads manufacturer-level fault codes across all modules — engine, transmission, ABS, airbag, and more — giving us an accurate picture of what's wrong before we start any repair work. No guesswork, no unnecessary parts.",
    features: [
      "Full OBD-II & manufacturer-level fault code scan",
      "Engine, gearbox, ABS, airbag & more",
      "Live data monitoring",
      "Fault code interpretation (not just reading)",
      "Repair recommendations with transparent pricing",
      "Fault codes cleared after repair",
    ],
    price: "From £30",
    duration: "~30 – 60 minutes",
    faqs: [
      {
        question: "My engine warning light is on — what should I do?",
        answer:
          "An engine warning light can mean anything from a loose fuel cap to a serious engine fault. We recommend booking a diagnostic check as soon as possible to identify the cause. Driving with an active fault can lead to more serious and expensive damage.",
      },
      {
        question: "Is the diagnostic fee included in the repair cost?",
        answer:
          "If you choose to have the repair carried out by us following the diagnostic, we will credit the diagnostic fee against the total repair cost.",
      },
    ],
  },
  {
    slug: "repairs",
    icon: Wrench,
    title: "Repairs",
    tagline: "Honest, expert vehicle repairs — quote on request",
    description: "General vehicle repairs and maintenance",
    longDescription:
      "From brake pad replacements to full exhaust systems, our experienced mechanics handle all types of vehicle repairs. We always provide a clear, written quote before starting any work and never proceed without your approval. All parts used are of OEM quality or better.",
    features: [
      "Brake pads, discs & callipers",
      "Clutch & gearbox repairs",
      "Suspension — springs, shock absorbers, bushes",
      "Exhaust system repairs & replacement",
      "Steering components",
      "Cooling system — radiators, water pumps, thermostats",
      "All work quoted in advance",
    ],
    price: "Quote on request",
    duration: "Depends on repair",
    faqs: [
      {
        question: "Do you provide a quote before starting repairs?",
        answer:
          "Always. We will inspect the vehicle, diagnose the fault, and give you a clear written quote before any work begins. We never start repairs without your explicit approval.",
      },
      {
        question: "Are your repairs guaranteed?",
        answer:
          "Yes. All our repair work is guaranteed for 12 months or 12,000 miles, whichever comes first. Parts are also covered by their respective manufacturer warranties.",
      },
      {
        question: "Do you work on all makes and models?",
        answer:
          "We work on the vast majority of cars and light vans. We service and repair all major brands including Ford, Vauxhall, Toyota, BMW, Mercedes, Audi, Volkswagen, Honda, Nissan, and more.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
