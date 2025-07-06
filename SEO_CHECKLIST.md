# 🔍 SEO Checklist - truongvantoan.com

## ✅ Đã hoàn thành:

### 1. **Meta Tags cơ bản**

- ✅ Title tag được cập nhật
- ✅ Meta description được thêm
- ✅ Meta keywords được thêm
- ✅ Canonical URL được thêm
- ✅ Language tag được set thành "vi"

### 2. **Open Graph Tags**

- ✅ og:title
- ✅ og:description
- ✅ og:image
- ✅ og:url
- ✅ og:type
- ✅ og:site_name
- ✅ og:locale

### 3. **Twitter Cards**

- ✅ twitter:card
- ✅ twitter:title
- ✅ twitter:description
- ✅ twitter:image

### 4. **Structured Data**

- ✅ WebSite schema
- ✅ Organization schema
- ✅ SearchAction schema

### 5. **Technical SEO**

- ✅ robots.txt được tạo
- ✅ sitemap.xml được tạo
- ✅ SEOHead component được tạo

## ⚠️ Cần thực hiện ngay:

### 1. **Google Search Console**

```
1. Truy cập: https://search.google.com/search-console
2. Thêm website: https://truongvantoan.com
3. Xác minh quyền sở hữu (DNS hoặc HTML tag)
4. Submit sitemap: https://truongvantoan.com/sitemap.xml
```

### 2. **Google Analytics**

```
1. Tạo Google Analytics 4 property
2. Thêm tracking code vào index.html
3. Kết nối với Search Console
```

### 3. **Bing Webmaster Tools**

```
1. Thêm website vào Bing Webmaster Tools
2. Submit sitemap
3. Xác minh quyền sở hữu
```

### 4. **Social Media Verification**

```
1. Facebook Business Manager
2. Twitter Card Validator
3. LinkedIn Company Page
```

## 🔧 Cần cập nhật code:

### 1. **Thêm Google Analytics**

```html
<!-- Thêm vào index.html trong <head> -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

### 2. **Thêm Google Tag Manager**

```html
<!-- Thêm vào index.html ngay sau <body> -->
<!-- Google Tag Manager (noscript) -->
<noscript
  ><iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
    height="0"
    width="0"
    style="display:none;visibility:hidden"
  ></iframe
></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### 3. **Cập nhật sitemap.xml**

```
- Thêm tất cả URL của account products
- Cập nhật lastmod date
- Thêm priority cho từng loại trang
```

### 4. **Thêm breadcrumbs**

```jsx
// Tạo component Breadcrumbs
// Thêm structured data cho breadcrumbs
```

## 📊 Kiểm tra hiệu suất:

### 1. **PageSpeed Insights**

```
https://pagespeed.web.dev/
- Kiểm tra Core Web Vitals
- Tối ưu hóa images
- Minify CSS/JS
```

### 2. **Mobile-Friendly Test**

```
https://search.google.com/test/mobile-friendly
- Kiểm tra responsive design
- Tối ưu cho mobile
```

### 3. **Rich Results Test**

```
https://search.google.com/test/rich-results
- Kiểm tra structured data
- Xem preview kết quả
```

## 🎯 Từ khóa cần tối ưu:

### Primary Keywords:

- "truongvantoan.com"
- "shop bán account game"
- "mua acc game"
- "bán acc liên quân"
- "acc free fire"
- "acc fifa online 4"

### Long-tail Keywords:

- "shop bán account game uy tín việt nam"
- "mua acc game giá rẻ"
- "bán acc liên quân mobile"
- "acc free fire vip"
- "acc fifa online 4 nhiều tướng"

## 📝 Content cần thêm:

### 1. **Blog/News Section**

```
- Hướng dẫn chơi game
- Review account
- Tin tức game
- Tips và tricks
```

### 2. **FAQ Page**

```
- Câu hỏi thường gặp
- Hướng dẫn mua hàng
- Chính sách bảo hành
```

### 3. **About Page**

```
- Giới thiệu shop
- Lịch sử phát triển
- Cam kết chất lượng
```

## 🔗 Internal Linking:

### 1. **Navigation Structure**

```
Home → Shop → Category → Product
Home → News → Article
Home → Review → Video
```

### 2. **Related Products**

```
- Hiển thị sản phẩm liên quan
- Cross-selling
- Up-selling
```

## 📱 Mobile Optimization:

### 1. **Responsive Design**

```
- Kiểm tra trên tất cả devices
- Tối ưu touch targets
- Cải thiện loading speed
```

### 2. **AMP Pages**

```
- Tạo AMP version cho blog
- Tối ưu cho mobile search
```

## 🚀 Advanced SEO:

### 1. **Schema Markup**

```
- Product schema
- Review schema
- FAQ schema
- LocalBusiness schema
```

### 2. **Local SEO**

```
- Google My Business
- Local citations
- Customer reviews
```

### 3. **Technical SEO**

```
- XML sitemap
- Robots.txt
- .htaccess optimization
- CDN setup
```

## 📈 Monitoring:

### 1. **Tools cần dùng**

```
- Google Search Console
- Google Analytics
- SEMrush/Ahrefs
- Screaming Frog
- GTmetrix
```

### 2. **Metrics cần theo dõi**

```
- Organic traffic
- Keyword rankings
- Click-through rate
- Bounce rate
- Page load speed
```

## ⏰ Timeline:

### Week 1:

- [ ] Setup Google Search Console
- [ ] Setup Google Analytics
- [ ] Submit sitemap
- [ ] Fix technical issues

### Week 2:

- [ ] Add blog content
- [ ] Optimize images
- [ ] Improve page speed
- [ ] Add schema markup

### Week 3:

- [ ] Create FAQ page
- [ ] Add customer reviews
- [ ] Optimize for mobile
- [ ] Monitor rankings

### Week 4:

- [ ] Analyze results
- [ ] Adjust strategy
- [ ] Add more content
- [ ] Continue monitoring

---

**Lưu ý quan trọng:**

1. SEO cần thời gian (3-6 tháng để thấy kết quả)
2. Tập trung vào content quality
3. Đảm bảo website load nhanh
4. Tối ưu cho mobile trước
5. Theo dõi và điều chỉnh liên tục
