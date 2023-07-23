export default function Home() {
  return (
    <>
      <div className="container text-white">
        <div className="row p-5 fs-5">
          <h1>Hey Guys!</h1>
          <p>
            This is a Digital Asset Management System which can store the
            images, uses AI image tagging based on the content in the Image for
            searching.
          </p>
          <p>The features as follows: </p>
          <ul>
            <li>Uses compressed thumbnails for faster image loading</li>
            <li>
              Features various In browser image manipulation like
              <ul>
                <li>Cropping</li>
                <li>Filtering</li>
                <li>Overlaying</li>
                <li>Resizing</li>
                <li>Rotating</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
