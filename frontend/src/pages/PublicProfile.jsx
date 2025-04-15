import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResume } from '../store/slices/portfolioSlice';
import { fetchPosts } from '../store/slices/blogSlice';
import SkillRadarChart from '../components/SkillRadarChart';
import CareerTimeline from '../components/CareerTimeline';
import PortfolioCard from '../components/PortfolioCard';

const PublicProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { resume, projects, loading: portfolioLoading, error: portfolioError } = useSelector((state) => state.portfolio);
  const { posts, loading: blogLoading, error: blogError } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchResume(username));
    dispatch(fetchPosts(username));
  }, [dispatch, username]);

  if (portfolioLoading || blogLoading) return <div>Loading...</div>;
  if (portfolioError || blogError) return <div className="text-red-600">{portfolioError || blogError}</div>;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-foliance-blue">{resume?.user?.first_name} {resume?.user?.last_name}</h1>
        <p className="text-xl text-foliance-dark-gray mt-2">{resume?.tagline}</p>
      </div>

      {/* Skills */}
      <div className="mb-12">
        <SkillRadarChart skills={resume?.skills || []} />
      </div>

      {/* Experience */}
      <div className="mb-12">
        <CareerTimeline
          items={resume?.experiences?.map(exp => ({
            id: exp.id,
            date: exp.start_date,
            title: exp.position,
            subtitle: exp.company,
            description: exp.description,
          })) || []}
        />
      </div>

      {/* Projects */}
      <div className="mb-12">
        <h2 className="section-title">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map(project => (
            <PortfolioCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.technologies?.split(',')}
              url={project.url}
              githubUrl={project.github_url}
              type="project"
            />
          ))}
        </div>
      </div>

      {/* Blog Posts */}
      <div>
        <h2 className="section-title">Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map(post => (
            <PortfolioCard
              key={post.id}
              title={post.title}
              description={post.excerpt}
              image={post.cover_image}
              tags={post.categories?.map(cat => cat.name)}
              type="blog"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
