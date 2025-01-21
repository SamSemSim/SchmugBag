export default function About() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6 hover:scale-105 transition-transform duration-300">About SchmugBags</h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Crafting luxury handbags with elegance and sophistication since 2020
          </p>
        </div>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden group">
            <div 
              className="w-full h-full bg-center bg-cover transform transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: "url('https://placehold.co/800x600/222222/ffffff?text=Our+Workshop')" }}
            ></div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-500 mb-4">
              Founded in 2020, SchmugBags emerged from a passion for combining traditional craftsmanship with contemporary design. Our journey began in a small workshop, where each piece was meticulously crafted by hand, embodying our commitment to quality and attention to detail.
            </p>
            <p className="text-gray-500">
              Today, we continue to uphold these founding principles while embracing innovation and sustainability in our practices. Each SchmugBag is a testament to our dedication to excellence and our belief that luxury should be both timeless and responsible.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-900 rounded-full hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">🌟</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality First</h3>
              <p className="text-gray-500">
                We source only the finest materials and employ skilled artisans to ensure each piece meets our exacting standards.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-900 rounded-full hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">🌿</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
              <p className="text-gray-500">
                Our commitment to the environment drives us to use sustainable materials and ethical production methods.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-900 rounded-full hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">💫</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-500">
                We continuously explore new techniques and designs while honoring traditional craftsmanship.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center max-w-3xl mx-auto mb-20 hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-500">
            To create exceptional handbags that blend timeless elegance with modern functionality, while maintaining our commitment to quality, sustainability, and customer satisfaction.
          </p>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="aspect-square bg-gray-100 rounded-full overflow-hidden mb-4 max-w-[200px] mx-auto transform transition-all duration-300 group-hover:shadow-xl">
                <div 
                  className="w-full h-full bg-center bg-cover transform transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: "url('https://placehold.co/400x400/222222/ffffff?text=CEO')" }}
                ></div>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-900 transition-colors">Sarah Johnson</h3>
              <p className="text-gray-500">Founder & CEO</p>
            </div>
            <div className="text-center group">
              <div className="aspect-square bg-gray-100 rounded-full overflow-hidden mb-4 max-w-[200px] mx-auto transform transition-all duration-300 group-hover:shadow-xl">
                <div 
                  className="w-full h-full bg-center bg-cover transform transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: "url('https://placehold.co/400x400/222222/ffffff?text=Designer')" }}
                ></div>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-900 transition-colors">Michael Chen</h3>
              <p className="text-gray-500">Lead Designer</p>
            </div>
            <div className="text-center group">
              <div className="aspect-square bg-gray-100 rounded-full overflow-hidden mb-4 max-w-[200px] mx-auto transform transition-all duration-300 group-hover:shadow-xl">
                <div 
                  className="w-full h-full bg-center bg-cover transform transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: "url('https://placehold.co/400x400/222222/ffffff?text=Artisan')" }}
                ></div>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-900 transition-colors">Elena Martinez</h3>
              <p className="text-gray-500">Master Artisan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}