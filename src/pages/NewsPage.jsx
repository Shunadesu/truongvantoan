import { Link } from "react-router-dom";
import { accImages } from "../assets/images";
import { SiZalo } from "react-icons/si";

const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/toan.truong1003',
  zalo: 'https://zalo.me/0931133159',
  phone: 'tel:0931133159'
}

// Facebook Icon
const FacebookIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-white">
    <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
  </svg>
)

// Zalo Icon
const ZaloIcon = () => (
    <SiZalo size={24} className="text-white" />
)

// Phone Icon
const PhoneIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-white">
    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"/>
  </svg>
)

// Social Button Component
const SocialButton = ({ href, icon, children, bgColor, hoverColor, isPhone = false }) => (
  <a 
    href={href} 
    target={isPhone ? undefined : "_blank"}
    rel={isPhone ? undefined : "noopener noreferrer"}
    className={`flex items-center gap-3 ${bgColor} text-white px-6 py-3 rounded-lg font-semibold ${hoverColor} transition duration-300 shadow-lg hover:shadow-xl`}
  >
    {icon}
    {children}
  </a>
)

// Danh sách các bài viết Facebook
const FACEBOOK_POSTS = [
  {
    id: 0,
    postUrl: 'https://www.facebook.com/toan.truong1003/posts/pfbid02Jyo5SBL2APQpCvNbtzrjL1UwaTj7nd82KPcn8KAk9cpkTSv3AKH7ujXdy4z7R2Aml',
    iframeSrc: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Ftoan.truong1003%2Fposts%2Fpfbid02Jyo5SBL2APQpCvNbtzrjL1UwaTj7nd82KPcn8KAk9cpkTSv3AKH7ujXdy4z7R2Aml&show_text=true&width=500',
  },
  {
    id: 11,
    postUrl: 'https://www.facebook.com/toan.truong1003/posts/pfbid02VFK9WyW4AmY7xvPg8wnLJYPZ7cwadNxSDCRYTuf3GUoTyfNCxYSEegpTp3MovikLl',
    iframeSrc: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Ftoan.truong1003%2Fposts%2Fpfbid02VFK9WyW4AmY7xvPg8wnLJYPZ7cwadNxSDCRYTuf3GUoTyfNCxYSEegpTp3MovikLl&show_text=true&width=500',
  },
  {
    id: 6,
    postUrl: 'https://www.facebook.com/toan.truong1003/posts/pfbid0hrabbCnp3miZDxE2wkSAknATYBk7yNHviJYDtUecF4C1vvFmpTEK6foTVbDddjxgl',
    iframeSrc: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Ftoan.truong1003%2Fposts%2Fpfbid0hrabbCnp3miZDxE2wkSAknATYBk7yNHviJYDtUecF4C1vvFmpTEK6foTVbDddjxgl&show_text=true&width=500',
  },
  {
  id: 1,
  postUrl: 'https://www.facebook.com/toan.truong1003/posts/pfbid0ps4PX4dmm5PCGPoku6zHAZRaVAbVWQcub7iopE89Ccqrjdmvhg6CdmCPAXE5VAVxl',
  iframeSrc: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Ftoan.truong1003%2Fposts%2Fpfbid0ps4PX4dmm5PCGPoku6zHAZRaVAbVWQcub7iopE89Ccqrjdmvhg6CdmCPAXE5VAVxl&show_text=true&width=500',
  },
  {
        id: 2,
    postUrl: 'https://www.facebook.com/toan.truong1003/posts/pfbid02p97xBYdx9t43V2N87oT5qMzYJFeqewNE7QqLBgsvJppTfqZfQhQhfG9mj9xqsjXBl',
    iframeSrc: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Ftoan.truong1003%2Fposts%2Fpfbid02p97xBYdx9t43V2N87oT5qMzYJFeqewNE7QqLBgsvJppTfqZfQhQhfG9mj9xqsjXBl&show_text=true&width=700',
  },
  {
    id: 3,
    postUrl: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Ftoan.truong1003%2Fposts%2Fpfbid02Qceerecrwpm4DmNcgp46L4rFMMm882haQQXrAA5uwQErmsTwSeZVoSbKuUmKQqAGl',
    iframeSrc: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Ftoan.truong1003%2Fposts%2Fpfbid02Qceerecrwpm4DmNcgp46L4rFMMm882haQQXrAA5uwQErmsTwSeZVoSbKuUmKQqAGl&show_text=true&width=700',
  },
  {
    id: 4,
    postUrl: 'https://www.facebook.com/toan.truong1003/posts/pfbid022M8Zou883ZT4SVxNwosvPDDyugf28q9HXoXNrth43shYd8siqK9XhEeL5HhraWdDl',
    iframeSrc: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Ftoan.truong1003%2Fposts%2Fpfbid022M8Zou883ZT4SVxNwosvPDDyugf28q9HXoXNrth43shYd8siqK9XhEeL5HhraWdDl&show_text=true&width=700',
  },
  {
    id: 5,
    postUrl: 'https://www.facebook.com/toan.truong1003/posts/pfbid092PdGYg1dpxRMiKUemL8DNyCrkBZrJVVQjoHaC3FxPB5qcfV7rw7fhHx9VtuF3FQl',
    iframeSrc: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Ftoan.truong1003%2Fposts%2Fpfbid092PdGYg1dpxRMiKUemL8DNyCrkBZrJVVQjoHaC3FxPB5qcfV7rw7fhHx9VtuF3FQl&show_text=true&width=700',
  },
  
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            Họp chợ hằng ngày
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Theo dõi những tin tức mới nhất về họp chợ, cập nhật giá cả và các sự kiện đặc biệt
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Facebook Post Cards */}
          {FACEBOOK_POSTS.map(post => (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8" key={post.id}>
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">truongvantoan.com</h3>
                    <p className="text-sm text-gray-500">Họp Chợ hằng ngày</p>
                  </div>
                </div>
              </div>
              {/* Facebook Post Container */}
              <div className="p-6 bg-gray-50">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="md:block hidden">
                      <iframe
                        src={post.iframeSrc}
                        width="700"
                        height="612"
                        style={{ border: 'none', overflow: 'hidden' }}
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        className="rounded-lg shadow-md"
                        title={`Facebook Post ${post.id}`}
                      />
                    </div>
                    <div className="md:hidden block">
                      <iframe
                        src={post.iframeSrc}
                        width="400"
                        height="400"
                        style={{ border: 'none', overflow: 'hidden' }}
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        className="rounded-lg shadow-md"
                        title={`Facebook Post ${post.id}`}
                      />
                    </div>
                    {/* Fallback if iframe fails */}
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-500 mb-2">
                        Nếu bài viết không hiển thị, hãy truy cập trực tiếp:
                      </p>
                      <a
                        href={post.postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Xem bài viết trên Facebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="p-6 bg-white">
                <div className="flex flex-wrap gap-3 justify-center">
                  <a
                    href="https://www.facebook.com/toan.truong1003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Theo dõi Facebook
                  </a>
                  <a
                    href="https://truongvantoan.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    Truy cập Website
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Additional Info Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">Cập Nhật Giá Cả</h3>
              </div>
              <p className="text-gray-600">
                Theo dõi những thay đổi giá cả mới nhất trong họp chợ và các mặt hàng phổ biến.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">Sự Kiện Đặc Biệt</h3>
              </div>
              <p className="text-gray-600">
                Khám phá các sự kiện, khuyến mãi và hoạt động đặc biệt tại họp chợ.
              </p>
            </div>
          </div>
        </div>

        {/* Banner Section */}
      <section className="py-16">
        <div className="container max-w-[1240px] mx-auto px-4">
          <div className="flex flex-col gap-4">
          
            <Link to="https://www.facebook.com/photo/?fbid=2320510934798841&set=a.441073339409286" target="_blank">
            <img src={accImages.imgCheckLegit} alt="truongvantoan.com" className="w-full h-auto rounded-lg" />
            </Link>
            <img src={accImages.img_qr_boxchat} alt="truongvantoan.com" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white rounded-lg">
        <div className="container max-w-[1240px] mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Sẵn Sàng Mua Account Game?</h2>
          <p className="text-xl mb-8 text-blue-100">Tham gia cộng đồng game thủ cùng chúng tôi</p>
          
          {/* Social Media & Contact Buttons */}
          <div className="flex w-full flex-wrap gap-4 justify-center items-center">
            <SocialButton 
              href={SOCIAL_LINKS.facebook}
              icon={<FacebookIcon />}
              bgColor="bg-blue-600"
              hoverColor="hover:bg-blue-700"
            >
              Facebook
            </SocialButton>

            <SocialButton 
              href={SOCIAL_LINKS.zalo}
              icon={<ZaloIcon />}
              bgColor="bg-blue-500"
              hoverColor="hover:bg-blue-600"
            >
              0931.133.159
            </SocialButton>

            <SocialButton 
              href={SOCIAL_LINKS.phone}
              icon={<PhoneIcon />}
              bgColor="bg-green-600"
              hoverColor="hover:bg-green-700"
              isPhone={true}
            >
              0931.133.159
            </SocialButton>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
} 