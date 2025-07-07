
export default function ReviewPage() {
  return (
      <div className="relative z-10 py-8">
        <div className="container mx-auto px-4">
        

          {/* YouTube Video Section */}
          <div className="max-w-6xl mx-auto">
            {/* Featured Video */}
            <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl overflow-hidden">
              <div className="px-6 pt-6 pb-2 border-b border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">Video Review Hướng dẫn</h3>
                    <p className="text-sm text-gray-500">Cập nhật mới nhất</p>
                  </div>
                </div>
              </div>
              
              {/* YouTube Video Container */}
              <div className="p-6 bg-gray-50">
                <div className="flex justify-center">
                  <div className="relative w-full max-w-4xl">
                    {/* Replace the src with your actual YouTube video ID */}
                    <iframe 
                      className="w-full aspect-video rounded-lg shadow-lg"
                      src="https://www.youtube.com/embed/O-tD19TuLTQ?rel=0&modestbranding=1"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6 bg-white">
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  Hướng dẫn thay đổi mật khẩu 2 và câu hỏi bảo mật
                </h4>
                <p className="text-gray-600 mb-4">
                  Kiểm tra kĩ nhen anh em 
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">#Hướngdẫn</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">#Câuhỏi</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">#Bảomật</span>
                </div>
              </div>
            </div>

          

            {/* Call to Action */}
            <div className="text-center mt-12">
              <div className="bg-white bg-opacity-95 rounded-2xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  📺 Đăng Ký Kênh YouTube
                </h3>
                <p className="text-gray-600 mb-6">
                  Nhận thông báo video mới nhất và không bỏ lỡ những nội dung hấp dẫn!
                </p>
                <a 
                  href="https://www.youtube.com/@truongvantoanfifa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Subscribe YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
} 