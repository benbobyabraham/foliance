import React from 'react';

const TimelineItem = ({ date, title, subtitle, description, isLast }) => (
  <div className="relative pb-8">
    {!isLast && (
      <span
        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-foliance-blue"
        aria-hidden="true"
      />
    )}
    <div className="relative flex space-x-3">
      <div>
        <span className="h-8 w-8 rounded-full bg-foliance-blue flex items-center justify-center ring-8 ring-white">
          <svg
            className="h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div>
          <div className="text-sm">
            <span className="font-medium text-foliance-blue">{date}</span>
          </div>
          <div className="mt-1">
            <h3 className="text-lg font-semibold text-foliance-dark-gray">
              {title}
            </h3>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          <div className="mt-2 text-sm text-gray-700">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CareerTimeline = ({ items }) => {
  return (
    <div className="card">
      <h3 className="section-title">Career Journey</h3>
      <div className="flow-root">
        <ul className="-mb-8">
          {items.map((item, idx) => (
            <li key={item.id}>
              <TimelineItem
                date={item.date}
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                isLast={idx === items.length - 1}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CareerTimeline;
