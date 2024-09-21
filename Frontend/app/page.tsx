'use client';

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/testing_api', {
			method:"GET"
		});
		console.log("heree the 1st");
        const data = await response.json();

		console.log("heree");

        if (response.status == 200) {
          setMessage(data.message);
        } else {
          setMessage("missing");
        }
		console.log("end")
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <div>{message}</div>;
};
