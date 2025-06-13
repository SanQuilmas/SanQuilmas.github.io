let CURRENT_IMAGE = 0;

const ChangeImage = (direction, carousel, captionSpace, ImagesList) => {
  CURRENT_IMAGE += direction;
  const index =
    ((CURRENT_IMAGE % ImagesList.length) + ImagesList.length) %
    ImagesList.length;
  const currentImage = ImagesList[index];

  carousel.src = currentImage.imgSource;
  carousel.alt = currentImage.imgAlt;
  captionSpace.textContent = currentImage.imgCaption;
};

const LoadImages = async () => {
  const data = await fetch("/assets/images.json");
  const imageObjects = await data.json();
  return imageObjects;
};

async function main() {
  let ImagesList = [];
  ImagesList = await LoadImages();

  const carousel = document.getElementById("carousel__main__image");
  const captionSpace = document.getElementById("carousel__img__caption");
  ChangeImage(0, carousel, captionSpace, ImagesList);

  const LeftButton = document.getElementById("left_carousel_button");
  const RightButton = document.getElementById("right_carousel_button");

  LeftButton.addEventListener("click", (event) =>
    ChangeImage(-1, carousel, captionSpace, ImagesList)
  );
  RightButton.addEventListener("click", (event) =>
    ChangeImage(1, carousel, captionSpace, ImagesList)
  );
}

main();
