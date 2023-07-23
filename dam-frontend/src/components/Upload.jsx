import BrowserImageManipulation from "browser-image-manipulation";
import * as tf from "@tensorflow/tfjs";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Upload() {
  const [model, setModel] = useState(null);
  const [classLabels, setClassLabels] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState(null);
  const [predictedClass, setPredictedClass] = useState(null);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState(null);

  const loadModel = async () => {
    const model_url = "tfjs/MobileNetV3Large/model.json";
    const model = await tf.loadGraphModel(model_url);
    setModel(model);
  };

  const getClassLabels = async () => {
    const res = await fetch(
      "https://raw.githubusercontent.com/anishathalye/imagenet-simple-labels/master/imagenet-simple-labels.json"
    );
    const data = await res.json();
    setClassLabels(data);
  };

  useEffect(() => {
    loadModel();
    getClassLabels();
  }, []);

  const readImageFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  const createHTMLImageElement = (imageSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = imageSrc;
    });
  };

  const loadImg = async (e) => {
    try {
      console.log(e.target.files[0]);
      setImage(e.target.files[0]);
      const img = new BrowserImageManipulation()
        .loadBlob(e.target.files[0])
        .gaussianBlur()
        .saveAsImage()
        .then((base64) => {
          document.getElementById("img").src = base64;
        });
    } catch (e) {
      console.log(e);
    }
  };
  const save = () => {};

  const uploadData = async () => {
    if (image === null) {
      toast("Select the Image to upload");
      return;
    }
    if (loading) {
      toast("Wait for 5 sec for the model to load");
      return;
    }
    console.log({
      img: image,
      tag: predictedClass,
    });
    const formData = new FormData();
    formData.append("img", image);
    formData.append("tag", predictedClass);
    await axios
      .post(`http://localhost:8080/upload`, formData)
      .then((res) => {})
      .catch((err) => {
        toast(err.response.data.message);
      });
    setImage(null);
  };

  const handleImageChange = async (event) => {
    loadImg(event);
    toast("Wait for 5 sec for the model to load");

    let files = event.target.files;
    if (files.length === 0) {
      setConfidence(null);
      setPredictedClass(null);
    }

    if (files.length === 1) {
      setLoading(true);

      const imageSrc = await readImageFile(files[0]);
      const image = await createHTMLImageElement(imageSrc);

      const [predictedClass, confidence] = await tf.tidy(() => {
        const tensorImg = tf.browser
          .fromPixels(image)
          .resizeNearestNeighbor([224, 224])
          .toFloat()
          .expandDims();
        const result = model.predict(tensorImg);

        const predictions = result.dataSync();
        const predicted_index = result.as1D().argMax().dataSync();

        const predictedClass = classLabels[predicted_index];
        const confidence = Math.round(predictions[predicted_index] * 100);

        return [predictedClass, confidence];
      });

      setPredictedClass(predictedClass);
      setConfidence(confidence);
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 my-5">
            <h3>Choose your Image</h3>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <button className="btn btn-lg btn-success" onClick={uploadData}>
              Upload
            </button>
          </div>
          <div className="col-sm-6 my-5">
            <div className="row">
              <div className="col-sm-6 py-3 border-bottom">
                <span className="text-white fs-3">Crop Image</span>
                <div className="d-flex flex-column gap-3">
                  <label htmlFor="maxWidth">Enter the max width:</label>
                  <input type="number" id="maxWidth" className="form-control" />
                  <label htmlFor="maxHeight">Enter the max height:</label>
                  <input
                    type="number"
                    id="maxHeight"
                    className="form-control"
                  />
                  <button className="btn btn-danger">Crop</button>
                </div>
              </div>
              <div className="col-sm-6 py-3 border-bottom">
                <span className="text-white fs-3">Rotate Image</span>
                <div className="d-flex flex-column gap-3">
                  <label htmlFor="rotate">Enter the degree to rotate:</label>
                  <input type="number" id="rotate" className="form-control" />
                  <button className="btn btn-danger">Rotate</button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 py-3 border-bottom">
                <span className="text-white fs-3">Change Perspective</span>
                <div className="d-flex flex-column gap-3">
                  <label htmlFor="pers">Perspective change factor</label>
                  <input type="number" id="pers" className="form-control" />
                  <button className="btn btn-danger">Perspective</button>
                </div>
              </div>
              <div className="col-sm-6">
                <span className="text-white fs-3">Effects</span>
                <div className="d-flex flex-column gap-3">
                  <select className="form-control">
                    <option value="">Select the filter</option>
                    <option value="gauss">Gaussian Blur</option>
                    <option value="pixel">Pixelize</option>
                    <option value="grey">Greyscale</option>
                  </select>
                  <button className="btn btn-danger">Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
