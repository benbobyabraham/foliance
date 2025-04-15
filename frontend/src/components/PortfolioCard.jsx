import React from 'react';

const PortfolioCard = ({ 
  title, 
  description, 
  image, 
  tags, 
  url, 
  githubUrl,
  type = 'project' // 'project' or 'blog'
}) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      {image && (
        <div className="relative h-48 w-full mb-4">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
          />
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-foliance-blue">{title}</h3>
          <p className="mt-2 text-gray-600 line-clamp-3">{description}</p>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-foliance-light-gray text-foliance-blue"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          {type === 'project' ? (
            <div className="flex space-x-4">
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foliance-blue hover:text-foliance-orange"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foliance-blue hover:text-foliance-orange"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              )}
            </div>
          ) : (
            <button className="text-foliance-blue hover:text-foliance-orange">
              Read More →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
