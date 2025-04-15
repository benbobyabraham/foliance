import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResume } from '../store/slices/portfolioSlice';
import { fetchPosts } from '../store/slices/blogSlice';
import SkillRadarChart from '../components/SkillRadarChart';
import CareerTimeline from '../components/CareerTimeline';
import PortfolioCard from '../components/PortfolioCard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { resume, projects, loading: portfolioLoading, error: portfolioError } = useSelector((state) => state.portfolio);
  const { posts, loading: blogLoading, error: blogError } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchResume());
    dispatch(fetchPosts());
  }, [dispatch]);

  if (portfolioLoading || blogLoading) return <div>Loading...</div>;
  if (portfolioError || blogError) return <div className="text-red-600">{portfolioError || blogError}</div>;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foliance-blue">Welcome back, {user?.first_name}!</h1>
        <p className="text-foliance-dark-gray mt-2">{resume?.tagline}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-foliance-blue text-white">
          <div className="text-2xl font-bold">{projects?.length || 0}</div>
          <div className="text-sm opacity-80">Projects</div>
        </div>
        <div className="card bg-foliance-orange text-white">
          <div className="text-2xl font-bold">{posts?.length || 0}</div>
          <div className="text-sm opacity-80">Blog Posts</div>
        </div>
        <div className="card bg-foliance-dark-gray text-white">
          <div className="text-2xl font-bold">{resume?.skills?.length || 0}</div>
          <div className="text-sm opacity-80">Skills</div>
        </div>
      </div>

      {/* Skills Chart */}
      <div className="mb-8">
        <SkillRadarChart skills={resume?.skills || []} />
      </div>

      {/* Career Timeline */}
      <div className="mb-8">
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

      {/* Recent Projects */}
      <div className="mb-8">
        <h2 className="section-title">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.slice(0, 3).map(project => (
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

      {/* Recent Blog Posts */}
      <div>
        <h2 className="section-title">Recent Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.slice(0, 3).map(post => (
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

export default Dashboard;
