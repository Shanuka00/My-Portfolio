import { Code2, Layout, Server, Smartphone } from 'lucide-react';

interface TechItem {
  icon: React.ReactNode;
  name: string;
  description: string;
}

const technologies: TechItem[] = [
  {
    icon: <Layout className="w-6 h-6" />,
    name: "Frontend Development",
    description: "React, Next.js, TypeScript, Tailwind CSS"
  },
  {
    icon: <Server className="w-6 h-6" />,
    name: "Backend Development",
    description: "Node.js, Express, MongoDB, PostgreSQL"
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    name: "Mobile Development",
    description: "React Native, Flutter"
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    name: "Programming Languages",
    description: "JavaScript, Python, Java, C++"
  }
];

export function About() {
  return (
    <>
      <section id="about" className="py-20 bg-chocolate-accent/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-chocolate-primary slide-up">
              About Me
            </h2>
            
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl slide-up card-hover">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="fade-in" style={{ animationDelay: '200ms' }}>
                  <img
                    src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
                    alt="Working on laptop"
                    className="rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  />
                </div>
                <div className="space-y-6 slide-in" style={{ animationDelay: '400ms' }}>
                  <h3 className="text-2xl font-semibold text-chocolate-primary">Who I Am</h3>
                  <p className="leading-relaxed">
                    I'm a passionate full-stack developer with a keen eye for design and a love for creating seamless user experiences. With years of experience in web and mobile development, I bring ideas to life through clean code and creative solutions.
                  </p>
                  <div className="space-y-3">
                    {[
                      "5+ years of development experience",
                      "50+ projects completed",
                      "Strong problem-solving skills"
                    ].map((item, index) => (
                      <p key={index} className="flex items-center gap-2 hover-lift">
                        <span className="w-2 h-2 rounded-full bg-chocolate-secondary"></span>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="technologies" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-chocolate-primary slide-up">
              Technologies I Use
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg card-hover"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-chocolate-accent rounded-lg text-chocolate-primary">
                      {tech.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-chocolate-primary">{tech.name}</h3>
                  </div>
                  <p>{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}