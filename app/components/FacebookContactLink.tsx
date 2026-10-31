const facebookPageUrl = "https://www.facebook.com/kmbrlyclmg";

export default function FacebookContactLink() {
  return (
    <a
      href={facebookPageUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300 transition hover:text-amber-200"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V21h3.4Z" />
      </svg>
      Contact us on Facebook
    </a>
  );
}
