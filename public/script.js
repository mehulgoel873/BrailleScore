function uploadFile() {
    var fileInput = document.getElementById('fileInput');
    var uploadStatus = document.getElementById('uploadStatus');

    if (fileInput.files.length > 0) {
        var file = fileInput.files[0];
        var formData = new FormData();

        formData.append('file', file);
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Handle the server response
            uploadStatus.innerHTML = 'File uploaded successfully!';
            console.log(data);
        })
        .catch(error => {
            // Handle errors
            uploadStatus.innerHTML = 'Error uploading file!';
            console.error('Error:', error);
        });
    } else {
        uploadStatus.innerHTML = 'Please choose a file to upload.';
    }
}