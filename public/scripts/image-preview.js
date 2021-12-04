const imagePickerElement = document.querySelector(
  '#image-upload-control input'
);
const imagePreviwElement = document.querySelector('#image-upload-control img');

function updateImagePreview() {
  const files = imagePickerElement.files;

  if (!files || files.length === 0) {
    imagePreviwElement.style.display = 'none';
    return;
  }

  const pickedFile = files[0];
  imagePreviwElement.src = URL.createObjectURL(pickedFile);
  imagePreviwElement.style.display = 'block';
}

imagePickerElement.addEventListener('change', updateImagePreview);
