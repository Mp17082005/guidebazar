// import React from 'react';

type NewsItem = {
  text: string;
  link: string;
};

interface NewsTickerProps {
  items?: NewsItem[]; // Make items optional, as we'll provide a default
}

const NewsTicker: React.FC<NewsTickerProps> = ({ items = [] }) => { // Provide a default empty array
  return (
    <div className="gradient-bg py-3 text-white overflow-hidden">
      {/* The animate-marquee class needs to be defined in your CSS/Tailwind config */}
      <div className="flex whitespace-nowrap animate-marquee space-x-8 px-4">
        {[...items, ...items].map((item, index) => (
          <a
            href={item.link}
            key={index} // Using index as key is generally discouraged if items can change order/be added/removed, but for a fixed news ticker, it's often acceptable.
            className="text-lg font-medium hover:underline hover:text-yellow-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.text}
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
