import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <h1>You should not be here</h1>
      <Link to="/">Take me home</Link>
    </>
  );
}
