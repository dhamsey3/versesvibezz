interface FeatherIconProps {
  className?: string
  size?: number
}

export default function FeatherIcon({ className = "", size = 24 }: FeatherIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"></path>
      <path d="M16 8L2 22"></path>
      <path d="M17.5 15H9"></path>
    </svg>
  )
}
