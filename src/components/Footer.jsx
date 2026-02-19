export default function Footer({ dark }) {
  const text = dark ? 'text-zinc-500' : 'text-gray-500'
  const textLight = dark ? 'text-zinc-600' : 'text-gray-400'
  const link = dark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
  const border = dark ? 'border-zinc-800' : 'border-gray-200'
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`py-8 px-6 mt-8 border-t ${border}`}>
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className={`font-bold text-sm mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
              FinanceTracker
            </h3>
            <p className={`text-xs leading-relaxed ${textLight}`}>
              Your personal finance management solution. Track expenses, monitor income, and take control of your financial future.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className={`font-bold text-sm mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
              Quick Links
            </h3>
            <div className={`text-xs space-y-1 ${text}`}>
              <a href="#" className={`block transition-colors ${link}`}>About Us</a>
              <a href="#" className={`block transition-colors ${link}`}>Privacy Policy</a>
              <a href="#" className={`block transition-colors ${link}`}>Terms of Service</a>
              <a href="#" className={`block transition-colors ${link}`}>Contact Support</a>
            </div>
          </div>

          {/* Connect Section */}
          <div className="text-center md:text-right">
            <h3 className={`font-bold text-sm mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
              Connect
            </h3>
            <div className={`text-xs space-y-1 ${text}`}>
              <a
                href="https://ashishdev.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`block transition-colors ${link}`}
              >
                🌐 ashishdev.com
              </a>
              <a href="mailto:contact@ashishdev.com" className={`block transition-colors ${link}`}>
                📧 contact@ashis8927@gmail.com
              </a>
              <p className={textLight}>Version 1.0.0</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t ${border} mb-4`} />

        {/* Copyright Section */}
        <div className={`text-center text-xs ${text}`}>
          <p className="mb-2">
            Created by{' '}
            <a
              href="https://ashishdev.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-semibold transition-colors duration-200 ${link}`}
            >
              Ashish Sharma
            </a>
          </p>
          <p className={textLight}>
            © {currentYear} FinanceTracker. All rights reserved. | Built with React & Firebase
          </p>
          <p className={`mt-1 ${textLight}`}>
            Made in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  )
}
