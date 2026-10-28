const categories = [
  {
    label: "Beauty",
  },
  { 
    label: "Fragrances" ,
},
  {
    label: "Furniture",
  },
  {
    label: "Groceries",
  },
];

const ProductCategories = () => {
  return <section className=" flex gap-6">
    {categories.map((category) => {
        return(
            <p key={category.label} className="px-4 py-2 rounded-full text-sm border border-solid border-border">{category.label} </p>
        )
    })}
  </section>;
};

export default ProductCategories;
