// Image list for each product folder
// Add your image filenames here for each product
const imageList = {
  bathroom: [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.jpg',
  ],
  board: ['1.jpg', '2.jpg'],
  clean: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
  induction: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  kitchen: [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.jpg',
    '9.jpg',
    '10.jpg',
    '11.jpg',
    '12.jpg',
    '13.jpg',
    '14.jpg',
    '15.jpg',
    '16.jpg',
    '17.jpg',
    '18.jpg',
    '19.jpg',
    '20.jpg',
    '21.jpg',
  ],
  mattress: ['1.jpg', '2.jpg', '3.jpg'],
  mirror: ['1.avif', '2.avif', '3.jpg', '4.jpg'],
  net: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  table: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
};

// Function to get images for a folder
function getImagesForFolder(folder) {
  return imageList[folder] || [];
}
