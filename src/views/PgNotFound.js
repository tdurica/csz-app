import { Link, useLoaderData } from "react-router-dom";
import { VFlex, VFlexCC } from './bits/UtilityTags.js';
import PublicPage from "./PublicPage";

export default function PgNotFound({...props}) {
  const user = useLoaderData();
  const matchedProfile = ()=>{

  }
  return (<>
    {user ? (
        <PublicPage user={user} liveMode={true}/>
      ) : (
        <VFlexCC w='100vw' h='100vh'>

          <h1>Oops! You seem to be lost.</h1>
          <p>Here are some helpful links:</p>
          <Link to='/'>Home</Link>
          {/*<Link to='/docs'>Docs</Link>*/}
        </VFlexCC>
    )}
  </>)
}
