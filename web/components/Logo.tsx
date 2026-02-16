interface LogoProps {
  className?: string
  size?: number
  showText?: boolean
}

export default function Logo({ className = '', size = 40, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/client-response-logo.svg"
        alt="Client Response Logo"
        width={size}
        height={size}
        className="flex-shrink-0"
        style={{ width: size, height: size }}
      />

      {showText && (
        <span className="font-bold text-lg">
          clean-<span className="text-primary">response</span>
        </span>
      )}
    </div>
  )
}
