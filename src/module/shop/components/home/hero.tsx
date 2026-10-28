import Link from "next/link";

const Hero = () => {

  return (
    <section className="bg-surface p-16 rounded-card ">
      <div className="space-y-6">
        <h1 className="text-5xl font-bold">Beauty, fragrances, furniture and groceries.</h1>
        <p className="text-sm text-muted"></p>
        <Link href="/products" className="btn-primary">Shop Now</Link>
      </div>
    </section>
  );
};

export default Hero;
