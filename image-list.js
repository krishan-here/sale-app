// Image list for each product folder
// Add your image filenames here for each product
const imageList = {
  bathroom: ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg', '6.jpeg'],
  mattress: ['1.jpeg', '2.jpeg', '3.jpeg'],
  mirror: ['1.avif', '2.avif'],
  net: ['1.webp', '2.jpeg', '3.jpeg', '4.jpeg', '5.webp'],
};

// Function to get images for a folder
function getImagesForFolder(folder) {
  return imageList[folder] || [];
}
