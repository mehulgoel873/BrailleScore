function uploadFile() {
    console.log('Upload button clicked.');
    /*
    var fileInput = document.getElementById('fileInput');
    console.log('Files selected:', fileInput.files);

    var uploadStatus = document.getElementById('uploadStatus');

    //
    console.log("WE ARE HERE");
    var loader = document.getElementById('loader');
    loader.style.display = 'none';
    //

    if (fileInput.files.length > 0) {
        var file = fileInput.files[0];
        var formData = new FormData();

        formData.append('file', file); 

        // Show loader before making the fetch request
        loader.style.display = 'block';

        fetch('http://localhost:3009', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // Hide loader after receiving the response
            loader.style.display = 'none';
            if (data.success) {
                uploadStatus.innerHTML = data.message;
                console.log(data);
            } else {
                uploadStatus.innerHTML = 'Error: ' + data.message;
                console.error('Error:', data.message);
            }
        })
        .catch(error => {
            // Hide loader in case of an error
            loader.style.display = 'none';
            uploadStatus.innerHTML = 'Error uploading file!';
            console.error('Error:', error); 
        });
    } else {
        uploadStatus.innerHTML = 'Error: Upload a file first.';
    } */
} 
uploadFile();