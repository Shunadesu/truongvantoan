export default function CategoryNav({ categories }) {
  const handleClick = (key) => {
    const el = document.getElementById(key)
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 100 // 80 là chiều cao header
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }
  return (
    <nav className="bg-blue-50 rounded-lg shadow p-4 mb-8 flex flex-wrap gap-2">
      {categories.map(cat => (
        <button
          key={cat.key}
          onClick={() => handleClick(cat.key)}
          className="px-4 py-2 rounded hover:bg-blue-200 text-blue-700 font-medium transition bg-white shadow"
        >
          {cat.title}
        </button>
      ))}
    </nav>
  )
} 