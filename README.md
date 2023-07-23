# Digital Asset Management

Digital Asset Management is a full stack app which uses react, express.js and tensorflow.js to auto tag images based on the content of the image for searching purposes. It features various Image optimization techniques like thumbnails for faster rendering of images. Also It provides a bulk of features of In browser Image transformation like cropping, rotating, resizing.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install project dependencies.

```bash
#clone this repo to your machine

git clone https://github.com/ragul-engg/Digital-Asset-Management.git

#install dependencies for frontend
cd dam-frontend
npm install
npm run dev

#install dependencies for backend
cd dam-backend
npm install
npm run dev
```

## Pre-conditions

#### In the dam-backend folder use two environment variables using .env files namely DATABASE_URL="your_atlas_mongodb_url" and PORT = 3000

## Acknowledgements

#### Thank for this repo for providing the Image manipulation solutions

[BrowserImageManipulation](https://github.com/grinat/browser-image-manipulation),[sharp](https://github.com/lovell/sharp)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.
