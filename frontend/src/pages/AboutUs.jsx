import React from "react";
import {
  LuBook,
  LuPackageSearch,
  LuUsers,
  LuShoppingCart,
} from "react-icons/lu";

const About = () => {
  return (
    <div className="bg-[#3B2F2F] min-h-screen text-[#F2E8D5]">
      
      {/* Hero Section */}
      <section className="relative bg-[#3B2F2F] text-[#F2E8D5] min-h-[80vh] flex items-center py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          
          <div className="md:w-1/2">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-[#D7C4A9]">
              About Our Book Store-<span className="text-[#E85A4F]">BookHive</span> 
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed text-[#F2E8D5]/80">
              We help bookstores run smoothly—from inventory and purchase orders
              to customer accounts and sales—so readers can discover great titles
              and shops can grow with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#mission"
                className="inline-block bg-[#8B5E3C] text-white font-semibold px-8 py-4 rounded-lg shadow hover:bg-[#E85A4F] transition-all text-lg"
              >
                Our Mission
              </a>
              <a
                href="#services"
                className="inline-block border-2 border-[#D7C4A9] text-[#F2E8D5] font-semibold px-8 py-4 rounded-lg hover:bg-[#8B5E3C] hover:text-white transition-all text-lg"
              >
                Our Features
              </a>
            </div>
          </div>

          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1200&auto=format&fit=crop"
              alt="About Bookstore"
              className="w-full h-96 object-cover rounded-xl border border-[#8B5E3C]/30 shadow-xl shadow-black/40"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-20 bg-[#4A3B34]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Mission */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#D7C4A9]">
                Our Mission
              </h2>
              <p className="text-lg text-[#F2E8D5]/80 mb-6 leading-relaxed">
                To provide a simple, reliable, and efficient platform that
                reduces manual work for booksellers, improves accuracy in stock
                and orders, and delivers a delightful browsing and checkout experience.
              </p>
              <p className="text-lg text-[#F2E8D5]/80 leading-relaxed">
                Fast cataloging, clear dashboards, useful reports, and role-based access
                keep teams aligned every day.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-[#3B2F2F] p-8 rounded-2xl border border-[#8B5E3C]/30 shadow-lg">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#D7C4A9]">
                Our Vision
              </h2>
              <p className="text-lg text-[#F2E8D5]/80 leading-relaxed">
                A world where every bookstore thrives with intuitive,
                affordable technology crafted for book lovers. We envision stronger communities,
                independent bookshops, and a sustainable reading culture.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section id="services" className="py-20 bg-[#3B2F2F]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#D7C4A9]">
            What You Can Do With BookHive
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Feature Cards */}
            {[
              { icon: <LuBook className="w-8 h-8" />, title: "Inventory Management", text: "Track stock, suppliers, variants & low-stock alerts." },
              { icon: <LuShoppingCart className="w-8 h-8" />, title: "Orders & Invoicing", text: "Manage invoices, returns, and exportable reports." },
              { icon: <LuPackageSearch className="w-8 h-8" />, title: "Catalog & Metadata", text: "Organize by ISBN, genre, tags & more." },
              { icon: <LuUsers className="w-8 h-8" />, title: "Customers & Wishlists", text: "Customer profiles, wishlists & order history." }
            ].map((item, i) => (
              <div key={i} className="bg-[#4A3B34] p-8 rounded-2xl border border-[#8B5E3C]/20 shadow hover:shadow-xl hover:scale-[1.02] transition-all">
                <div className="w-16 h-16 bg-[#3B2F2F] rounded-full flex items-center justify-center mb-6 text-[#D7C4A9]">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#F2E8D5]">
                  {item.title}
                </h3>
                <p className="text-[#D7C4A9] leading-relaxed">{item.text}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[#4A3B34]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#D7C4A9]">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "✅", title: "Simplicity", desc: "Clean, uncluttered features that help you work faster."},
              { icon: "🛡️", title: "Accuracy & Trust", desc: "Reliable stock, secure data & transparent insights."},
              { icon: "🤝", title: "Community & Literacy", desc: "Empowering local bookshops & reading culture."},
            ].map((item, i) => (
              <div key={i} className="bg-[#3B2F2F] p-8 rounded-2xl shadow-xl text-center border border-[#8B5E3C]/20">
                <div className="w-20 h-20 bg-[#4A3B34] rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-[#F2E8D5]">{item.title}</h3>
                <p className="text-[#D7C4A9] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="py-20 bg-[#4A3B34] text-center text-[#F2E8D5]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#D7C4A9]">
            Ready to Streamline Your Bookstore?
          </h2>

          <p className="text-xl mb-8 leading-relaxed text-[#F2E8D5]/80">
            Explore features, manage your catalog, and grow your community with tools built for booksellers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/all-books"
              className="inline-block bg-[#8B5E3C] text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-[#E85A4F] transition-all"
            >
              Browse Books
            </a>
            <a
              href="/dashboard"
              className="inline-block border-2 border-[#D7C4A9] text-[#F2E8D5] font-semibold px-8 py-4 rounded-lg hover:bg-[#8B5E3C] hover:text-white transition-all"
            >
              Go to Dashboard
            </a>
            <a
              href="/contact"
              className="inline-block border-2 border-[#D7C4A9] text-[#F2E8D5] font-semibold px-8 py-4 rounded-lg hover:bg-[#8B5E3C] hover:text-white transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
