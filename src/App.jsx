import { useState, useRef, useEffect } from 'react';
import './App.css';
import { Chart } from 'chart.js/auto';

const VulnerabilityCharts = () => {
  const [activeRelease, setActiveRelease] = useState(0); // Default to the first release
  const [selectedContainer, setSelectedContainer] = useState(null); // State to hold clicked container data
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Destroy any existing chart instance for this canvas
      if (chartRef.current._chartInstance) {
        chartRef.current._chartInstance.destroy();
      }

      // Get data for the active release
      const { releaseName, releaseDate, containers } = releases[activeRelease];

      const chartData = {
        labels: containers.map((container) => container.containerName),
        datasets: [
          {
            label: 'High',
            data: containers.map((container) => container.high),
            backgroundColor: 'rgba(255, 99, 132, 0.8)', // High
          },
          {
            label: 'Medium',
            data: containers.map((container) => container.medium),
            backgroundColor: 'rgba(54, 162, 235, 0.8)', // Medium
          },
          {
            label: 'Low',
            data: containers.map((container) => container.low),
            backgroundColor: 'rgba(75, 192, 192, 0.8)', // Low
          },
        ],
      };

      const chartOptions = {
        responsive: true,
        indexAxis: 'y', // This makes the chart horizontal
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `${releaseName} (${releaseDate})`,
          },
        },
        scales: {
          x: {
            stacked: true, // Stack the bars horizontally
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Vulnerabilities',
            },
          },
          y: {
            stacked: true, // Stack the bars vertically
          },
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index; // Get the index of the clicked bar
            setSelectedContainer(containers[index]); // Set the corresponding container data
          }
        },
      };

      // Create a new chart instance
      chartRef.current._chartInstance = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
      });
    }

    // Cleanup chart on unmount
    return () => {
      if (chartRef.current && chartRef.current._chartInstance) {
        chartRef.current._chartInstance.destroy();
      }
    };
  }, [activeRelease]); // Re-render chart when activeRelease changes

  return (
    <div style={{ display: 'flex' }}>
      <div>
        {/* Dropdown for Releases */}
        <div style={{ marginBottom: '20px' }}>
          <select
            value={activeRelease}
            onChange={(e) => setActiveRelease(Number(e.target.value))}
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              cursor: 'pointer',
            }}
          >
            {releases.map((release, index) => (
              <option key={index} value={index}>
                {release.releaseName} ({release.releaseDate})
              </option>
            ))}
          </select>
        </div>

        {/* Canvas for Chart */}
        <canvas ref={chartRef} width="800" height="800"></canvas>
      </div>

      {/* Table to Display Selected Container Data */}
      <div style={{ marginLeft: '20px', width: '500px' }}>
        {selectedContainer ? (
          <div>
            <h3>Details for {selectedContainer.containerName}</h3>
            <table style={{ width: '100%', border: '1px solid #ccc', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Severity</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {selectedContainer.vulnerabilities.map((vul, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{vul.severity}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{vul.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Click a bar to see detailed vulnerabilities</p>
        )}
      </div>
    </div>
  );
};

// Example Data with Vulnerabilities
const releases = [
  {
    releaseName: 'Release 1',
    releaseDate: '2024-11-01',
    containers: [
      {
        containerName: 'Container 1',
        high: 1,
        medium: 1,
        low: 2,
        vulnerabilities: [
          { description: 'SQL Injection', severity: 'High' },
          { description: 'Cross-Site Scripting', severity: 'Medium' },
          { description: 'Weak Password Policy', severity: 'Low' },
          { description: 'Unpatched Software', severity: 'Low' },
        ],
      },
      {
        containerName: 'Container 2',
        high: 0,
        medium: 1,
        low: 1,
        vulnerabilities: [
          { description: 'Data Exposure', severity: 'Medium' },
          { description: 'Misconfigured Server', severity: 'Low' },
        ],
      },
      {
        containerName: 'Container 3',
        high: 1,
        medium: 1,
        low: 2,
        vulnerabilities: [
          { description: 'SQL Injection', severity: 'High' },
          { description: 'Cross-Site Scripting', severity: 'Medium' },
          { description: 'Weak Password Policy', severity: 'Low' },
          { description: 'Unpatched Software', severity: 'Low' },
        ],
      },
      {
        containerName: 'Container 4',
        high: 1,
        medium: 1,
        low: 2,
        vulnerabilities: [
          { description: 'SQL Injection', severity: 'High' },
          { description: 'Cross-Site Scripting', severity: 'Medium' },
          { description: 'Weak Password Policy', severity: 'Low' },
          { description: 'Unpatched Software', severity: 'Low' },
        ],
      },
      {
        containerName: 'Container 5',
        high: 1,
        medium: 1,
        low: 7,
        vulnerabilities: [
          { description: 'SQL Injection', severity: 'High' },
          { description: 'Cross-Site Scripting', severity: 'Medium' },
          { description: 'Weak Password Policy', severity: 'Low' },
          { description: 'Unpatched Software', severity: 'Low' },
        ],
      },
    ],
  },
  {
    releaseName: 'Release 2',
    releaseDate: '2024-11-01',
    containers: [
      {
        containerName: 'Container 1',
        high: 1,
        medium: 1,
        low: 2,
        vulnerabilities: [
          { description: 'SQL Injection', severity: 'High' },
          { description: 'Cross-Site Scripting', severity: 'Medium' },
          { description: 'Weak Password Policy', severity: 'Low' },
          { description: 'Unpatched Software', severity: 'Low' },
        ],
      },
      {
        containerName: 'Container 2',
        high: 0,
        medium: 1,
        low: 1,
        vulnerabilities: [
          { description: 'Data Exposure', severity: 'Medium' },
          { description: 'Misconfigured Server', severity: 'Low' },
        ],
      },
      {
        containerName: 'Container 3',
        high: 1,
        medium: 1,
        low: 2,
        vulnerabilities: [
          { description: 'SQL Injection', severity: 'High' },
          { description: 'Cross-Site Scripting', severity: 'Medium' },
          { description: 'Weak Password Policy', severity: 'Low' },
          { description: 'Unpatched Software', severity: 'Low' },
        ],
      },
      {
        containerName: 'Container 4',
        high: 1,
        medium: 1,
        low: 2,
        vulnerabilities: [
          { description: 'SQL Injection', severity: 'High' },
          { description: 'Cross-Site Scripting', severity: 'Medium' },
          { description: 'Weak Password Policy', severity: 'Low' },
          { description: 'Unpatched Software', severity: 'Low' },
        ],
      },
      {
        containerName: 'Container 5',
        high: 1,
        medium: 1,
        low: 7,
        vulnerabilities: [
          { description: 'SQL Injection', severity: 'High' },
          { description: 'Cross-Site Scripting', severity: 'Medium' },
          { description: 'Weak Password Policy', severity: 'Low' },
          { description: 'Unpatched Software', severity: 'Low' },
        ],
      },
    ],
  },
];

function App() {
  return (
    <div>
      <h1>Container Vulnerabilities</h1>
      <VulnerabilityCharts />
    </div>
  );
}

export default App;
