
import Image from 'next/image';
import Link from 'next/link';
import { CheckSquare, Bell, BarChart2, Lock } from 'lucide-react';
import Shapes from './components/Shapes';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex items-start space-x-4 bg-white p-6 rounded-2xl shadow-lg w-full transition duration-300 hover:shadow-xl">
    <div className="flex-shrink-0">
      <Icon className="w-8 h-8 text-purple-600" />
    </div>
    <div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  </div>
);


export default function HomePage() {
  const primaryColor = 'bg-gradient-to-r from-purple-500 to-purple-600'; 

  const features = [
    { icon: CheckSquare, title: 'Smart Task Lists', description: 'create and manage your daily task easily' },
    { icon: Bell, title: 'Reminders', description: 'get notified about what matters' },
    { icon: BarChart2, title: 'Progress Tracker', description: 'visualize your completed goals' },
    { icon: Lock, title: 'Security', description: 'your data is encrypted and protected in all time' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative overflow-hidden">
      <Shapes />
      
      {/* Header Section */}
      <header className={`pt-12 pb-32 md:pt-16 md:pb-40 ${primaryColor} rounded-b-[40px] md:rounded-b-[80px] text-center text-white shadow-xl`}>
        <div className="flex justify-center items-center space-x-3 mb-6">
          <div className="border-2 border-white rounded-lg p-2">
            <CheckSquare className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">ToDo.</h1>
        </div>
        <p className="text-lg md:text-xl font-light italic px-4 text-gray-100">
          "Organize Your Day. Simplify Your Life."
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 -mt-20 md:-mt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Features Grid - Left Side */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
            
            {/* CTA Text and Button */}
            <div className="text-center lg:text-left mt-12 w-full max-w-2xl">
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                Ready to take control of your Day?
              </p>
              <Link
                href="/login"
                className={`inline-block px-12 py-4 text-lg font-semibold text-white rounded-2xl transition duration-300 ease-in-out shadow-lg hover:shadow-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700`}
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Illustration - Right Side */}
          <div className="flex flex-col items-center justify-start order-first lg:order-last">
            <div className="relative w-full max-w-md h-auto">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-4">
                <div className="relative w-full aspect-square flex items-center justify-center">
                  <Image
                    src="/women with laptop1.jpg"
                    alt="Woman working on laptop"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}