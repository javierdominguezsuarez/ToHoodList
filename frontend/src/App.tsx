import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PageNotes from './Components/Notes/PageNotes';
import storage from './auth/storage';
import Auth from './Components/Auth/Auth';
import AuthContext from './auth/context';

function App() {


  const [ user, setUser ] = useState<string>();
	const [ profile, setProfile ] = useState();

	const [ loading, setLoading ] = useState(true);

	const restoreUser = async () => {
		const user = await storage.getUser();
		if (user) setUser(user);
    setLoading(false);
	};

  useEffect(() => {

    restoreUser()

  }, [])

	if (loading) return <div>loading</div>



  return (

    <div className="App">

      <AuthContext.Provider value={{ user, setUser }}>
        {
          user ? 

        <PageNotes></PageNotes>

        :

          <Auth></Auth>


        }

        </AuthContext.Provider>
    </div>

  );
}

export default App;
