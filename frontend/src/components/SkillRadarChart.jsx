import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillRadarChart = ({ skills }) => {
  // Group skills by category
  const technicalSkills = skills.filter(skill => skill.category === 'technical');
  const softSkills = skills.filter(skill => skill.category === 'soft');
  
  const chartData = {
    labels: technicalSkills.map(skill => skill.name),
    datasets: [
      {
        label: 'Technical Skills',
        data: technicalSkills.map(skill => skill.proficiency),
        backgroundColor: 'rgba(0, 51, 102, 0.2)', // foliance-blue with opacity
        borderColor: '#003366', // foliance-blue
        borderWidth: 2,
      },
      {
        label: 'Soft Skills',
        data: softSkills.map(skill => skill.proficiency),
        backgroundColor: 'rgba(200, 74, 7, 0.2)', // foliance-orange with opacity
        borderColor: '#C84A07', // foliance-orange
        borderWidth: 2,
      }
    ]
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 5
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Skill Proficiency'
      }
    }
  };

  return (
    <div className="card">
      <h3 className="section-title">Skills Overview</h3>
      <div className="w-full h-[400px]">
        <Radar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SkillRadarChart;
