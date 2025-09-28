import { FaFacebook, FaCheckCircle } from 'react-icons/fa'

const LegitCard = ({ name, facebookUrl, avatar, index }) => {
  return (
    <div 
      className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 border-l-4 border-blue-500 hover:border-blue-600 relative overflow-hidden"
      style={{
        animationDelay: `${index * 200}ms`,
        animation: 'slideInFromLeft 0.8s ease-out forwards'
      }}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="relative z-10 flex items-center space-x-4">
        {/* Avatar with animation */}
        <div className="relative">
          <img 
            src={avatar} 
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-3 border-blue-200 group-hover:border-blue-400 transition-all duration-300 group-hover:scale-110"
          />
          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
            <FaCheckCircle className="text-white text-sm" />
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors duration-300">
            {name}
          </h3>
          <p className="text-gray-600 text-sm">Thương nhân uy tín</p>
        </div>
        
        {/* Facebook button with animation */}
        <a 
          href={facebookUrl}
          target="_blank"
          title="Facebook"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm font-medium group-hover:shadow-lg transform group-hover:translate-x-1"
        >
          <FaFacebook size={16} />
          <span className="hidden sm:inline">Facebook</span>
        </a>
      </a>
      
      {/* Animated border */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 w-0 group-hover:w-full transition-all duration-500"></div>
    </div>
  )
}

export default LegitCard
