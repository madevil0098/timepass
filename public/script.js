function uploadPhoto() {
    const photoInput = document.getElementById('photoInput');
    const photo = photoInput.files[0];
    if (!photo) {
        alert('Please select a photo to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('photo', photo);

    fetch('/api/upload_photo', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('Photo uploaded successfully.');
        console.log('Photo uploaded successfully:', data);
    })
    .catch(error => {
        console.error('Error uploading photo:', error);
        alert('Error uploading photo. Please try again.');
    });
}
