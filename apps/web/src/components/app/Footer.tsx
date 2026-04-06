import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-300 text-black">
      <div className="max-w-7xl px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold">TradePortal</h2>
          <p className="mt-3 text-sm">
            Verkaufe oder kaufe Produkte
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-medium mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/contact" className="hover:underline">Kontakt</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-medium mb-3">Rechtliches</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/imprint" className="hover:underline">Impressum</Link></li>
            <li><Link href="/privacy" className="hover:underline">Datenschutz</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-500 text-center py-4 text-sm">
        © {new Date().getFullYear()} DeineApp. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}