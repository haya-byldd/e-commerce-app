

const categoryOptions= [
  {
    id: "beauty",
    value: "beauty",
    label: "Beauty",
  },
  {
    id: "fragrances",
    value: "fragrances",
    label: "Fragrances",
  },
  {
    id: "groceries",
    value: "groceries",
    label: "Groceries",
  },
  {
    id: "furniture",
    value: "furniture",
    label: "Furniture",
  },
  ,
  {
    id: "home-living",
    value: "home-living",
    label: "Home & Living",
  }
];

const stockOptions = [
   {
    id: "in-stock",
    value: "in-stock",
    label: "In stock",
  },
  ,
  {
    id: "out-of-stock",
    value: "out-of-stock",
    label: "Out of stock",
  }
]
const ProductFilters = () => {
    return (
        <aside className="max-w-2xs w-full border border-solid border-border p-4 h-150 rounded-card">
            <div className=" border-border border-b">
                <h3 className="text-lg font-medium">Filters</h3>
            </div>

            <div className="space-y-2 my-5">
                <h4 className="font-bold">Category</h4>
                {categoryOptions.map((option:any) => {
                    const {id, label,value} = option
                    return(
                        <div key={value} className="flex gap-1">
                            <input type="checkbox" name={value} id={id} />
                            <label htmlFor={value} className="text-sm">{label}</label>
                        </div>
                    )
                })}

            </div>

            <div className="space-y-2 my-5">
                <h4 className="font-bold">Availability</h4>
                {stockOptions.map((option:any) => {
                    const {id, label,value} = option
                    return(
                        <div key={value} className="flex gap-1">
                            <input type="checkbox" name={value} id={id} />
                            <label htmlFor={value} className="text-sm">{label}</label>
                        </div>
                    )
                })}

            </div>

        </aside>
    )
}

export default ProductFilters;
