function uploadFile() {
    console.log('Upload button clicked.');

    var fileInput = document.getElementById('fileInput');
    console.log('Files selected:', fileInput.files);

    var uploadStatus = document.getElementById('uploadStatus');

    if (fileInput.files.length > 0) {
        var file = fileInput.files[0];
        var formData = new FormData();

        formData.append('file', file); 

        fetch('http://localhost:3008', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                uploadStatus.innerHTML = data.message;
                console.log(data);
            } else {
                uploadStatus.innerHTML = 'Error: ' + data.message;
                console.error('Error:', data.message);
            }
        })
        .catch(error => {
            uploadStatus.innerHTML = 'Error uploading file!';
            console.error('Error:', error); 
        });
    } else {
        uploadStatus.innerHTML = 'Error: Upload a file first.';
    }
} 