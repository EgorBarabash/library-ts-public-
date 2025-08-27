// import React, { useEffect } from 'react';
// import { useNavigate, useLocation, useParams } from 'react-router-dom';

// function RedirectToSearchPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
 
//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search).get('q');
//     console.log('aa', searchParams);

//     if (searchParams) {
//         console.log('searchParams', searchParams);
        
//       navigate(`/search-page?q=${searchParams}`, { replace: true });
//     } else {
//     //   navigate('/', { replace: true });
//     console.log('er');
    
//     }
//   }, [navigate, location]);
  
//   return null; 
// }

// export default RedirectToSearchPage;