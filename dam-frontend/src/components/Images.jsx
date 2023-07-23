import { useEffect, useState } from "react";
import { fetchMetadata } from "../service/service";

function Images() {
  const [images, setImages] = useState(null);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    fetchMetadata(searchItem).then((data) => {
      setImages(data);
    });
  }, [searchItem]);

  return (
    <>
      <div className="container-fluid my-5 text-center">
        <div className="row ">
          <div className="col-sm-4 offset-sm-4">
            <label htmlFor="search_term" className="form-label fs-3">
              Search Images with Tag
            </label>
            <input
              className="form-control"
              value={searchItem}
              type="text"
              onChange={(e) => setSearchItem(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          {images &&
            images.map((item, key) => {
              return (
                <div
                  className="col-sm-6 col-md-4 col-lg-3 my-sm-5 my-2"
                  key={key}
                >
                  <div className="card bg-secondarygreen border border-2 border-dark">
                    <div className="card-body">
                      <div className="row">{item.fileName}</div>
                      <div className="row">
                        <img
                          src={`http://192.168.76.135:8080/public/thumbnails/${item.fileName}`}
                          className="img-thumbnail"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
export default Images;
