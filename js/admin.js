document.getElementById('update-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const filePath = document.getElementById('file-path').value;
    const fileContent = document.getElementById('file-content').value;
    
    // GitHub repository details
    const owner = 'NotDyamuh';
    const repo = 'Censura';
    const token = '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'; // Store this securely!

    // Fetch the current file info to get the SHA
    const getFileResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
        method: 'GET',
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });

    if (!getFileResponse.ok) {
        alert("Error fetching file: " + getFileResponse.statusText);
        return;
    }

    const fileData = await getFileResponse.json();
    const sha = fileData.sha; // Get the SHA of the file

    // Prepare the update request
    const updateResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
            message: 'Update file from admin panel',
            content: btoa(fileContent), // Encode content to base64
            sha: sha
        })
    });

    if (updateResponse.ok) {
        alert("File updated successfully!");
    } else {
        alert("Error updating file: " + updateResponse.statusText);
    }
});
