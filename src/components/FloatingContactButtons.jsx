import { SiZalo } from 'react-icons/si'
import { FaFacebook, FaPhone } from 'react-icons/fa'

const FloatingContactButtons = () => {
  const buttons = [
    {
      icon: <FaFacebook className="w-5 h-5" />,
      href: "https://www.facebook.com/toan.truong1003",
      title: "Facebook",
      bgColor: "bg-blue-600",
      hoverColor: "hover:bg-blue-700"
    },
    {
      icon: <SiZalo className="w-5 h-5" />,
      href: "https://zalo.me/0931133159",
      title: "Zalo",
      bgColor: "bg-blue-400",
      hoverColor: "hover:bg-blue-500"
    },
    {
      icon: <FaPhone className="w-5 h-5" />,
      href: "tel:0931133159",
      title: "Gọi điện",
      bgColor: "bg-green-600",
      hoverColor: "hover:bg-green-700"
    }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {buttons.map((button, index) => (
        <a
          key={index}
          href={button.href}
          target={button.href.startsWith('http') ? "_blank" : undefined}
          rel={button.href.startsWith('http') ? "noopener noreferrer" : undefined}
          title={button.title}
          className={`
            ${button.bgColor} ${button.hoverColor}
            text-white w-12 h-12 rounded-full 
            flex items-center justify-center 
            shadow-lg hover:shadow-xl 
            transition-all duration-300 
            transform hover:scale-110
            cursor-pointer
          `}
        >
          {button.icon}
        </a>
      ))}
    </div>
  )
}

export default FloatingContactButtons 