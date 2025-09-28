import AccCard from './AccCard'

export default function CategorySection({ title, accs, id }) {
  // Tìm giá thấp nhất (dạng số)
  const minPrice = accs.length > 0 ? accs.reduce((min, acc) => {
    const price = parseInt(acc.price.replace(/\D/g, ''))
    return price < min ? price : min
  }, parseInt(accs[0].price.replace(/\D/g, ''))) : null
  // Định dạng lại minPrice về dạng string để so sánh
  const minPriceStr = minPrice ? accs.find(acc => parseInt(acc.price.replace(/\D/g, '')) === minPrice)?.price : null

  return (
    <section className="mb-10" id={id}>
      
      <h3 className="text-blue-800 font-bold text-3xl mb-4">{title}</h3>
      <div className="bg-blue-50 rounded-lg p-4 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {accs.length === 0 ? (
          <div className="col-span-full text-gray-400 italic">Tạm thời hết acc trong danh mục này.</div>
        ) : (
          accs.map(acc => <AccCard key={acc.id} acc={acc} minPrice={minPriceStr} />)
        )}
      </div>
    </section>
  )
} 