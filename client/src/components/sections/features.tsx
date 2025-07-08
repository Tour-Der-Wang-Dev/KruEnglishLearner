import { FEATURES } from "@/lib/constants";

export default function FeaturesSection() {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-thai-red bg-opacity-10 text-thai-red",
      orange: "bg-thai-orange bg-opacity-10 text-thai-orange", 
      green: "bg-thai-rose bg-opacity-10 text-thai-rose",
      purple: "bg-thai-red bg-opacity-10 text-thai-red",
      yellow: "bg-thai-orange bg-opacity-10 text-thai-orange",
      red: "bg-thai-red bg-opacity-10 text-thai-red"
    };
    return colorMap[color] || colorMap.red;
  };

  return (
    <section className="py-20 bg-thai-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ทำไมต้องเลือก Kru English?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            แพลตฟอร์มเรียนภาษาอังกฤษที่ครบครันที่สุด พร้อมครูเจ้าของภาษาและเทคโนโลยีทันสมัย
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg card-hover text-center fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${getColorClasses(feature.color)}`}>
                <i className={`${feature.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
