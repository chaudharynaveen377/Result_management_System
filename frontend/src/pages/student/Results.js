import React, { useState, useEffect } from 'react';
import API from '../../utils/api';

const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await API.get('/student/results');
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResults();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Results</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((result) => (
              <tr key={result._id}>
                <td className="px-6 py-4 whitespace-nowrap">{result.subject.name} ({result.subject.code})</td>
                <td className="px-6 py-4 whitespace-nowrap">{result.marks}</td>
                <td className="px-6 py-4 whitespace-nowrap">{result.grade}</td>
                <td className="px-6 py-4 whitespace-nowrap">{result.semester}</td>
                <td className="px-6 py-4 whitespace-nowrap">{result.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Results;