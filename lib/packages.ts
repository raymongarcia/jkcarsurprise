const packages = [
  {
    title: "Classic Reveal",
    price: 8900,
    tag: "For quick special moments",
    badge: "Most popular",
    description: "A surprise delivery experience with thoughtful styling and a curbside reveal.",
    inclusions: [
      "12 roses (suggested)",
      "6-inch cake (suggested)",
      "Cash bouquet: suggested ₱500 (optional)",
      "Custom note card",
      "Curbside reveal setup",
    ],
  },
  {
    title: "Luxury Launch",
    price: 16500,
    tag: "Most requested",
    badge: "Best value",
    description: "A high-impact reveal with premium vehicle styling and photo coverage.",
    inclusions: [
      "24 roses (suggested)",
      "8-inch cake (suggested)",
      "Cash bouquet: suggested ₱1,000 (optional)",
      "Chauffeur arrival setup",
      "Professional photography",
    ],
  },
  {
    title: "VIP Arrival",
    price: 32000,
    tag: "Full concierge experience",
    badge: "Premium",
    description: "A fully coordinated surprise for milestone celebrations and special occasions.",
    inclusions: [
      "50 roses (suggested)",
      "10-inch cake (suggested)",
      "Cash bouquet: suggested ₱2,000 (optional)",
      "Custom route planning",
      "Private reveal coordination",
    ],
  },
] as const;

export default packages;
