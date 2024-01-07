import { useState, useEffect } from 'react';

const fetchUser = (currentUser) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = currentUser._id;

        const response = await fetch('/api/user/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to join class: ${errorMessage}`);
        }

        const got = await response.json();
        setUser(got);
      
      } catch (error) {
        console.error('Error joining class:', error);
        setError(error.message);
      }
    };

    fetchUser();
  }, [currentUser]);

  return { user, error };
};

export default fetchUser;