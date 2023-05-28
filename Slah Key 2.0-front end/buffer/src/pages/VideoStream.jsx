// import React, { useEffect, useRef } from 'react';

// function VideoStream() {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const videoElement = videoRef.current;

//     // Function to handle the response from the API
//     function handleResponse(response) {
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const reader = response.body.getReader();

//       function read() {
//         return reader.read().then(({ done, value }) => {
//           if (done) {
//             console.log('Video stream finished');
//             return;
//           }

//           // Create a blob from the received bytes
//           const blob = new Blob([value], { type: 'image/jpeg' });

//           // Convert the blob to a URL
//           const imageUrl = URL.createObjectURL(blob);

//           // Set the image URL as the source of the video element
//           videoElement.src = imageUrl;

//           // Read the next chunk of data
//           return read();
//         });
//       }

//       return read();
//     }

//     // Fetch the video feed
//     fetch('http://localhost:8000/video_feed')
//       .then(handleResponse)
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   }, []);

//   return <video ref={videoRef} autoPlay />;
// }

// export default VideoStream;
