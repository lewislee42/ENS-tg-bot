'use client';

import React, { useEffect, useState, useRef} from 'react';

export default function Home() {
  const [message, setMessage] = useState<string | null>(null);
  const effectRan = useRef(false);

  useEffect(() => {
	if (effectRan.current === false) { // to ensure UseEffect doesn't run twice during development
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

		const uploadData = async (value : string) => {
			try {
			const response = await fetch('/api/testing_api', {
				method:"POST",
				body: JSON.stringify(value)
			});
			console.log("heree the 1st");
			const data = await response.json();
	
			console.log("heree");
	
			if (response.status == 200) {
				setMessage(data.message);
			} else {
				setMessage("missing");
			}
			console.log("end POST")
			} catch (error) {
			console.error('Error posting data:', error);
			}
		};

		uploadData("Workinggg!!!!");
		return () => {
			effectRan.current = true;
		};
	}
  }, []);

  return <div>{message}</div>;
};
