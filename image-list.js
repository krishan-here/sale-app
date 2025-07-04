// Image list for each product folder
// Add your image filenames here for each product
const imageList = {
    'sofa': [
        'pexels-francesco-albanese-2150950215-31418019.jpg',
        'pexels-heiler-31363284.jpg',
        'pexels-kinz-studio-photographe-451535468-31405630.jpg',
        'pexels-lilly-hope-944249302-31419962.jpg',
        'pexels-manish-dhodi-1475001-31405366.jpg'
    ],
    'tv': [
        // Add your TV image filenames here
        // Example: '1.jpg', '2.jpg', 'tv-front.jpg'
    ],
    'dining-table': [
        // Add your dining table image filenames here
    ],
    'bed': [
        // Add your bed image filenames here
    ],
    'refrigerator': [
        // Add your refrigerator image filenames here
    ],
    'washing-machine': [
        // Add your washing machine image filenames here
    ],
    'study-table': [
        // Add your study table image filenames here
    ],
    'microwave': [
        // Add your microwave image filenames here
    ]
};

// Function to get images for a folder
function getImagesForFolder(folder) {
    return imageList[folder] || [];
}
