// Global variables
let currentImages = [];
let currentImageIndex = 0;
let currentProductName = '';

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupModalEvents();
});

// Load and display products in the table
function loadProducts() {
    const tbody = document.getElementById('products-tbody');
    
    products.forEach((product, index) => {
        // Main product row
        const row = document.createElement('tr');
        row.className = 'product-row';
        row.setAttribute('data-product-id', index);
        
        row.innerHTML = `
            <td data-label="Item Name">
                <div class="product-name-container">
                    <button class="expand-icon" onclick="toggleImages(${index}, '${product.folder}', '${product.name}')">
                        <span class="expand-arrow">▶</span>
                    </button>
                    <strong>${product.name}</strong>
                </div>
            </td>
            <td data-label="Market Price"><span class="market-price">₹${product.marketPrice.toLocaleString()}</span></td>
            <td data-label="My Price"><span class="selling-price">₹${product.sellingPrice.toLocaleString()}</span></td>
        `;
        
        tbody.appendChild(row);
        
        // Images row (initially hidden)
        const imagesRow = document.createElement('tr');
        imagesRow.className = 'images-row';
        imagesRow.id = `images-row-${index}`;
        imagesRow.style.display = 'none';
        
        imagesRow.innerHTML = `
            <td colspan="3" class="images-container">
                <div class="images-gallery" id="images-gallery-${index}">
                    <div class="loading-text">Loading images...</div>
                </div>
            </td>
        `;
        
        tbody.appendChild(imagesRow);
    });
    
    // Add totals row
    addTotalsRow(tbody);
}

// Add totals row to the table
function addTotalsRow(tbody) {
    // Calculate totals
    let totalMarketPrice = 0;
    let totalSellingPrice = 0;
    
    products.forEach(product => {
        totalMarketPrice += product.marketPrice;
        totalSellingPrice += product.sellingPrice;
    });
    
    // Create totals row
    const totalsRow = document.createElement('tr');
    totalsRow.className = 'totals-row';
    
    totalsRow.innerHTML = `
        <td><strong>Total</strong></td>
        <td><strong class="total-market-price">₹${totalMarketPrice.toLocaleString()}</strong></td>
        <td><strong class="total-selling-price">₹${totalSellingPrice.toLocaleString()}</strong></td>
    `;
    
    tbody.appendChild(totalsRow);
}

// Open image modal and load images
async function openImageModal(folder, productName) {
    currentProductName = productName;
    currentImages = [];
    currentImageIndex = 0;
    
    
    // Try to load images from the folder
    await loadImagesFromFolder(folder);
    
    if (currentImages.length > 0) {
        displayCurrentImage();
        document.getElementById('image-modal').style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
        // Show placeholder if no images found
        currentImages = ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIGltYWdlcyBhdmFpbGFibGU8L3RleHQ+PC9zdmc+'];
        displayCurrentImage();
        document.getElementById('image-modal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Load images from folder
async function loadImagesFromFolder(folder) {
    // First, try to get images from the image list
    const folderImages = getImagesForFolder(folder);
    
    if (folderImages && folderImages.length > 0) {
        // Use images from the image list
        for (const filename of folderImages) {
            const path = `images/${folder}/${filename}`;
            if (await imageExists(path)) {
                currentImages.push(path);
            }
        }
        return;
    }
    
    // Fallback: try common image names and numbers for folders not in the list
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const imagePaths = [];
    
    // Try common image names and numbers
    for (let i = 1; i <= 10; i++) {
        for (const ext of imageExtensions) {
            imagePaths.push(`images/${folder}/${i}.${ext}`);
            imagePaths.push(`images/${folder}/image${i}.${ext}`);
            imagePaths.push(`images/${folder}/${folder}${i}.${ext}`);
        }
    }
    
    // Also try some common names
    const commonNames = ['main', 'front', 'back', 'side', 'detail'];
    for (const name of commonNames) {
        for (const ext of imageExtensions) {
            imagePaths.push(`images/${folder}/${name}.${ext}`);
        }
    }
    
    // Test which images exist
    for (const path of imagePaths) {
        if (await imageExists(path)) {
            currentImages.push(path);
        }
    }
}

// Check if image exists
function imageExists(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
    });
}

// Display current image
function displayCurrentImage() {
    const modalImage = document.getElementById('modal-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (currentImages.length > 0) {
        modalImage.src = currentImages[currentImageIndex];
        
        // Show/hide navigation buttons
        prevBtn.style.display = currentImages.length > 1 ? 'block' : 'none';
        nextBtn.style.display = currentImages.length > 1 ? 'block' : 'none';
    }
}

// Navigate to previous image
function previousImage() {
    if (currentImages.length > 1) {
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
        displayCurrentImage();
    }
}

// Navigate to next image
function nextImage() {
    if (currentImages.length > 1) {
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        displayCurrentImage();
    }
}

// Close modal
function closeModal() {
    document.getElementById('image-modal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
    currentImages = [];
    currentImageIndex = 0;
}

// Setup modal event listeners
function setupModalEvents() {
    const modal = document.getElementById('image-modal');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Navigation events
    prevBtn.addEventListener('click', previousImage);
    nextBtn.addEventListener('click', nextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (modal.style.display === 'block') {
            switch(event.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    previousImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        }
    });
}

// Toggle images display for a product
async function toggleImages(productIndex, folder, productName) {
    const imagesRow = document.getElementById(`images-row-${productIndex}`);
    const expandBtn = document.querySelector(`[onclick*="toggleImages(${productIndex}"]`);
    const expandArrow = expandBtn.querySelector('.expand-arrow');
    const imagesGallery = document.getElementById(`images-gallery-${productIndex}`);
    
    if (imagesRow.style.display === 'none') {
        // Show images
        imagesRow.style.display = 'table-row';
        expandArrow.textContent = '▼';
        
        // Load images if not already loaded
        if (imagesGallery.querySelector('.loading-text')) {
            await loadImagesForProduct(productIndex, folder, productName);
        }
    } else {
        // Hide images
        imagesRow.style.display = 'none';
        expandArrow.textContent = '▶';
    }
}

// Load images for a specific product and display horizontally
async function loadImagesForProduct(productIndex, folder, productName) {
    const imagesGallery = document.getElementById(`images-gallery-${productIndex}`);
    const productImages = [];
    
    // Load images from folder
    const folderImages = getImagesForFolder(folder);
    
    if (folderImages && folderImages.length > 0) {
        // Use images from the image list
        for (const filename of folderImages) {
            const path = `images/${folder}/${filename}`;
            if (await imageExists(path)) {
                productImages.push(path);
            }
        }
    } else {
        // Fallback: try common image names and numbers
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        const imagePaths = [];
        
        // Try common image names and numbers
        for (let i = 1; i <= 10; i++) {
            for (const ext of imageExtensions) {
                imagePaths.push(`images/${folder}/${i}.${ext}`);
                imagePaths.push(`images/${folder}/image${i}.${ext}`);
                imagePaths.push(`images/${folder}/${folder}${i}.${ext}`);
            }
        }
        
        // Also try some common names
        const commonNames = ['main', 'front', 'back', 'side', 'detail'];
        for (const name of commonNames) {
            for (const ext of imageExtensions) {
                imagePaths.push(`images/${folder}/${name}.${ext}`);
            }
        }
        
        // Test which images exist
        for (const path of imagePaths) {
            if (await imageExists(path)) {
                productImages.push(path);
            }
        }
    }
    
    // Display images horizontally
    if (productImages.length > 0) {
        imagesGallery.innerHTML = productImages.map((imagePath, index) => `
            <div class="image-thumbnail" onclick="openImageInModal('${imagePath}', ${index}, '${folder}', '${productName}')">
                <img src="${imagePath}" alt="${productName} - Image ${index + 1}" loading="lazy">
            </div>
        `).join('');
    } else {
        imagesGallery.innerHTML = '<div class="no-images">No images available</div>';
    }
}

// Open specific image in modal
async function openImageInModal(imagePath, imageIndex, folder, productName) {
    currentProductName = productName;
    currentImageIndex = imageIndex;
    
    // Load all images for this product
    currentImages = [];
    await loadImagesFromFolder(folder);
    
    
    if (currentImages.length > 0) {
        // Find the correct index of the clicked image
        const clickedImageIndex = currentImages.findIndex(img => img === imagePath);
        if (clickedImageIndex !== -1) {
            currentImageIndex = clickedImageIndex;
        }
        
        displayCurrentImage();
        document.getElementById('image-modal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(amount);
}
