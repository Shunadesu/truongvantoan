export default function CategoryNav({ categories }) {
  const handleClick = (key) => {
    const el = document.getElementById(key)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
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